import Link from "next/link";
import { ExternalLink } from "lucide-react";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100064022979848";

export default function Footer() {
  return (
    <footer className="border-t border-blue-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-4 md:gap-10">
        {/* BAL OLDAL - CÉGNÉV ÉS FACEBOOK */}
        <div className="md:col-span-2">
          <Link href="/" className="text-xl font-bold text-blue-950">
            Zento-Piért Kft.
          </Link>

          <div className="mt-6 max-w-sm rounded-2xl border border-blue-100 bg-blue-50/50 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1877F2] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="26"
                  height="26"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
                </svg>
              </div>

              <div>
                <h3 className="font-bold text-blue-950">Zento-Piért Kft.</h3>
                <p className="text-xs text-slate-500">Facebook-oldalunk</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Kövess minket Facebookon, és értesülj híreinkről, újdonságainkról!
            </p>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#166FE5]"
            >
              Facebook-oldal megtekintése
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* NAVIGÁCIÓ */}
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

        {/* KAPCSOLAT */}
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

      {/* COPYRIGHT */}
      <div className="border-t border-blue-100 px-4 py-5 text-center text-xs text-slate-500 sm:px-6 sm:text-sm">
        © {new Date().getFullYear()} Zento-Piért Kft. Minden jog fenntartva.
      </div>
    </footer>
  );
}
