import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[60vh] max-w-7xl px-6 py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
          Fejlesztés alatt
        </p>
        <h1 className="text-4xl font-bold text-blue-950">admin - products</h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Ez az oldal elő van készítve a későbbi webshop funkciókhoz.
        </p>
      </main>
      <Footer />
    </>
  );
}
