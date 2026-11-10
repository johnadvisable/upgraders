import { createFileRoute } from "@tanstack/react-router";
import { Header, Hero, LiveCourses, Services } from "@/components/home/Top";
import { TrustedBy } from "@/components/home/TrustedBy";
import { Enablement, Industries, Method, Paradox, Roles } from "@/components/home/Middle";
import { Cases, Faq, Footer, Quote, Team, Tools, Why } from "@/components/home/Bottom";

const title = "The Upgraders — Εκπαίδευση AI & custom συστήματα για επιχειρήσεις";
const description = "Βάλατε ChatGPT και Claude, η καθημερινότητα όμως έμεινε ίδια. Εκπαιδεύουμε την ομάδα σας και χτίζουμε συστήματα AI.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <TrustedBy />
      <LiveCourses />
      <Roles />
      <Industries />
      <Paradox />
      <Enablement />
      <Method />
      <Cases />
      <Tools />
      <Why />
      <Team />
      <Quote />
      <Faq />
      <Footer />
    </main>
  );
}
