import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16">
  <h1 className="text-5xl font-bold text-center mb-12">
    Pricing
  </h1>

  <div className="grid md:grid-cols-3 gap-8">

    <div className="border rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-4">Free</h2>
      <p className="text-4xl font-bold mb-6">$0</p>

      <ul className="space-y-2">
        <li>✓ Search Books</li>
        <li>✓ AI Summaries</li>
        <li>✓ Basic Recommendations</li>
      </ul>
    </div>


    <div className="border rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-4">Pro</h2>
      <p className="text-4xl font-bold mb-6">$9/mo</p>

      <ul className="space-y-2">
        <li>✓ Unlimited AI Chat</li>
        <li>✓ Personalized Recommendations</li>
        <li>✓ Reading Lists</li>
      </ul>
    </div>


    <div className="border rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-4">Premium</h2>
      <p className="text-4xl font-bold mb-6">$19/mo</p>

      <ul className="space-y-2">
        <li>✓ Everything in Pro</li>
        <li>✓ Advanced AI Librarian</li>
        <li>✓ Early Access Features</li>
      </ul>
    </div>

  </div>


  {/* Demo Notice Banner */}
  <div className="mt-12 rounded-2xl border border-yellow-500 bg-yellow-500/10 p-6 text-center shadow-lg">

    <h3 className="text-xl font-bold mb-3">
      ⚠️ Demo Notice
    </h3>

    <p className="text-sm leading-7 max-w-4xl mx-auto">
      Hold up, superstar 😄 Don’t reach for your card just yet! 
      This pricing page is only a demo, so no payments will be taken 
      and no secrets will be stolen from your wallet. These plans and 
      prices are completely fictional — but hopefully the experience 
      feels pretty real. 😉

      <br /><br />

      The only thing I'm accepting here is your curiosity… and maybe a little love for books. ❤️ 

      <br /><br />

      So relax, keep your wallet safe, and enjoy the demo — 
      because the only thing I’m charging is a little bit of your attention. 😌✨
    </p>

  </div>

</main>
      <Footer />
    </div>
  );
}