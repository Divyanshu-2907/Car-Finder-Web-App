
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { WishlistProvider } from "./contexts/WishlistContext";
import Index from "./pages/Index";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useWishlist } from "./contexts/WishlistContext";
import { Heart } from "lucide-react";
import { formatCurrency } from "./lib/utils";

const queryClient = new QueryClient();

// Wrapper component with access to wishlist context
const AppRoutes = () => {
  const { wishlist } = useWishlist();
  
  return (
    <Routes>
      <Route path="/" element={
        <div className="fixed top-4 right-4 z-50">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link to="/wishlist" className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-car-blue rounded-full shadow-md hover:shadow-lg transition-shadow">
                <Heart className={`h-5 w-5 ${wishlist.length > 0 ? 'fill-car-red text-car-red' : ''}`} />
                <span className="font-medium">Wishlist ({wishlist.length})</span>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-0">
              <div className="p-4 border-b">
                <h4 className="font-semibold">Your Wishlist</h4>
                <p className="text-sm text-muted-foreground">
                  {wishlist.length} {wishlist.length === 1 ? 'car' : 'cars'}
                </p>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {wishlist.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    Your wishlist is empty
                  </div>
                ) : (
                  wishlist.slice(0, 3).map((car) => (
                    <div key={car.id} className="p-3 border-b flex items-center gap-3 hover:bg-muted/50">
                      <div className="w-12 h-12 bg-muted rounded-md overflow-hidden flex-shrink-0">
                        <img src={car.imageUrl} alt={car.model} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{car.brand} {car.model}</p>
                        <p className="text-sm text-muted-foreground">{car.year} • {formatCurrency(car.price)}</p>
                      </div>
                    </div>
                  ))
                )}
                {wishlist.length > 3 && (
                  <div className="p-2 text-center text-sm text-muted-foreground">
                    +{wishlist.length - 3} more cars
                  </div>
                )}
              </div>
              <div className="p-2 bg-muted/50">
                <Link to="/wishlist" className="block w-full text-center p-2 hover:underline text-car-blue">
                  View all items
                </Link>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      }>
        <Index />
      </Route>
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WishlistProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </WishlistProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
