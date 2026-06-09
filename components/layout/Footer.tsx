import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-blue-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="text-xl font-bold text-blue-950">
            Zentó-Piért Kft.
          </Link>

          <p className="mt-4 max-w-md leading-7 text-slate-600">
            Modern, átlátható webshop alap papírtermékekhez, későbbi kosárral,
            rendeléssel és admin felülettel.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-blue-950">Navigáció</h3>

          <div className="flex flex-col gap-3 text-sm text-slate-600">
            <Link href="/">Főoldal</Link>
            <Link href="/products">Termékek</Link>
            <Link href="/about">Rólunk</Link>
            <Link href="/contact">Kapcsolat</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-blue-950">Kapcsolat</h3>

          <div className="flex flex-col gap-3 text-sm text-slate-600">
            <span>info@zento-piért.hu</span>
            <span>Tel: +36/47-330-003</span>
            <span>Iroda: +36/20-403-2414</span>
            <span>3881 Abaújszántó, Béke út 18.</span>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-100 px-6 py-5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Zentó-Piért Kft. Minden jog fenntartva.
      </div>
    </footer>
  );
}
