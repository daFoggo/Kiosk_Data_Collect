import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = () => {
  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <NavBar />
        <main className="flex-1 p-6 w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster position="top-center" />
    </>
  );
};

export default RootLayout;
