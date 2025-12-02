import { Desktop } from "@/components/os/Desktop";
import { OSProvider } from "@/contexts/OSContext";

export default function Home() {
  return (
    <OSProvider>
      <Desktop />
    </OSProvider>
  );
}
