import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center">
          <h1 className="text-6xl font-semibold mb-4">404</h1>
          <p className="text-lg text-[#666666] mb-8">页面未找到</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#0d0d0d] text-white px-8 py-3 rounded-full text-[15px] font-medium hover:opacity-92 transition-opacity"
          >
            返回首页
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
