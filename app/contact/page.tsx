import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-6">
          Contact Me
        </h1>

        <p className="text-foreground/60 mb-8">
          I'd love to hear from you.
        </p>

        <form
          action="https://formsubmit.co/devansh.work.tech@gmail.com"
          method="POST"
          className="space-y-4"
        >

          <input
            type="hidden"
            name="_subject"
            defaultValue="New Contact Message 🚀"
          />

          <input
            type="hidden"
            name="_captcha"
            defaultValue="false"
          />

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border rounded-xl p-4"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full border rounded-xl p-4"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={6}
            className="w-full border rounded-xl p-4"
            required
          />

          <button
            type="submit"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-xl"
          >
            Send Message
          </button>

        </form>

        <p
        
         className="text-sm text-yellow-500 mt-6">
         FormSubmit can deliver messages, but it can’t deliver the smile you’ll get when you hear my voice. Skip the hassle, just call me ❤️,look for my number in bottom-right corner😉
        </p>

      </main>

      <Footer />
    </div>
  );
}