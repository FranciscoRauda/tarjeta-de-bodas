import { notFound } from "next/navigation";
import { Invitation } from "@/components/Invitation";
import { wedding } from "@/lib/wedding";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== wedding.slug) notFound();
  return <Invitation />;
}
