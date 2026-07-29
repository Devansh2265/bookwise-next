import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AILibrarian from "../../components/AILibrarian";

export default function AIPage() {
  return (
    <div className="min-h-screen">

      <Navbar />

      <main className="px-6 py-24 max-w-5xl mx-auto">

        <h1 className="font-display text-5xl mb-6">
          AI Librarian
        </h1>

        <p className="text-foreground/60 text-lg mb-10">
          Ask BookWise AI to recommend books based on your interests.
        </p>

        <AILibrarian />

      </main>

      <Footer />

    </div>
  );
}