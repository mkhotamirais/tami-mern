import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div>
      App
      <Outlet />
      <Toaster richColors position="top-center" />
    </div>
  );
}
