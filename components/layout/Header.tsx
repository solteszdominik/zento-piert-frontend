import Link from "next/link";
import HeaderCartButton from "../cart/HeaderCartButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-blue-950">
          Zentó-Piért Kft.
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          <Link href="/">Főoldal</Link>
          <Link href="/products">Termékek</Link>
          <Link href="/about">Rólunk</Link>
          <Link href="/contact">Kapcsolat</Link>
          <Link href="/tenders">Pályázatok</Link>
        </nav>

        <HeaderCartButton />
      </div>
    </header>
  );
}
