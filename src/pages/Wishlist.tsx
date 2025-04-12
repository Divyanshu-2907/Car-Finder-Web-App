import { useState } from "react";
import { Car } from "@/types/car";
import { useWishlist } from "@/contexts/WishlistContext";
import CarCard from "@/components/CarCard";
import CarDetailsDialog from "@/components/CarDetailsDialog";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

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
            <CarCard 
              key={car.id} 
              car={car} 
              onViewDetails={handleViewDetails}
            />
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
