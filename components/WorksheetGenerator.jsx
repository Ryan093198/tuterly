import WorksheetGeneratorClient from "@/components/WorksheetGeneratorClient";
import { chapterPickerData, chapterPreset } from "@/lib/worksheet-chapters";

// Server wrapper for the worksheet generator: adds the Years 7 to 10
// textbook chapter list (read from content files on the server) and, on a
// topic page, the chapter and subtopics that page's topic maps to.
export default function WorksheetGenerator(props) {
  const preset = chapterPreset(props.initialYearLevel, props.initialTopicId);
  return <WorksheetGeneratorClient {...props} chaptersByYear={chapterPickerData()} initialChapter={preset} />;
}
