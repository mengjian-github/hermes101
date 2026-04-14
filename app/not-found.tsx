import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-[#1b1c1a]">404</h1>
          <p className="text-lg text-[#3d4947] mb-8">页面未找到</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#00685f] text-white px-8 py-3 rounded-full text-[15px] font-bold hover:shadow-lg transition-all active:scale-95"
          >
            返回首页
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
