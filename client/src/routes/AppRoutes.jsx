import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../pages/layouts/UserLayout";
import Home from "../pages/user/Home";
import Login from "../pages/user/auth/Login";
import Register from "../pages/user/auth/Register";
import ProductPage from "../pages/user/ProductPage";
import NotFound from "../components/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import CartPage from "../pages/user/CartPage";
import CheckoutPage from "../pages/user/Checkout";
import AdminLayout from "../pages/layouts/AdminLayout";
import AdminProtectedRoute from "../pages/admin/components/AdminProtectedRoute";
import Dashboard from "../pages/admin/pages/Dashboard";
import AdminProducts from "../pages/admin/pages/AdminProducts";
import AdminUsers from "../pages/admin/pages/AdminUsers";
import AdminOrders from "../pages/admin/pages/AdminOrders";
import AddProduct from "../pages/admin/pages/AddProduct";



const router = createBrowserRouter([
    {
        element: <UserLayout />,
        children: [
            {path: "/", element: <Home />},
            {path:"/products", element: <ProductPage />},

            {
                path: "/cart",
                element: (
                    <ProtectedRoute>
                        <CartPage />
                    </ProtectedRoute>
                )
            },
            {
                path:"/checkout",
                element: (
                    <ProtectedRoute>
                        <CheckoutPage />
                    </ProtectedRoute>
                )
            },

            {path:"/signin", element: <Login />},
            {path:"/signup", element: <Register />},
            {path: "*", element: <NotFound />}
        ]
    },

    {
        element:  (
            <AdminProtectedRoute>
                <AdminLayout />
            </AdminProtectedRoute>
        ),
        children: [
            {path: "/admin", element: <Dashboard />},
            {path: "/admin/products", element: <AdminProducts />},
            {path: "/admin/products/add", element: <AddProduct /> },
            {path: "/admin/users", element: <AdminUsers />},
            {path: "/admin/orders", element: <AdminOrders />}
        ]
    }
])

export default router