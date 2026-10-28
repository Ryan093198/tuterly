import StudentLanding from "@/components/study/StudentLanding";
import { SITE_URL } from "@/lib/site";

const TITLE = "Maths Help for Students, Years 7 to 10: Get Better Marks";
const DESCRIPTION =
  "For Years 7 to 10 students: snap the maths questions you got wrong, see the worked solution, and practise fresh versions until you’ve mastered them. Coming soon on iPhone and Android.";
const URL = `${SITE_URL}/students`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
};

export default function StudentsPage() {
  return <StudentLanding />;
}
