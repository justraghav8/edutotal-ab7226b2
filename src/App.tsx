import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Industries from "./pages/Industries";
import IndustryDetail from "./pages/IndustryDetail";
import Insights from "./pages/Insights";
import InsightDetail from "./pages/InsightDetail";
import WhoWeAre from "./pages/WhoWeAre";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import ClientsPage from "./pages/ClientsPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ServicesAdmin from "./pages/admin/Services";
import Settings from "./pages/admin/Settings";
import HeroBanners from "./pages/admin/HeroBanners";
import IndustriesAdmin from "./pages/admin/IndustriesAdmin";
import InsightsAdmin from "./pages/admin/Insights";
import Team from "./pages/admin/Team";
import Clients from "./pages/admin/Clients";
import Testimonials from "./pages/admin/Testimonials";
import CareersAdmin from "./pages/admin/CareersAdmin";
import Contacts from "./pages/admin/Contacts";
import Gallery from "./pages/Gallery";
import Images from "./pages/admin/Images";
import GalleryAdmin from "./pages/admin/Gallery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Index />} />
              <Route path="about" element={<About />} />
              <Route path="who-we-are" element={<WhoWeAre />} />
              <Route path="services" element={<Services />} />
              <Route path="services/:slug" element={<ServiceDetail />} />
              <Route path="industries" element={<Industries />} />
              <Route path="industries/:slug" element={<IndustryDetail />} />
              <Route path="insights" element={<Insights />} />
              <Route path="insights/:slug" element={<InsightDetail />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="careers" element={<Careers />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            <Route path="/admin/login" element={<Login />} />
            
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="images" element={<Images />} />
              <Route path="hero-banners" element={<HeroBanners />} />
              <Route path="services" element={<ServicesAdmin />} />
              <Route path="industries" element={<IndustriesAdmin />} />
              <Route path="insights" element={<InsightsAdmin />} />
              <Route path="team" element={<Team />} />
              <Route path="clients" element={<Clients />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="careers" element={<CareersAdmin />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="gallery" element={<Gallery />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
