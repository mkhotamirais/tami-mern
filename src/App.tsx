import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "./components/Wrapper";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />

      <ScrollRestoration />
      <Toaster richColors position="top-center" />
    </div>
  );
}
