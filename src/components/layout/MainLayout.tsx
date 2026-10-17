import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "../ScrollToTop";
import { BackToTop } from "../BackToTop";

export function MainLayout() {
  return (
    <div className="site-layout flex min-h-screen w-full min-w-0 max-w-full flex-col overflow-x-clip">
      <ScrollToTop />
      <Header />
      <main className="w-full min-w-0 max-w-full flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
