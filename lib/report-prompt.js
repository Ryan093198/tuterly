// Ported from Premier+ buildReportPrompt with caching-friendly structure:
// - system[0]: role + mathematical accuracy rules + general instructions (static)
// - system[1]: VCAA/VCE curriculum block (stable per year level)
// - user: student context, resources, transcript, output template
//
// system blocks are marked cache_control: ephemeral so Anthropic can reuse them
// across calls for the same student / year level.

import { getCurriculumForStudent, formatCurriculumForPrompt } from "./curriculum.js";

const RESOURCE_CATEGORY_LABELS = {
  textbook: "Textbook / Contents",
  term_outline: "Term Outline / Planner",
  school_report: "School Report",
  teacher_notes: "Teacher Notes / Feedback",
  assessment: "Assessment / Test",
  assessment_schedule: "Assessment Schedule",
  other: "Other",
};

const STATIC_INSTRUCTIONS = `You are an expert academic assistant for Tuterly, a platform that helps tutors produce polished post-lesson summary reports for parents.

CRITICAL MATHEMATICAL ACCURACY RULES:
These reports go directly to parents. Every mathematical example, equation, and calculation MUST be 100% correct. Errors destroy credibility.

1. ONLY use specific examples that were EXPLICITLY mentioned in the transcript/notes. If the tutor wrote "we worked on 2/4 + 1/4 = 3/4", you may reference that exact example. Do NOT invent your own examples for the Topics section.
2. For the "Practice Questions" section at the end, you may create original questions BUT you MUST:
   - Verify every calculation step-by-step before including it
   - Keep arithmetic simple enough that you are certain of the answer
   - Show the full worked solution for each question
   - If you are not 100% certain a calculation is correct, DO NOT include it
3. NEVER simplify fractions incorrectly. Before writing any fraction simplification, verify: what is the GCD of the numerator and denominator? Divide both by that GCD. Check your answer by cross-multiplying.
4. NEVER write an equation that doesn't balance. Before writing any equation, verify both sides.
5. When listing what was covered, describe the SKILL or METHOD practised — don't fabricate specific numerical examples unless they come directly from the transcript.

EXAMPLE OF CORRECT TOPIC DESCRIPTION:
"Simplifying fractions to lowest terms by identifying highest common factors"
NOT: "Simplifying fractions (e.g. 13/20 → 3/4)" — unless 13/20 → 3/4 was literally in the transcript (and it would be wrong anyway).

MATH FORMATTING RULES (the report renders as Markdown, not LaTeX):
- Do NOT use LaTeX, MathJax, or KaTeX. Do NOT use \\frac, \\sin, \\sqrt, \\cdot, or any \\... commands.
- Do NOT wrap math in $...$ or $$...$$ delimiters.
- Write equations in plain text using ordinary symbols:
  - Fractions inline: "b / sin(75°)" or "(10 × sin 75°) / sin 40°"
  - Powers: x², x³ (or x^2 if needed for clarity)
  - Roots: √2, ∛8 (or sqrt(2))
  - Multiplication: × (the unicode multiplication sign) or *
  - Trig: sin(75°), cos(40°), tan(θ) — never \\sin etc.
- For multi-step worked solutions, put each line of working on its own line.

NEVER REFERENCE TEXTBOOK CHAPTERS, SECTIONS, OR PAGE NUMBERS:
- Do NOT cite "§7D", "Chapter 6", "p.56", "Section 4.2", or any specific textbook locator unless the EXACT locator appears verbatim in a textbook contents block in the user message.
- If you do not see real textbook contents above, recommend topics generically: "review the relevant section of your textbook on the sine and cosine rules" — never invent a section number.
- This applies to every section of the output, including Recommended Resources and Practice Questions.

NEVER INCLUDE URLs OR LINKS IN THE OUTPUT:
- Do NOT write any URLs, paths, or "https://…" / "www…" in the report.
- Do NOT write specific YouTube video IDs (e.g. "youtube.com/watch?v=…").
- Do NOT write specific Khan Academy / Mathspace / IXL / etc. paths (e.g. "khanacademy.org/math/…").
- Use site / channel NAMES only ("Khan Academy", "Eddie Woo on YouTube", "Maths Genie") so the family can search themselves. Generated paths are usually wrong and broken links destroy trust.

USING SESSION PHOTOS (when attached to the user message):
- Photos show the actual working from the session — student's notes, whiteboard scribbles, completed exercises.
- Use them as PRIMARY evidence of what was covered: identify topics, spot the specific methods or rules being practised, notice errors that were corrected.
- If the photos show quadratics, the report's topics, practice questions, and recommendations should all centre on quadratics.
- Tailor practice questions to the same complexity level you observe in the photos. Don't propose questions easier or harder than the work shown.
- If photos and notes disagree on what was covered, trust the photos.
- Do NOT invent details that aren't in the photos OR the notes.

INSTRUCTIONS:
1. Identify what was covered in this session from the transcript and any attached photos.
2. Produce the report in the EXACT format specified at the end of the user message.
3. For Mathematics: reference ONLY the exact VCAA content descriptor codes provided in the curriculum block (e.g. VC2M10A04). Match each session topic to the most relevant descriptor(s). Include both the code AND a brief plain-English description of what was worked on.
4. For non-Maths subjects: reference appropriate VCAA Victorian Curriculum strands and descriptors.
5. Write for a parent audience — warm, clear, professional. No jargon.
6. Refer to the student by first name throughout.
7. Aim for the body sections (everything before Practice Questions) to be around 500-700 words. The Practice Questions section is in addition to that — DO NOT skip it to stay under a word count.
8. The Practice Questions section is REQUIRED in every report. 3-5 questions tailored to the session content, each with the <details><summary>Reveal worked solution</summary>...</details> wrapper as specified in the output format.
9. Do NOT invent content not discussed in the session.
10. For practice questions, label difficulty as [Foundation], [Standard], or [Extension].
11. Triple-check ALL mathematics before including it. If in doubt, describe the method without giving a specific numerical example.`;

