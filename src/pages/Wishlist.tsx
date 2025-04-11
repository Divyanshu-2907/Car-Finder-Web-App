
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
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <Button variant="outline" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Link>
        </Button>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((car) => (
            <CarCard 
              key={car.id} 
              car={car} 
              onViewDetails={handleViewDetails} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-muted/50 rounded-lg">
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Start adding cars to your wishlist to keep track of your favorites.
          </p>
          <Button asChild>
            <Link to="/">Browse Cars</Link>
          </Button>
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
