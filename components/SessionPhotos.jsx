"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  addSessionPhoto,
  deleteSessionPhoto,
} from "@/app/dashboard/tutor/session/actions";

export default function SessionPhotos({ sessionId, photos, canManage }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [, startDelete] = useTransition();

  async function handleFiles(files) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set("session_id", sessionId);
      for (const file of files) fd.append("photos", file);
      await addSessionPhoto(fd);
      router.refresh();
    } catch (e) {
      setError(e.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (cameraInputRef.current) cameraInputRef.current.value = "";
    }
  }

  function handleDelete(photoId) {
    if (!confirm("Delete this photo?")) return;
    setDeletingId(photoId);
    startDelete(async () => {
      try {
        const fd = new FormData();
        fd.set("photo_id", photoId);
        await deleteSessionPhoto(fd);
        router.refresh();
      } catch (e) {
        setError(e.message || "Delete failed");
      } finally {
        setDeletingId(null);
      }
    });
  }

  return (
    <div className="space-y-3">
      {(photos?.length ?? 0) > 0 && (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {photos.map((p) => (
            <li
              key={p.id}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-soft border border-zinc-200 dark:border-zinc-800 group"
            >
              {p.signed_url ? (
                <a
                  href={p.signed_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.signed_url}
                    alt="Session working"
                    className="w-full h-full object-cover transition group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </a>
              ) : (
                <div className="flex items-center justify-center h-full text-xs text-muted">
                  Image unavailable
                </div>
              )}
              {canManage && (
                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  disabled={deletingId === p.id}
                  className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/70 text-white text-xs opacity-0 group-hover:opacity-100 hover:bg-black/90 transition disabled:opacity-50"
                  aria-label="Delete photo"
                >
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {canManage && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="h-10 px-4 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium hover:bg-surface-soft disabled:opacity-50 transition"
          >
            {uploading ? "Uploading…" : "Upload photos"}
          </button>
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            disabled={uploading}
            className="h-10 px-4 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium hover:bg-surface-soft disabled:opacity-50 transition sm:hidden"
          >
            Take photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <span className="basis-full text-xs text-muted">
            Max 10MB per photo · automatically resized for storage.
          </span>
        </div>
      )}

      {(photos?.length ?? 0) === 0 && !canManage && (
        <p className="text-sm text-zinc-500">No photos for this session.</p>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
