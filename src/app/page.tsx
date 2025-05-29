import { SiteHeader } from "@/components/header";
import { DomainGenerator } from "@/components/domain-generator";

export default function Home() {
  return (
    <div>
      <SiteHeader />
      <DomainGenerator />
    </div>
  );
}
