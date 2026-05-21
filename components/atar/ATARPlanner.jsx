"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { c } from "@/components/marketing/theme";
import courseData from "@/lib/course-data.json";
import { ENGLISH_SUBJECTS, isEnglishSubject, rawToScaled, findSubject } from "@/lib/vce-subjects";
import SubjectPicker from "./SubjectPicker";
import {
  calculateAtar,
  checkPrerequisites,
  suggestImprovements,
  findSimilarCourses,
  atarBand,
} from "@/lib/atar-engine";
import { savePlannerLead } from "@/app/atar-planner/actions";
import ContactCTA from "@/components/marketing/ContactCTA";

const COURSES = courseData.courses;
const CATEGORIES = [...new Set(COURSES.map((c) => c.category))].sort();

const BAND_COLOURS = {
  high: { bg: "#10B98115", fg: "#10B981", border: "#10B981" },
  mid: { bg: c.tealPale, fg: c.tealDark, border: c.teal },
  low: { bg: "#F59E0B15", fg: "#B45309", border: "#F59E0B" },
  muted: { bg: c.offWhite, fg: c.textMuted, border: c.border },
};

const MAX_COURSES = 5;

export default function ATARPlanner() {
  const [screen, setScreen] = useState("choose"); // 'choose' | 'subjects' | 'results'
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [subjects, setSubjects] = useState(() => [
    { subject: "English", score: "" },
    { subject: "", score: "" },
    { subject: "", score: "" },
    { subject: "", score: "" },
  ]);
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const [emailSkipped, setEmailSkipped] = useState(false);
  const [emailError, setEmailError] = useState(null);

  // Resolve ids to course objects, preserving the order the student
  // picked them. Sorted by guaranteed ATAR desc on the results screen
  // separately so this stays a stable selection ledger.
  const selectedCourses = useMemo(
    () =>
      selectedCourseIds
        .map((id) => COURSES.find((cc) => cc.id === id))
        .filter(Boolean),
    [selectedCourseIds]
  );

  // The "primary" course is the highest-ATAR one - used for headline
  // CourseFit, improvement target, and similar-course category bias.
  const primaryCourse = useMemo(() => {
    if (selectedCourses.length === 0) return null;
    return selectedCourses.reduce((best, cc) =>
      cc.guaranteedAtar > best.guaranteedAtar ? cc : best
    );
  }, [selectedCourses]);

  // Filtered list for the course-selection screen
  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return COURSES.filter((cc) => {
      if (activeCategory !== "All" && cc.category !== activeCategory) return false;
      if (!q) return true;
      return (
        cc.courseName.toLowerCase().includes(q) ||
        cc.university.toLowerCase().includes(q) ||
        cc.category.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, activeCategory]);

  // Convert subject input to numeric scores for the engine
  const validSubjects = useMemo(
    () =>
      subjects
        .filter((s) => s.subject && s.score !== "" && !isNaN(Number(s.score)))
        .map((s) => ({ subject: s.subject, score: Math.max(0, Math.min(50, Number(s.score))) })),
    [subjects]
  );

  const result = useMemo(() => calculateAtar(validSubjects), [validSubjects]);

  // Prereq results, one set per selected course
  const prereqResultsByCourse = useMemo(
    () =>
      selectedCourses.map((cc) => ({
        course: cc,
        results: checkPrerequisites(cc, validSubjects),
      })),
    [selectedCourses, validSubjects]
  );

  // Detailed-results gate: show full results once email is captured or skipped
  const detailedUnlocked = emailSaved || emailSkipped;
  const targetAtar = primaryCourse?.guaranteedAtar ?? Math.min(99, Math.max(70, result.atar + 5));
  const improvements = useMemo(
    () => (detailedUnlocked ? suggestImprovements(validSubjects, targetAtar) : []),
    [detailedUnlocked, validSubjects, targetAtar]
  );
  const similarCourses = useMemo(
    () =>
      result.hasEnglish && result.hasMinSubjects
        ? findSimilarCourses(COURSES, result.atar, validSubjects, {
            excludeIds: selectedCourseIds,
            selectedCategory: primaryCourse?.category ?? null,
          })
        : [],
    [result.hasEnglish, result.hasMinSubjects, result.atar, validSubjects, selectedCourseIds, primaryCourse]
  );

  // ----- Course selection toggle -----
  function toggleCourse(course) {
    setSelectedCourseIds((prev) => {
      if (prev.includes(course.id)) {
        return prev.filter((id) => id !== course.id);
      }
      if (prev.length >= MAX_COURSES) return prev;
      return [...prev, course.id];
    });
  }

  function clearCourses() {
    setSelectedCourseIds([]);
  }

  // Move to the subjects screen, prefilling rows from the union of
  // every selected course's prereq list (English first, then unique
  // others). If none selected, just go through.
  function goToSubjects() {
    const allPrereqs = selectedCourses.flatMap((cc) =>
      cc.prerequisites.map((p) => p.subject)
    );
    const unique = [...new Set(allPrereqs)];
    const remaining = unique.filter((s) => s !== "English");
    const filled = ["English", ...remaining].slice(0, 6).map((s) => ({ subject: s, score: "" }));
    while (filled.length < 4) filled.push({ subject: "", score: "" });
    setSubjects(filled);
    setScreen("subjects");
  }

  function skipCourseSelection() {
    setSelectedCourseIds([]);
    setScreen("subjects");
  }

  // ----- Subject row helpers -----
  function updateSubject(idx, field, value) {
    setSubjects((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
  }

  function addSubject() {
    if (subjects.length >= 6) return;
    setSubjects((prev) => [...prev, { subject: "", score: "" }]);
  }

  function removeSubject(idx) {
    setSubjects((prev) => prev.filter((_, i) => i !== idx));
  }

  // ----- Email capture -----
  async function submitEmail(e) {
    e.preventDefault();
    setEmailError(null);
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email.");
      return;
    }
    try {
      await savePlannerLead({
        email: email.trim().toLowerCase(),
        courseIds: selectedCourseIds,
        atar: result.atar,
        aggregate: result.aggregate,
        subjects: validSubjects,
      });
    } catch {
      // Non-blocking: even if save fails, let the user see results
    }
    setEmailSaved(true);
  }

  // ===================================================================
  // SCREEN: course selection
  // ===================================================================
  if (screen === "choose") {
    const count = selectedCourseIds.length;
    const atLimit = count >= MAX_COURSES;
    return (
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 24px", paddingBottom: count > 0 ? 96 : 24 }}>
        <div
          style={{
            background: c.tealPale,
            border: `1px solid ${c.teal}`,
            borderRadius: 14,
            padding: "14px 18px",
            marginBottom: 18,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>
              Pick up to {MAX_COURSES} courses
            </p>
            <p style={{ fontSize: 14, color: c.text }}>
              Compare side by side. We&apos;ll check your ATAR + prereqs against each one.
            </p>
          </div>
          {count > 0 && (
            <button
              type="button"
              onClick={clearCourses}
              style={{
                background: "none",
                border: "none",
                color: c.tealDark,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline",
              }}
            >
              Clear selection
            </button>
          )}
        </div>

        <SearchBox value={searchQuery} onChange={setSearchQuery} />
        <CategoryTabs
          categories={["All", ...CATEGORIES]}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
        <div style={{ marginTop: 24 }}>
          <button
            type="button"
            onClick={skipCourseSelection}
            style={{
              padding: "12px 18px",
              borderRadius: 10,
              border: `1px solid ${c.border}`,
              background: c.white,
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: c.text,
            }}
          >
            Or skip - just calculate my ATAR →
          </button>
        </div>
        <div style={{ marginTop: 28, display: "grid", gap: 10 }}>
          {filteredCourses.length === 0 ? (
            <p style={{ color: c.textMuted, fontSize: 14 }}>No courses match that filter.</p>
          ) : (
            filteredCourses.map((course) => {
              const isSelected = selectedCourseIds.includes(course.id);
              const isDisabled = !isSelected && atLimit;
              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  selected={isSelected}
                  disabled={isDisabled}
                  onToggle={() => toggleCourse(course)}
                />
              );
            })
          )}
        </div>

        {count > 0 && (
          <div
            style={{
              position: "sticky",
              bottom: 16,
              marginTop: 24,
              padding: "14px 18px",
              background: c.navy,
              color: c.white,
              borderRadius: 14,
              boxShadow: "0 12px 32px rgba(15, 23, 42, 0.25)",
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
              {count} {count === 1 ? "course" : "courses"} selected
              {atLimit ? " (max)" : ""}
            </p>
            <button
              type="button"
              onClick={goToSubjects}
              style={{
                padding: "12px 22px",
                borderRadius: 10,
                background: c.teal,
                color: c.white,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              Continue →
            </button>
          </div>
        )}
      </div>
    );
  }

  // ===================================================================
  // SCREEN: subject input
  // ===================================================================
  if (screen === "subjects") {
    // Merge prereqs across all selected courses, taking the max required
    // score per subject so the student knows the toughest bar to clear.
    const mergedPrereqs = (() => {
      const map = new Map();
      for (const cc of selectedCourses) {
        for (const p of cc.prerequisites) {
          const existing = map.get(p.subject);
          if (!existing || p.minimumScore > existing.minimumScore) {
            map.set(p.subject, { subject: p.subject, minimumScore: p.minimumScore });
          }
        }
      }
      return [...map.values()];
    })();

    return (
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
        {selectedCourses.length > 0 && (
          <div
            style={{
              background: c.tealPale,
              border: `1px solid ${c.teal}`,
              borderRadius: 14,
              padding: "16px 18px",
              marginBottom: 20,
            }}
          >
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>
              Planning for {selectedCourses.length} {selectedCourses.length === 1 ? "course" : "courses"}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
              {selectedCourses.map((cc) => (
                <li
                  key={cc.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px 12px",
                    background: c.white,
                    border: `1px solid ${c.border}`,
                    borderRadius: 8,
                  }}
                >
                  <div>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.navy }}>
                      {cc.courseName}
                    </p>
                    <p style={{ fontSize: 12, color: c.textLight }}>
                      {cc.university} - Guaranteed ATAR {cc.guaranteedAtar.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {mergedPrereqs.length > 0 ? (
              <div style={{ marginTop: 12 }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>
                  Combined subject prerequisites
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
                  {mergedPrereqs.map((p) => (
                    <li
                      key={p.subject}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 12,
                        padding: "6px 10px",
                        background: c.white,
                        border: `1px solid ${c.border}`,
                        borderRadius: 8,
                        fontSize: 13,
                      }}
                    >
                      <span style={{ color: c.navy, fontWeight: 600 }}>{p.subject}</span>
                      <span style={{ color: c.textLight, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                        Study score {p.minimumScore}+
                      </span>
                    </li>
                  ))}
                </ul>
                {selectedCourses.length > 1 && (
                  <p style={{ fontSize: 12, color: c.textMuted, marginTop: 6 }}>
                    Highest required score across all selected courses.
                  </p>
                )}
              </div>
            ) : (
              <p style={{ fontSize: 13, color: c.textMuted, marginTop: 10, fontStyle: "italic" }}>
                No specific subject prerequisites - just an ATAR + English requirement.
              </p>
            )}
            <button
              type="button"
              onClick={() => setScreen("choose")}
              style={{
                marginTop: 10,
                background: "none",
                border: "none",
                color: c.tealDark,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                padding: 0,
              }}
            >
              ← Edit course selection
            </button>
          </div>
        )}

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: c.navy, marginBottom: 8, lineHeight: 1.25 }}>
          Enter your Unit 3/4 scores.
        </h2>
        <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6, marginBottom: 24 }}>
          Use your raw study scores out of 50 (your actual or predicted ones). English is required - we&apos;ll use whichever English subject you sat as one of your Primary 4.
        </p>

        <LiveAtarPill result={result} selectedCourse={primaryCourse} />

        <div style={{ display: "grid", gap: 10 }}>
          {subjects.map((row, idx) => (
            <SubjectRow
              key={idx}
              row={row}
              onChange={(field, value) => updateSubject(idx, field, value)}
              onRemove={subjects.length > 4 ? () => removeSubject(idx) : null}
              isFirst={idx === 0}
            />
          ))}
        </div>

        {subjects.length < 6 && (
          <button
            type="button"
            onClick={addSubject}
            style={{
              marginTop: 12,
              background: "none",
              border: `1px dashed ${c.border}`,
              color: c.tealDark,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              padding: "10px 16px",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            + Add another subject
          </button>
        )}

        <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
          <button
            type="button"
            disabled={!result.hasEnglish || !result.hasMinSubjects}
            onClick={() => setScreen("results")}
            style={{
              padding: "14px 28px",
              borderRadius: 10,
              background:
                !result.hasEnglish || !result.hasMinSubjects ? c.border : c.navy,
              color: c.white,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              border: "none",
              cursor:
                !result.hasEnglish || !result.hasMinSubjects ? "not-allowed" : "pointer",
            }}
          >
            Calculate my ATAR →
          </button>
        </div>
        {(!result.hasEnglish || !result.hasMinSubjects) && (
          <p style={{ fontSize: 13, color: c.amber, marginTop: 10 }}>
            {!result.hasEnglish
              ? "Add an English subject (English, EAL, English Language, or Literature) - it's required in the Primary 4."
              : "Enter at least 4 subjects to calculate your ATAR."}
          </p>
        )}
      </div>
    );
  }

  // ===================================================================
  // SCREEN: results
  // ===================================================================
  const band = atarBand(result.atar);
  const bandColours = BAND_COLOURS[band];

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 24px" }}>
      {/* ATAR HEADLINE */}
      <div
        style={{
          background: bandColours.bg,
          border: `2px solid ${bandColours.border}`,
          borderRadius: 20,
          padding: "36px 32px",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: bandColours.fg, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>
          Estimated ATAR
        </p>
        <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 76, lineHeight: 1, color: c.navy, marginBottom: 14 }}>
          {result.atar.toFixed(2)}
        </p>
        <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}>
          Primary 4 total: <strong style={{ color: c.navy }}>{result.primary4Total.toFixed(1)}</strong>{" "}
          {result.incrementTotal > 0 && (
            <>+ increments: <strong style={{ color: c.navy }}>{result.incrementTotal.toFixed(2)}</strong></>
          )}{" "}
          → aggregate <strong style={{ color: c.navy }}>{result.aggregate.toFixed(2)}</strong>
        </p>
        <p style={{ fontSize: 12, color: c.textMuted, marginTop: 6 }}>
          All totals are scaled study scores. Raw → scaled conversion applied per subject.
        </p>
      </div>

      {/* SCALED SCORE BREAKDOWN */}
      <Section title="Scaled scores used in the aggregate">
        <div style={{ display: "grid", gap: 8 }}>
          {result.scaled.map((s, i) => {
            const isInPrimary4 = result.primary4.includes(s);
            const isIncrement = s === result.increment5 || s === result.increment6;
            const role = isInPrimary4 ? "Primary 4" : isIncrement ? "Increment (10%)" : "Not counted";
            const lift = s.scaledScore - s.rawScore;
            const liftLabel =
              Math.abs(lift) < 0.1
                ? null
                : `${lift > 0 ? "+" : ""}${lift.toFixed(1)}`;
            return (
              <div
                key={s.subject + i}
                style={{
                  padding: "10px 14px",
                  background: c.white,
                  border: `1px solid ${c.border}`,
                  borderRadius: 10,
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 14, color: c.text }}>{s.subject}</span>
                <span style={{ fontSize: 13, color: c.textLight, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Raw <strong style={{ color: c.navy }}>{s.rawScore}</strong> → Scaled{" "}
                  <strong style={{ color: c.navy }}>{s.scaledScore.toFixed(1)}</strong>{" "}
                  {liftLabel && (
                    <span style={{ color: lift > 0 ? c.success : c.amber, fontWeight: 600 }}>
                      ({liftLabel})
                    </span>
                  )}
                </span>
                <span style={{ fontSize: 11, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>
                  {role}
                </span>
              </div>
            );
          })}
        </div>
      </Section>

      {/* PER-COURSE FIT + PREREQUISITES */}
      {selectedCourses.length > 0 && (
        <Section title={selectedCourses.length === 1 ? "Your course" : "Your shortlist"}>
          <div style={{ display: "grid", gap: 14 }}>
            {[...prereqResultsByCourse]
              .sort((a, b) => b.course.guaranteedAtar - a.course.guaranteedAtar)
              .map(({ course, results }) => {
                const gap = result.atar - course.guaranteedAtar;
                const meets = gap >= 0;
                const allPrereqsMet = results.every((r) => r.met);
                return (
                  <div
                    key={course.id}
                    style={{
                      background: c.white,
                      border: `1px solid ${meets ? "#10B981" : "#F59E0B"}`,
                      borderRadius: 14,
                      padding: "16px 18px",
                    }}
                  >
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                      <div>
                        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: c.navy }}>
                          {course.courseName}
                        </p>
                        <p style={{ fontSize: 13, color: c.textLight }}>
                          {course.university} - Guaranteed ATAR {course.guaranteedAtar.toFixed(2)}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: meets ? c.success : "#B45309", textTransform: "uppercase", letterSpacing: 1.5 }}>
                          {meets ? "Above guaranteed" : "Below guaranteed"}
                        </p>
                        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: meets ? c.success : "#B45309" }}>
                          {meets ? "+" : ""}{gap.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {results.length > 0 && (
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
                        {results.map((p) => (
                          <li
                            key={p.subject}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              padding: "8px 12px",
                              background: p.met ? "#10B98112" : "#F59E0B12",
                              border: `1px solid ${p.met ? "#10B98140" : "#F59E0B40"}`,
                              borderRadius: 8,
                              fontSize: 13,
                            }}
                          >
                            <span style={{ fontSize: 14 }}>{p.met ? "✓" : "!"}</span>
                            <span style={{ flex: 1 }}>
                              <strong style={{ color: c.navy }}>{p.subject}</strong>
                              {p.actualSubject && p.actualSubject !== p.subject && (
                                <span style={{ color: c.textMuted }}> (using {p.actualSubject})</span>
                              )}
                            </span>
                            <span style={{ color: c.textLight, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                              {p.actualScore || "-"} / need {p.requiredScore}+
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {results.length === 0 && (
                      <p style={{ fontSize: 12, color: c.textMuted, fontStyle: "italic" }}>
                        No specific subject prerequisites for this course.
                      </p>
                    )}
                    {results.length > 0 && (
                      <p style={{ marginTop: 8, fontSize: 12, color: allPrereqsMet ? c.success : "#B45309", fontWeight: 600 }}>
                        {allPrereqsMet ? "All prerequisites met." : "Some prerequisites not yet met."}
                      </p>
                    )}
                  </div>
                );
              })}
          </div>
        </Section>
      )}

      {/* SIMILAR COURSES (always shown) */}
      {similarCourses.length > 0 && (
        <Section
          title={
            primaryCourse
              ? `Similar ${primaryCourse.category} courses you&apos;d qualify for`
              : "Courses you&apos;d qualify for"
          }
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
            {similarCourses.map(({ course, allPrereqsMet, unmetPrereqs }) => (
              <li
                key={course.id}
                style={{
                  padding: "14px 18px",
                  background: c.white,
                  border: `1px solid ${c.border}`,
                  borderRadius: 12,
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: c.navy }}>
                    {course.courseName}
                  </p>
                  <p style={{ fontSize: 13, color: c.textLight, marginTop: 2 }}>
                    {course.university} - Guaranteed ATAR {course.guaranteedAtar.toFixed(2)} - {course.duration} yr
                  </p>
                  {course.prerequisites.length > 0 && (
                    <p style={{ fontSize: 12, color: c.textMuted, marginTop: 4 }}>
                      Prereqs:{" "}
                      {course.prerequisites
                        .map((p) => `${p.subject} ${p.minimumScore}+`)
                        .join(", ")}
                    </p>
                  )}
                  {!allPrereqsMet && unmetPrereqs && unmetPrereqs.length > 0 && (
                    <p style={{ fontSize: 12, color: "#B45309", marginTop: 4, fontWeight: 600 }}>
                      Missing: {unmetPrereqs.map((p) => `${p.subject} ${p.minimumScore}+`).join(", ")}
                    </p>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    padding: "4px 10px",
                    borderRadius: 999,
                    color: allPrereqsMet ? c.success : "#B45309",
                    background: allPrereqsMet ? "#10B98115" : "#F59E0B15",
                  }}
                >
                  {allPrereqsMet ? "Prereqs met" : "Missing prereq"}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* EMAIL GATE for improvement plan */}
      {!detailedUnlocked ? (
        <EmailGate
          email={email}
          setEmail={setEmail}
          submitEmail={submitEmail}
          skipEmail={() => setEmailSkipped(true)}
          emailError={emailError}
        />
      ) : (
        improvements.length > 0 && (
          <Section
            title={
              primaryCourse
                ? `To reach ${primaryCourse.guaranteedAtar.toFixed(2)} (${primaryCourse.courseName})`
                : "Where small score lifts move your ATAR most"
            }
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
              {improvements.map((s) => (
                <li
                  key={s.subject}
                  style={{
                    padding: "14px 18px",
                    background: c.offWhite,
                    border: `1px solid ${c.border}`,
                    borderRadius: 12,
                  }}
                >
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: c.navy }}>
                    {s.subject}
                  </p>
                  <p style={{ fontSize: 13, color: c.textLight, marginTop: 4 }}>
                    Lift raw study score from <strong>{s.currentRawScore}</strong> to <strong>{s.targetRawScore}</strong> → ATAR{" "}
                    <strong style={{ color: c.tealDark }}>{s.projectedAtar.toFixed(2)}</strong>{" "}
                    <span style={{ color: c.success, fontWeight: 600 }}>(+{s.atarLift.toFixed(2)})</span>
                  </p>
                  <p style={{ fontSize: 11, color: c.textMuted, marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>
                    {s.weight === "100%" ? "Primary 4 - full weight" : "Increment subject - 10% weight"}
                  </p>
                </li>
              ))}
            </ul>
          </Section>
        )
      )}

      {/* CTAs */}
      <div style={{ marginTop: 32 }}>
        <ContactCTA
          variant="card"
          headline="Need help getting to your target ATAR?"
          subhead={
            primaryCourse
              ? `Talk to us about lifting your scores toward ${primaryCourse.guaranteedAtar.toFixed(2)} - we'll match you to a VCE tutor in your subject.`
              : "Talk to us about lifting your scores - we'll match you to a VCE tutor in your weakest subject."
          }
          context="ATAR planner results"
        />
        <div style={{ marginTop: 14, textAlign: "center" }}>
          <Link
            href="/directory"
            style={{
              color: c.tealDark,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Or browse the VCE tutor directory →
          </Link>
        </div>
      </div>

      <div style={{ marginTop: 18, display: "flex", justifyContent: "center" }}>
        <button
          type="button"
          onClick={() => setScreen("subjects")}
          style={{
            background: "none",
            border: `1px solid ${c.border}`,
            padding: "10px 16px",
            borderRadius: 10,
            color: c.text,
            fontSize: 13,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ← Adjust scores
        </button>
      </div>
    </div>
  );
}

// ===================================================================
// SMALL HELPERS
// ===================================================================

function Section({ title, children }) {
  return (
    <div style={{ marginTop: 24 }}>
      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: title }} />
      {children}
    </div>
  );
}

function SearchBox({ value, onChange }) {
  return (
    <input
      type="search"
      placeholder="Search for a course (e.g. Commerce Melbourne, Engineering, Law)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "14px 18px",
        borderRadius: 12,
        border: `2px solid ${c.border}`,
        fontSize: 15,
        fontFamily: "'DM Sans', sans-serif",
        background: c.white,
        outline: "none",
      }}
      onFocus={(e) => (e.target.style.borderColor = c.teal)}
      onBlur={(e) => (e.target.style.borderColor = c.border)}
    />
  );
}

function CategoryTabs({ categories, active, onSelect }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 16,
      }}
    >
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: `1px solid ${isActive ? c.teal : c.border}`,
              background: isActive ? c.teal : c.white,
              color: isActive ? c.white : c.text,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

function CourseCard({ course, onToggle, selected, disabled }) {
  const borderColor = selected ? c.teal : c.border;
  const bg = selected ? c.tealPale : c.white;
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={selected}
      style={{
        textAlign: "left",
        background: bg,
        border: `2px solid ${borderColor}`,
        borderRadius: 14,
        padding: "16px 18px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 14,
        alignItems: "center",
      }}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          border: `2px solid ${selected ? c.teal : c.border}`,
          background: selected ? c.teal : c.white,
          color: c.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          fontWeight: 700,
        }}
        aria-hidden="true"
      >
        {selected ? "✓" : ""}
      </span>
      <div>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: c.navy, marginBottom: 4 }}>
          {course.courseName}
        </p>
        <p style={{ fontSize: 13, color: c.textLight }}>
          {course.university} - {course.duration} yr - {course.category}
        </p>
        {course.prerequisites.length > 0 && (
          <p style={{ fontSize: 12, color: c.textMuted, marginTop: 6 }}>
            Prereqs:{" "}
            {course.prerequisites
              .map((p) => `${p.subject} ${p.minimumScore}+`)
              .join(", ")}
          </p>
        )}
      </div>
      <div style={{ textAlign: "right" }}>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1 }}>
          Guaranteed
        </p>
        <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: c.navy }}>
          {course.guaranteedAtar.toFixed(2)}
        </p>
      </div>
    </button>
  );
}

function SubjectRow({ row, onChange, onRemove, isFirst }) {
  const meta = row.subject ? findSubject(row.subject) : null;
  const rawNum = Number(row.score);
  const scaled =
    meta && Number.isFinite(rawNum) && rawNum > 0
      ? rawToScaled(rawNum, meta.scaling)
      : null;
  const lift = scaled !== null ? scaled - rawNum : 0;

  return (
    <div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 100px auto",
        gap: 10,
        alignItems: "center",
      }}
    >
      <SubjectPicker
        value={row.subject}
        onChange={(name) => onChange("subject", name)}
        placeholder={isFirst ? "Search English subjects..." : "Search subjects..."}
      />
      <input
        type="number"
        min={0}
        max={50}
        step={1}
        placeholder="0-50"
        value={row.score}
        onChange={(e) => onChange("score", e.target.value)}
        style={{
          padding: "12px 14px",
          borderRadius: 10,
          border: `1px solid ${c.border}`,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 15,
          fontWeight: 600,
          color: c.navy,
          textAlign: "center",
          background: c.white,
        }}
      />
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          style={{
            border: "none",
            background: "none",
            color: c.textMuted,
            fontSize: 18,
            cursor: "pointer",
            padding: "0 8px",
          }}
          aria-label="Remove subject"
        >
          ×
        </button>
      ) : (
        <span style={{ width: 24 }} />
      )}
    </div>
    {scaled !== null && (
      <p style={{ fontSize: 12, color: c.textMuted, marginTop: 4, paddingLeft: 4 }}>
        Raw {rawNum} → estimated scaled <strong style={{ color: c.navy }}>{scaled.toFixed(1)}</strong>
        {Math.abs(lift) >= 0.5 && (
          <span style={{ color: lift > 0 ? c.success : c.amber, marginLeft: 6, fontWeight: 600 }}>
            ({lift > 0 ? "+" : ""}
            {lift.toFixed(1)})
          </span>
        )}
      </p>
    )}
    </div>
  );
}

