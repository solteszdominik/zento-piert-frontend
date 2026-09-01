import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="flex min-h-[60vh] items-center justify-center px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            404
          </p>

          <h1 className="mt-4 text-3xl font-bold text-blue-950 sm:text-4xl">
            Az oldal nem található
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600">
            A keresett oldal nem létezik, vagy időközben megváltozott az
            elérhetősége.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/">Vissza a főoldalra</Button>
            <Button href="/products">Termékek megtekintése</Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
