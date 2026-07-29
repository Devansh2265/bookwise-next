import { Suspense } from "react";
import DiscoverContent from "./DiscoverContent";

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Loading books...</p>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DiscoverContent />
    </Suspense>
  );
}