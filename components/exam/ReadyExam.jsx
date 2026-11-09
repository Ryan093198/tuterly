"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ExamPaper } from "@/components/exam/ExamGenerator";
import { trackEvent } from "@/lib/analytics";
import "./exam.css";

// A ready-made practice exam on the exam preparation pages (Ryan, 9 Nov
// 2026). The questions are on the page; the answers sit in a closed
// section underneath. Print with or without the answers.
export default function ReadyExam({ exam, placement }) {
  const [printing, setPrinting] = useState(null); // null | "paper" | "answers"

  useEffect(() => {
    if (!printing) return;
    const done = () => setPrinting(null);
    window.addEventListener("afterprint", done);
    const t = setTimeout(() => window.print(), 50);
    return () => {
      clearTimeout(t);
      window.removeEventListener("afterprint", done);
    };
  }, [printing]);

  function print(withAnswers) {
    trackEvent("exam_print", { year: exam.year, answers: withAnswers, placement });
    setPrinting(withAnswers ? "answers" : "paper");
  }

  return (
    <div className="eg-result">
      <div className="eg-tools">
        <button type="button" className="eg-btn" onClick={() => print(false)}>Print or save as PDF</button>
        <button type="button" className="eg-btn eg-btn--ghost" onClick={() => print(true)}>Print with answers</button>
      </div>
      <ExamPaper exam={exam} showAnswers={false} collapsedAnswers />
      {printing && typeof document !== "undefined" &&
        createPortal(
          <div className="eg-print-root">
            <ExamPaper exam={exam} showAnswers={printing === "answers"} forPrint />
          </div>,
          document.body
        )}
    </div>
  );
}