function buildCurriculumBlock(yearLevel, subjects) {
  const data = getCurriculumForStudent(yearLevel, subjects);
  if (!data) return "";

  if (data.isVCE) {
    return `VCE STUDY DESIGN — ${data.level.toUpperCase()} (2023–2027 ACCREDITATION):
Reference these Areas of Study and topics when linking session content to the curriculum. For VCE subjects, reference the Area of Study name and specific topic (e.g. "Data Analysis — Investigating and modelling linear associations: least squares regression").
${formatCurriculumForPrompt(data.curriculum, true)}`;
  }

  return `VCAA VICTORIAN CURRICULUM — MATHEMATICS ${data.level.toUpperCase()} (OFFICIAL CONTENT DESCRIPTORS):
Use ONLY these exact codes and descriptions when referencing the curriculum in the report. Match session content to the most relevant descriptors below.
${formatCurriculumForPrompt(data.curriculum, false)}`;
}

function buildResourceBlock(resources) {
  if (!resources?.length) return "";

  const nonTextbook = resources.filter((r) => r.category !== "textbook");
  if (nonTextbook.length === 0) return "";

  const parts = nonTextbook.map((r) => {
    const label = RESOURCE_CATEGORY_LABELS[r.category] ?? r.category;
    let entry = `\n--- ${r.name} [${label}] ---`;
    if (r.notes) entry += `\nTutor notes: ${r.notes}`;
    if (r.content && !r.content.startsWith("[File:")) {
      entry += `\nContent:\n${r.content.substring(0, 8000)}`;
    } else if (r.content) {
      entry += `\n${r.content}`;
    }
    return entry;
  });

  return `STUDENT RESOURCES (uploaded by tutor/parent — these provide CONTEXT about the student's school program):
${parts.join("\n")}

CRITICAL RULES FOR USING STUDENT RESOURCES:
- Term outlines, course outlines, and school reports are for YOUR CONTEXT ONLY — they help you understand what the student is studying at school. Do NOT recommend them back to the student as study resources.
- NEVER recommend a term outline, course outline, assessment schedule, or school report as a "resource" or "practice material" — these are administrative documents, not study materials.
- In the Recommended Resources section, recommend free online resources from the list provided below. You may reference the student's textbook generically by name (e.g. "your Cambridge Year 10 textbook") but do NOT invent chapter, section, or page numbers.
- If an assessment schedule or term outline mentions UPCOMING TESTS, SACS, or EXAMS, reference them in the report. For example: "Julian's quadratics SAC is scheduled for Week 7 — today's session covered key skills that will be assessed. Before the test, focus on..." This is extremely valuable information for parents.
- If a school report mentions areas of concern or teacher feedback, use this to contextualise your observations. For example: "Julian's school report noted he needs to show more working — we focused on this today and he's improving."`;
}

