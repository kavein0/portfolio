import TrainingProviderPage, { providerMetadata } from "@/components/rainfall/TrainingProviderPage";

export const metadata = providerMetadata("IBM");
export default function IBMPage() { return <TrainingProviderPage provider="IBM" />; }
