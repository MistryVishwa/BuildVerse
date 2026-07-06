import FAQAccordion from "@/components/ui/FAQAccordion";

export const metadata = {
  title: "FAQ | BuildVerse",
  description: "Frequently Asked Questions about contributing to and using BuildVerse.",
};

export default function FAQPage() {
  return (
    <main style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "60px" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 className="text-gradient" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Everything you need to know about BuildVerse, how it works, and how to get involved in the community.
          </p>
        </div>
        
        <FAQAccordion />
      </div>
    </main>
  );
}