function buildTextbookBlock(resources) {
  if (!resources?.length) return "";

  const textbooks = resources.filter(
    (r) =>
      r.category === "textbook" &&
      r.content &&
      !r.content.startsWith("[File:")
  );
  const onFileOnly = resources.filter(
    (r) =>
      r.category === "textbook" &&
      (!r.content || r.content.startsWith("[File:"))
  );

  if (textbooks.length === 0 && onFileOnly.length === 0) return "";

  const sections = [];

  if (textbooks.length > 0) {
    const parts = textbooks.map(
      (t) => `\n--- ${t.name} ---\n${t.content.substring(0, 8000)}`
    );
    sections.push(`STUDENT'S TEXTBOOKS (table of contents — use these to recommend SPECIFIC pages, sections, and exercises):
${parts.join("\n")}

IMPORTANT: When recommending resources, reference SPECIFIC page numbers and section numbers ONLY if they appear EXACTLY in the contents above. Quote the section number/letter and chapter title verbatim. Do NOT paraphrase, do NOT translate "Chapter 6 Section F" into "§6F" unless that is literally how it is written above.`);
  }

  if (onFileOnly.length > 0) {
    const names = onFileOnly.map((t) => `- ${t.name}`).join("\n");
    sections.push(`TEXTBOOKS ON FILE (binary uploads — contents NOT extracted, do NOT invent section or page numbers for these):
${names}

CRITICAL: For these textbooks you do NOT know the chapter structure. You may mention the textbook by name in a generic way ("review the relevant chapter in your Cambridge Year 10 textbook") but you MUST NOT cite specific section numbers, page numbers, or chapter letters. Inventing references that don't match the actual book destroys parent trust.`);
  }

  return sections.join("\n\n");
}

function buildOutputFormat(student, tutor) {
  const today = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `OUTPUT FORMAT (use this exactly, with markdown):

# LESSON SUMMARY

**Student:** ${student.first_name} ${student.last_name} | **Year Level:** ${student.year_level} | **Subject:** [identify from transcript]
**Date:** ${today} | **Tutor:** ${tutor?.full_name || "[tutor name]"}

---

## What We Covered Today
[3-5 sentence plain-English summary of session content]

## Topics & VCAA Curriculum Links
[Bullet list — each topic with:
- **Bold topic name** must be a clean, descriptive subtopic name that a parent would understand. Examples: "Two-way tables", "Venn diagrams", "Unions and intersections", "Conditional probability", "Area of composite shapes", "Factorising monic quadratics".
- Do NOT put VCAA codes or strand names in the bold title. The bold title should ONLY be the plain-English subtopic name.
- After the bold title, add an em-dash and a brief description of what was worked on.
- Then on the next line or after, include the VCAA descriptor code in italics (e.g. *Probability — VC2M8P03*)
- NEVER truncate topic names. Write the full name e.g. "Constructing and interpreting two-way tables" not "Constructing and interpreting two"
]

## How ${student.first_name} Went
[2-3 specific, constructive sentences on performance. Be honest — note what they grasped confidently AND where they need further work.]

## Areas to Focus On Before Next Session
[2-4 bullet points tied directly to session observations]

## Homework Set
[List exact homework tasks if mentioned in the transcript. If no specific homework was assigned, write something like: "${student.first_name} is encouraged to review the practice questions below and attempt similar problems from their textbook, particularly ahead of any upcoming assessments." Do NOT write "No formal homework was set" — always give the student something actionable to work on.]

## Recommended Resources
[2-3 free resources tailored to TODAY's specific topic. Pick from the catalogue below.

ROTATION RULE: vary your recommendations across reports. Do NOT default to Khan Academy / Eddie Woo / CorbettMaths every time — those three appear in too many reports. Reach for less-obvious picks when they fit.

NO URLs, NO LINKS. Use the site/channel name only. Tell the reader what to SEARCH for. Example: "Search 'sine and cosine rules' on Maths Genie for graded practice worksheets with answers."

CATALOGUE — match the type to the topic and year level:

Foundational concepts (any year):
- Khan Academy — long video walkthroughs, structured by topic
- Maths Is Fun — concise written explanations, good for younger students
- BBC Bitesize — short clear summaries

Engaging video explanations:
- Eddie Woo (YouTube) — Australian, full curriculum from Year 7 to VCE
- 3Blue1Brown — visual intuition for senior topics (calculus, linear algebra)
- The Organic Chemistry Tutor (YouTube) — fast-paced, lots of worked examples
- Professor Leonard (YouTube) — methodical, slower-paced, calculus-heavy
- Patrick JMT (YouTube) — bite-sized topic videos
- Mr Woo (YouTube, separate from Eddie) — VCE-aligned worked examples
- Mario's Math Tutoring (YouTube) — VCE-aligned worked examples
- vinteachesmath (YouTube) — clean blackboard-style explanations

VCE-specific (Years 11–12):
- VCAA past exams and sample materials — for SAC and exam practice
- Engage Education — VCE practice exams and study guides
- Itute — past VCAA exam solutions
- Cambridge HOTmaths — interactive VCE-aligned practice
- Maffsguru (YouTube) — VCE Methods walkthroughs

Practice and drills:
- CorbettMaths — practice questions and 5-a-day worksheets
- Maths Genie — graded worksheets (Foundation/Higher), strong for revision
- Transum — short topic-specific exercises
- IXL — adaptive practice that adjusts to the student
- Mathspace — interactive with instant feedback
- Dr Frost Maths — topic-tagged practice with answers

Visualisation and exploration:
- Desmos — graphing calculator and interactive activities
- GeoGebra — geometry, calculus, and 3D tools
- Mathigon — interactive textbook
- Wolfram Alpha — solution checking with step-by-step working
- Symbolab — algebraic step-by-step

For each pick, describe the SEARCH TERM and what they'll get. Don't just name the site.]

## Practice Questions
[3-5 questions at appropriate year level and difficulty, directly tied to today's content. Verify every step is mathematically correct before including. Label: [Foundation] / [Standard] / [Extension].

For EACH question, write the question first, then wrap the full worked solution in <details><summary>Reveal worked solution</summary> ... </summary></details> so the student can attempt it before checking. Use this exact structure (the summary tag closes itself):

**Question 1** [Foundation]
Factorise x² + 5x + 6.

<details><summary>Reveal worked solution</summary>

We need two numbers that multiply to 6 and add to 5. Those are 2 and 3.

So x² + 5x + 6 = (x + 2)(x + 3).

</details>

**Question 2** [Standard]
...question text...

<details><summary>Reveal worked solution</summary>

...full working...

</details>

Keep the blank line between <summary> and the working, and another blank line before </details>, so the inner markdown renders correctly.]

---
*This summary was prepared for the family of ${student.first_name} by Tuterly.*`;
}

