"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import {
  ALLOWED_IMAGE_TYPES,
  compressImage,
  rewriteImageFilename,
} from "@/lib/image-utils";

const BUCKET = "resources";

const TEXT_EXTENSIONS = new Set([".txt", ".md", ".csv"]);
const PDF_EXTENSIONS = new Set([".pdf"]);

// Per-file upload limit. 25MB covers >99% of legitimate textbook/term-outline
// PDFs and stops a single bad upload (e.g. a 200MB scanned binder) from
// quietly eating bucket storage.
const MAX_RESOURCE_BYTES = 25 * 1024 * 1024; // 25MB

async function extractPdfText(arrayBuffer) {
  // unpdf is dynamically imported because it pulls in a wasm-ish parser that's
  // chunky at module-init time.
  const { extractText, getDocumentProxy } = await import("unpdf");
  const pdf = await getDocumentProxy(new Uint8Array(arrayBuffer));
  const { text } = await extractText(pdf, { mergePages: true });
  return text || "";
}

function classifyCategory(filename) {
  const n = filename.toLowerCase();
  if (
    n.includes("textbook") ||
    n.includes("contents") ||
    n.includes("cambridge") ||
    n.includes("chapter")
  )
    return "textbook";
  if (
    n.includes("term") ||
    n.includes("planner") ||
    n.includes("outline") ||
    n.includes("scope")
  )
    return "term_outline";
  if (n.includes("report") || n.includes("semester")) return "school_report";
  if (n.includes("teacher") || n.includes("feedback") || n.includes("comment"))
    return "teacher_notes";
  if (
    n.includes("schedule") ||
    n.includes("calendar")
  )
    return "assessment_schedule";
  if (
    n.includes("test") ||
    n.includes("exam") ||
    n.includes("assessment") ||
    n.includes("sac")
  )
    return "assessment";
  return "other";
}

function fileExtension(name) {
  const m = name.match(/\.[^.]+$/);
  return m ? m[0].toLowerCase() : "";
}

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

async function assertStudentAccess(supabase, userId, studentId) {
  // Tutor link?
  const { data: link } = await supabase
    .from("tutor_students")
    .select("student_id")
    .eq("tutor_id", userId)
    .eq("student_id", studentId)
    .maybeSingle();
  if (link) return true;

  // Parent of?
  const { data: student } = await supabase
    .from("students")
    .select("parent_id")
    .eq("id", studentId)
    .maybeSingle();
  if (student?.parent_id === userId) return true;

  throw new Error("forbidden");
}

