import Link from "next/link";
import AuthButton from "./AuthButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/ai", label: "AI Librarian" },
  { href: "/library", label: "My Library" },
  { href: "/categories", label: "Categories" },
  { href: "/read-books", label: " Read Books(free🔥)" },
{ href: "/trending", label: "Trending" },
{ href: "/pricing", label: "Pricing" },
{ href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="size-8 rounded-lg bg-gradient-to-br from-secondary to-accent grid place-items-center shadow-glow-indigo">
            <span className="font-display italic text-primary text-lg">
              B
            </span>
          </div>

          <span className="font-display italic text-2xl tracking-tight text-gradient-gold">
            BookWise
          </span>
        </Link>


        {/* Navigation */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-foreground/60">

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}

        </div>


        {/* Buttons */}
        <div className="flex items-center gap-2">

 <AuthButton />
        </div>

      </div>
    </nav>
  );
}