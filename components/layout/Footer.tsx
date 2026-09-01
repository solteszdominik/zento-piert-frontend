import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-blue-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-4 md:gap-10">
        <div className="md:col-span-2">
          <Link href="/" className="text-xl font-bold text-blue-950">
            Zentó-Piért Kft.
          </Link>

          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600 sm:text-base">
            Papírtermékek gyártása és forgalmazása több mint három évtizedes
            szakmai tapasztalattal, lakossági, viszonteladói és céges
            partnereink számára.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-blue-950">Navigáció</h3>

          <div className="flex flex-col gap-3 text-sm text-slate-600">
            <Link href="/" className="transition hover:text-blue-700">
              Főoldal
            </Link>

            <Link href="/products" className="transition hover:text-blue-700">
              Termékek
            </Link>

            <Link href="/about" className="transition hover:text-blue-700">
              Rólunk
            </Link>

            <Link href="/contact" className="transition hover:text-blue-700">
              Kapcsolat
            </Link>

            <Link href="/tenders" className="transition hover:text-blue-700">
              Pályázatok
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-blue-950">Kapcsolat</h3>

          <div className="flex flex-col gap-3 text-sm leading-6 text-slate-600">
            <span>info@zento-piert.hu</span>
            <span>Tel: +36/47-330-003</span>
            <span>Iroda: +36/20-403-2414</span>
            <span>3881 Abaújszántó, Béke út 18.</span>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-100 px-4 py-5 text-center text-xs text-slate-500 sm:px-6 sm:text-sm">
        © {new Date().getFullYear()} Zentó-Piért Kft. Minden jog fenntartva.
      </div>
    </footer>
  );
}
