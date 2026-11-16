import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ExternalLink, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Kapcsolat",
  description:
    "Lépjen kapcsolatba a Zento-Piért Kft.-vel. Elérhetőségek, cím, telefonszám és kapcsolatfelvételi lehetőség.",
  alternates: {
    canonical: "https://zento-piert.hu/contact",
  },
};

const contactItems = [
  {
    label: "Cím",
    value: "3881 Abaújszántó, Béke út 18.",
  },
  {
    label: "Telefon",
    value: "+36 20 403 2414",
  },
  {
    label: "E-mail",
    value: "info@zento-piert.hu",
  },
];

export default function Page() {
  return (
    <>
      <Header />

      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <section className="mb-8 max-w-3xl sm:mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Kapcsolat
          </p>

          <h1 className="text-3xl font-bold text-blue-950 sm:text-4xl md:text-5xl">
            Lépjen kapcsolatba velünk
          </h1>

          <p className="mt-5 leading-7 text-slate-600">
            Kérdés, ajánlatkérés vagy együttműködés esetén írjon nekünk
            üzenetet, vagy keressen minket közvetlenül az alábbi
            elérhetőségeken.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-blue-950">
              Kapcsolatfelvétel
            </h2>

            <p className="leading-7 text-slate-600">
              Kérdés, ajánlatkérés vagy együttműködés esetén írjon nekünk
              közvetlenül e-mailben, vagy keressen minket telefonon.
            </p>

            <a
              href="mailto:info@zento-piert.hu"
              className="mt-6 inline-flex rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              E-mail küldése
            </a>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <div className="mb-3 flex items-center gap-2">
                <Star size={22} className="fill-yellow-400 text-yellow-400" />

                <h3 className="text-lg font-bold text-blue-950">
                  Találj meg minket a Google-on!
                </h3>
              </div>

              <p className="text-sm leading-6 text-slate-600">
                Nézd meg Google-profilunkat, és ha már vásároltál nálunk,
                örömmel fogadjuk az értékelésedet is!
              </p>

              <a
                href="https://www.google.com/search?q=Zento-Pi%C3%A9rt+Kft+Aba%C3%BAjsz%C3%A1nt%C3%B3"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                Google-profil megtekintése
                <ExternalLink size={16} />
              </a>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1877F2] text-white shadow-sm">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-7 w-7"
                      aria-hidden="true"
                    >
                      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-950">
                      Kövess minket Facebookon!
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Látogass el Facebook-oldalunkra, ahol további
                      információkat találhatsz vállalkozásunkról és
                      termékeinkről.
                    </p>

                    <a
                      href="https://www.facebook.com/profile.php?id=100064022979848"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1465D1]"
                    >
                      Facebook-oldal megtekintése
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6 md:p-8">
              <h2 className="mb-6 text-2xl font-bold text-blue-950">
                Elérhetőségek
              </h2>

              <div className="space-y-4">
                {contactItems.map((item) => (
                  <div key={item.label}>
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                      {item.label}
                    </p>
                    <p className="mt-1 text-slate-700">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <iframe
                title="Zento-Piért Kft. térkép"
                src="https://www.google.com/maps?q=3881%20Aba%C3%BAjsz%C3%A1nt%C3%B3%2C%20B%C3%A9ke%20%C3%BAt%2018&output=embed"
                className="h-72 w-full border-0 sm:h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