function LiveAtarPill({ result, selectedCourse }) {
  const ready = result.hasEnglish && result.hasMinSubjects;
  const band = ready ? atarBand(result.atar) : "muted";
  const colours = BAND_COLOURS[band];
  const meetsCourse = ready && selectedCourse ? result.atar >= selectedCourse.guaranteedAtar : null;
  return (
    <div
      style={{
        marginBottom: 18,
        padding: "14px 18px",
        background: ready ? colours.bg : c.offWhite,
        border: `1px solid ${ready ? colours.border : c.border}`,
        borderRadius: 12,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: ready ? colours.fg : c.textMuted, textTransform: "uppercase", letterSpacing: 1.5 }}>
          Live estimated ATAR
        </p>
        <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, lineHeight: 1.1, color: c.navy, marginTop: 4 }}>
          {ready ? result.atar.toFixed(2) : "--"}
        </p>
        {ready && (
          <p style={{ fontSize: 12, color: c.textLight, marginTop: 4 }}>
            Aggregate {result.aggregate.toFixed(2)} - updates as you type.
          </p>
        )}
        {!ready && (
          <p style={{ fontSize: 12, color: c.textMuted, marginTop: 4 }}>
            {!result.hasEnglish ? "Add English + 3 other scores to see your live ATAR." : "Enter at least 4 scores to see your live ATAR."}
          </p>
        )}
      </div>
      {ready && selectedCourse && (
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5 }}>
            Target
          </p>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.navy, marginTop: 2 }}>
            {selectedCourse.guaranteedAtar.toFixed(2)}
          </p>
          <p style={{ fontSize: 12, color: meetsCourse ? c.success : "#B45309", fontWeight: 600, marginTop: 2 }}>
            {meetsCourse
              ? `+${(result.atar - selectedCourse.guaranteedAtar).toFixed(2)} above`
              : `${(result.atar - selectedCourse.guaranteedAtar).toFixed(2)} below`}
          </p>
        </div>
      )}
    </div>
  );
}

