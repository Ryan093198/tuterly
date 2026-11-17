// Questions on a Years 7 to 10 chapter worksheet: 3 per ticked subtopic, up
// to 10 (Ryan, 17 Nov 2026). Years 3 to 6 stay at 6. Safe to import in the
// browser.
export const MAX_CHAPTER_QUESTIONS = 10;
export const chapterQuestionCount = (ticked) => Math.max(1, Math.min(MAX_CHAPTER_QUESTIONS, 3 * ticked));