export async function uploadResource(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const studentId = formData.get("student_id");
  if (!studentId) throw new Error("student_id required");
  await assertStudentAccess(supabase, user.id, studentId);

  const file = formData.get("file");
  const explicitCategory = formData.get("category")?.toString() || null;
  const notes = formData.get("notes")?.toString() || null;
  const inlineText = formData.get("inline_text")?.toString() || null;
  const inlineName = formData.get("inline_name")?.toString() || null;

  let name = "";
  let category = explicitCategory;
  let content = null;
  let filePath = null;

  if (file && typeof file === "object" && "arrayBuffer" in file && file.size > 0) {
    if (file.size > MAX_RESOURCE_BYTES) {
      throw new Error(
        `"${file.name}" is too large (${(file.size / 1024 / 1024).toFixed(
          1
        )}MB). Maximum is 25MB per resource.`
      );
    }

    name = file.name;
    if (!category) category = classifyCategory(name);

    const ext = fileExtension(name);
    let uploadBuffer = null;
    let uploadContentType = file.type || "application/octet-stream";

    if (TEXT_EXTENSIONS.has(ext)) {
      content = await file.text();
      uploadBuffer = Buffer.from(await file.arrayBuffer());
    } else if (PDF_EXTENSIONS.has(ext) || file.type === "application/pdf") {
      try {
        const ab = await file.arrayBuffer();
        content = (await extractPdfText(ab)).trim();
        if (!content) {
          content = `[File: ${name} (${(file.size / 1024).toFixed(0)}KB) — PDF text could not be extracted (likely scanned image)]`;
        }
        uploadBuffer = Buffer.from(ab);
      } catch (e) {
        console.warn(`[uploadResource] PDF extract failed for ${name}: ${e?.message || e}`);
        content = `[File: ${name} (${(file.size / 1024).toFixed(0)}KB) — PDF, text extraction failed]`;
        uploadBuffer = Buffer.from(await file.arrayBuffer());
      }
    } else if (ALLOWED_IMAGE_TYPES.has(file.type)) {
      // Image resource (e.g. photo of a textbook page). Same compression
      // pass as session photos so we don't quietly burn storage.
      const raw = Buffer.from(await file.arrayBuffer());
      const compressed = await compressImage(raw);
      uploadBuffer = compressed.buffer;
      uploadContentType = compressed.contentType;
      name = rewriteImageFilename(name);
      content = `[File: ${name} (${(uploadBuffer.length / 1024).toFixed(
        0
      )}KB) — ${uploadContentType}]`;
    } else {
      content = `[File: ${name} (${(file.size / 1024).toFixed(0)}KB) — ${file.type || "unknown type"}]`;
      uploadBuffer = Buffer.from(await file.arrayBuffer());
    }

    if (content && content.length > 50000) {
      content =
        content.slice(0, 50000) +
        "\n\n[Content truncated at 50,000 characters]";
    }

    const admin = createAdminClient();
    const objectKey = `${studentId}/${randomUUID()}-${sanitizeFilename(name)}`;
    const { error: uploadError } = await admin.storage
      .from(BUCKET)
      .upload(objectKey, uploadBuffer, {
        contentType: uploadContentType,
        upsert: false,
      });
    if (uploadError) throw uploadError;
    filePath = objectKey;
  } else if (inlineText && inlineName) {
    name = inlineName;
    if (!category) category = classifyCategory(name);
    content = inlineText.slice(0, 50000);
  } else {
    throw new Error("Provide a file or inline_text + inline_name");
  }

  const { error: insertError } = await supabase.from("resources").insert({
    student_id: studentId,
    uploaded_by: user.id,
    name,
    category: category || "other",
    content,
    file_url: filePath,
    notes,
  });
  if (insertError) {
    // Best effort cleanup if storage succeeded but DB insert failed.
    if (filePath) {
      const admin = createAdminClient();
      await admin.storage.from(BUCKET).remove([filePath]);
    }
    throw insertError;
  }

  revalidatePath(`/dashboard/tutor/students/${studentId}`);
  revalidatePath(`/dashboard/parent/students/${studentId}`);
}

export async function deleteResource(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const resourceId = formData.get("resource_id");
  if (!resourceId) throw new Error("resource_id required");

  const { data: resource } = await supabase
    .from("resources")
    .select("id, student_id, file_url, uploaded_by")
    .eq("id", resourceId)
    .single();
  if (!resource) throw new Error("not found");

  await assertStudentAccess(supabase, user.id, resource.student_id);

  const admin = createAdminClient();
  if (resource.file_url) {
    await admin.storage.from(BUCKET).remove([resource.file_url]);
  }

  // Use admin: there's no DELETE RLS policy on resources, ownership is
  // already verified by assertStudentAccess above.
  const { error } = await admin.from("resources").delete().eq("id", resourceId);
  if (error) throw error;

  revalidatePath(`/dashboard/tutor/students/${resource.student_id}`);
  revalidatePath(`/dashboard/parent/students/${resource.student_id}`);
}

export async function updateResource(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const resourceId = formData.get("resource_id");
  if (!resourceId) throw new Error("resource_id required");

  const { data: resource } = await supabase
    .from("resources")
    .select("student_id")
    .eq("id", resourceId)
    .single();
  if (!resource) throw new Error("not found");

  await assertStudentAccess(supabase, user.id, resource.student_id);

  const patch = {};
  const category = formData.get("category");
  if (category) patch.category = category.toString();
  const notes = formData.get("notes");
  if (notes !== null) patch.notes = notes.toString() || null;

  if (Object.keys(patch).length === 0) return;

  // Use admin: there's no UPDATE RLS policy on resources, ownership is
  // already verified by assertStudentAccess above.
  const admin = createAdminClient();
  const { error } = await admin
    .from("resources")
    .update(patch)
    .eq("id", resourceId);
  if (error) throw error;

  revalidatePath(`/dashboard/tutor/students/${resource.student_id}`);
  revalidatePath(`/dashboard/parent/students/${resource.student_id}`);
}

// Helper for server components rendering the resource list.
export async function signedUrlFor(filePath) {
  if (!filePath) return null;
  const admin = createAdminClient();
  const { data } = await admin.storage
    .from(BUCKET)
    .createSignedUrl(filePath, 3600);
  return data?.signedUrl ?? null;
}
