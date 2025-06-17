import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
// import Footer from './components/Footer';

import Home from "./pages/Home";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import ChatWidget from "./components/ChatWidget";

const App = () => {
  return (
    <Router>
      <main className="relative min-h-screen flex flex-col">
        <Nav />


        <div className="flex-grow pt-20">
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatWidget />
        </div>

        {/* Footer */}
        {/* <Footer /> */}
      </main>
    </Router>
  );
};

export default App;
