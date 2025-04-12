import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./contexts/WishlistContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <WishlistProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </WishlistProvider>
  );
}

export default App;
