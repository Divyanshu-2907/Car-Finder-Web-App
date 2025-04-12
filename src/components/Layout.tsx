import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-[#1f2937] text-white">
        <div className="container mx-auto px-4 py-1">
          {/* <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold">🚗 Car Quest Explorer</span>
              <p className="text-sm text-gray-400">Find your dream car with ease</p>
            </Link>
            <Button variant="outline" asChild className="text-white hover:text-white">
              <Link to="/wishlist" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Wishlist
              </Link>
            </Button>
          </div> */}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 