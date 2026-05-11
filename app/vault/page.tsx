import { SiteHeader } from "@/components/navigation/SiteHeader";
import { UploadVaultPreview } from "@/components/landing/UploadVaultPreview";

export default function VaultPage() {
  return (
    <main className="min-h-screen pt-20">
      <SiteHeader />
      <UploadVaultPreview />
    </main>
  );
}
