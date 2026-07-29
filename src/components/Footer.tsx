"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <span className="font-display italic text-2xl text-gradient-gold">
            BookWise
          </span>

          <p className="text-sm text-foreground/50 mt-3 max-w-xs leading-relaxed">
            An AI-powered sanctuary for readers. Discover stories that
            resonate with your soul.
          </p>
        </div>

        {/* Community Section */}
        <div>
          <h2 className="font-display text-2xl mb-4">
            Join the BookWise Community
          </h2>

          <p className="text-foreground/60 mb-6">
            Save books, get personalized AI recommendations, and build
            your own reading collection.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/login"
              className="px-6 py-3 border border-border rounded-xl hover:border-primary transition"
            >
              Log In
            </Link>

            <Link
              href="/signup"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Founder */}
        <div className="md:text-right">
          <h5 className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-4">
            Founder &amp; Lead Curator
          </h5>

          <p className="font-display text-2xl">
            Devansh
          </p>

          <a
            href="tel:7983310378"
            className="block text-primary hover:underline mt-1 font-mono text-sm"
          >
            +91 79833 10378
          </a>

          <p className="text-xs text-foreground/40 mt-6">
            © {new Date().getFullYear()} BookWise. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