/**
 * Build the system+user message blocks for report generation.
 *
 * @param {{ student: object, session: object, resources?: object[] }} args
 * @returns {{ system: Array, user: string }}
 */
export function buildReportPrompt({ student, session, resources = [], tutor = null }) {
  // Use the curriculum level the student is actually working at, falling back
  // to school year. This matters when a student is ahead/behind their year.
  const curriculumLevel =
    student.working_level && student.working_level.trim()
      ? student.working_level
      : student.year_level;
  const curriculumBlock = buildCurriculumBlock(curriculumLevel, student.subjects);

  const workingLine =
    student.working_level && student.working_level !== student.year_level
      ? `\n- Working at: ${student.working_level} (curriculum)`
      : "";

  const studentContext = `STUDENT CONTEXT:
- Name: ${student.first_name} ${student.last_name}
- Year Level: ${student.year_level}${workingLine}
- School: ${student.school || "Not specified"}
- Subjects: ${student.subjects?.join(", ") || "Not specified"}
- Goals: ${student.goals || "Not specified"}
- Learning Concerns: ${student.concerns || "Not specified"}
- Term Outline: ${student.term_outline || "Not provided"}

IMPORTANT: Pitch the language, examples, and practice questions to the WORKING LEVEL above (the curriculum block reflects this). Mention the school year level only if relevant context.`;

  const resourceBlock = buildResourceBlock(resources);
  const textbookBlock = buildTextbookBlock(resources);

  const transcriptBlock = `SESSION TRANSCRIPT / NOTES:
${session.raw_notes || "(no notes provided)"}`;

  const userParts = [
    studentContext,
    resourceBlock,
    textbookBlock,
    transcriptBlock,
    buildOutputFormat(student, tutor),
  ].filter(Boolean);

  const system = [
    {
      type: "text",
      text: STATIC_INSTRUCTIONS,
      cache_control: { type: "ephemeral" },
    },
  ];

  if (curriculumBlock) {
    system.push({
      type: "text",
      text: curriculumBlock,
      cache_control: { type: "ephemeral" },
    });
  }

  return { system, user: userParts.join("\n\n") };
}
