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
import { Heart } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <div className="fixed top-4 right-4 z-50">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link to="/wishlist" className="inline-flex items-center justify-center gap-2 px-2 py-2 bg-white text-car-blue rounded-full shadow-md hover:shadow-lg transition-shadow">
                  <Heart className="h-5 w-5" />
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-0">
                <div className="p-4 border-b">
                  <h4 className="font-semibold">Your Wishlist</h4>
                  <p className="text-sm text-muted-foreground">
                    View your saved cars
                  </p>
                </div>
                <div className="p-2 bg-muted/50">
                  <Link to="/wishlist" className="block w-full text-center p-2 hover:underline text-car-blue">
                    View all items
                  </Link>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </BrowserRouter>
      </WishlistProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
