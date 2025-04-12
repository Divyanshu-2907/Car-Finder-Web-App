import { useState } from "react";
import { Car } from "@/types/car";
import { useWishlist } from "@/contexts/WishlistContext";
import CarCard from "@/components/CarCard";
import CarDetailsDialog from "@/components/CarDetailsDialog";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
    setIsDetailsOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {wishlist.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Your wishlist is empty</p>
          <Button variant="outline" asChild className="mt-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((car) => (
<<<<<<< HEAD
            <CarCard 
              key={car.id} 
              car={car} 
              onViewDetails={handleViewDetails}
            />
=======
            <div key={car.id} className="relative group">
              <CarCard 
                car={car} 
                onViewDetails={handleViewDetails} 
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleViewDetails(car)}
                    >
                      <Info className="h-4 w-4 text-car-blue" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Quick view</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
>>>>>>> 30cbc90a36c5bae970d7666e52168830c8271ba1
          ))}
        </div>
      )}

      <CarDetailsDialog
        car={selectedCar}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};

export default Wishlist;
