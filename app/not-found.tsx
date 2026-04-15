import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#d4fae8] flex items-center justify-center text-[#18E299]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#0d0d0d] mb-3">404</h1>
          <p className="text-[#666] mb-8">这个页面走丢了，但你的学习进度不会丢。</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#18E299] text-[#005f3d] px-8 py-3 rounded-full text-[15px] font-bold hover:opacity-92 transition-opacity"
          >
            返回首页
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
