import { notFound } from "next/navigation";
import Home from "@/app/page";
import ScrollOnMount from "@/components/ScrollOnMount";

const VALID_SECTIONS = ["about", "fits", "code", "beyond", "agency", "contact", "testimonials"];

export function generateStaticParams() {
  return VALID_SECTIONS.map(section => ({ section }));
}

type Props = { params: Promise<{ section: string }> };

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  if (!VALID_SECTIONS.includes(section)) notFound();
  return (
    <>
      <ScrollOnMount section={section} />
      <Home />
    </>
  );
}
