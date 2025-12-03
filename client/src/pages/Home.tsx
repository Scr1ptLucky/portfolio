import { Desktop } from "../components/os/DesktopWindows";
import { OSProvider } from "../contexts/OSContext";

export default function Home() {
  return (
    <OSProvider>
      <Desktop />
    </OSProvider>
  );
}