function EmailGate({ email, setEmail, submitEmail, skipEmail, emailError }) {
  return (
    <div
      style={{
        marginTop: 24,
        padding: "28px 24px",
        background: c.white,
        border: `2px dashed ${c.teal}`,
        borderRadius: 16,
      }}
    >
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>
        Want a personalised lift plan?
      </p>
      <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: c.navy, marginBottom: 8, lineHeight: 1.3 }}>
        Enter your email to see which subjects move your ATAR the most.
      </h3>
      <p style={{ fontSize: 14, color: c.textLight, marginBottom: 18, lineHeight: 1.6 }}>
        We&apos;ll save your plan so you can come back and update your scores as SAC results come in. No spam, just useful study planning emails through the year.
      </p>
      <form onSubmit={submitEmail} style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          style={{
            flex: "1 1 220px",
            padding: "12px 16px",
            borderRadius: 10,
            border: `1px solid ${c.border}`,
            fontSize: 15,
            fontFamily: "'DM Sans', sans-serif",
            background: c.white,
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 22px",
            borderRadius: 10,
            background: c.navy,
            color: c.white,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Save and see plan →
        </button>
      </form>
      {emailError && (
        <p style={{ fontSize: 13, color: c.rose, marginTop: 10 }}>{emailError}</p>
      )}
      <button
        type="button"
        onClick={skipEmail}
        style={{
          marginTop: 14,
          background: "none",
          border: "none",
          color: c.textMuted,
          fontSize: 13,
          cursor: "pointer",
          padding: 0,
          textDecoration: "underline",
        }}
      >
        Skip - I just want the ATAR number
      </button>
    </div>
  );
}
