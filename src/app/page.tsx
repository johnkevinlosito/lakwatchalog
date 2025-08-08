import { Button } from "@/components/ui/button";
import { MapIcon } from "lucide-react";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button variant={"secondary"}>
        View Map
        <MapIcon />
      </Button>
    </div>
  );
}
