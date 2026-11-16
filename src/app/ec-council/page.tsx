import TrainingProviderPage, { providerMetadata } from "@/components/rainfall/TrainingProviderPage";

export const metadata = providerMetadata("EC-Council");
export default function ECCouncilPage() { return <TrainingProviderPage provider="EC-Council" />; }
