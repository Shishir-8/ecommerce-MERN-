import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";


export default function UserLayout() {
    const location = useLocation();
    const hideRoutes = ["/signin", "/signup", "/cart"]
    const hideFooter = hideRoutes.includes(location.pathname) || location.state?.notFound
  return (
    <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-3">
            <Outlet />
        </main>

       {!hideFooter &&  <Footer />}
    </div>
  )
}
