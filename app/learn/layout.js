import { MARKETING_FONTS_IMPORT, c } from "@/components/marketing/theme";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";

export default function LearnLayout({ children }) {
  return (
    <main style={{ background: c.white, fontFamily: "'DM Sans', sans-serif", color: c.text, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_FONTS_IMPORT }} />
      <MarketingNav />
      <div style={{ flex: 1 }}>
        {children}
      </div>
      <MarketingFooter />
    </main>
  );
}
