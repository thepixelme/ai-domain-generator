import Image from "next/image";
import { Button } from "@heroui/button";

import { SiteHeader } from "@/components/header";

export default function Home() {
  return (
    <div>
      <SiteHeader />
      <Button color="primary">Button</Button>
    </div>
  );
}
