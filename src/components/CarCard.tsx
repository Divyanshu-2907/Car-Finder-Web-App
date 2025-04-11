
import { Car } from '@/types/car';
import { useWishlist } from '@/contexts/WishlistContext';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Heart, Info, Car as CarIcon } from 'lucide-react';
import { useState } from 'react';

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
}

const CarCard = ({ car, onViewDetails }: CarCardProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(car.id)) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  const handleViewDetails = () => {
    onViewDetails(car);
  };

  const handleImageError = () => {
    console.log(`Failed to load image for ${car.brand} ${car.model}`);
    setImageError(true);
    setIsImageLoading(false);
  };

  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative overflow-hidden bg-gray-200 aspect-[16/10]">
        {isImageLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-car-blue rounded-full animate-spin"></div>
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
            <CarIcon className="h-16 w-16 text-gray-400" />
            <p className="text-sm text-gray-500 mt-2">{car.brand} {car.model}</p>
          </div>
        ) : (
          <img
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsImageLoading(false)}
            onError={handleImageError}
          />
        )}
        <Button
          variant="outline"
          size="icon"
          className={`absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white ${
            isInWishlist(car.id) ? 'text-car-red' : 'text-gray-500'
          }`}
          onClick={handleWishlistToggle}
        >
          <Heart
            className={`h-5 w-5 ${isInWishlist(car.id) ? 'fill-car-red' : ''}`}
          />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold">{car.brand} {car.model}</h3>
        <p className="text-lg font-semibold text-car-blue">{formatCurrency(car.price)}</p>
        <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
          <div className="flex items-center">
            <span className="font-medium">Year:</span>
            <span className="ml-2">{car.year}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Fuel:</span>
            <span className="ml-2">{car.fuelType}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Seats:</span>
            <span className="ml-2">{car.seatingCapacity}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Trans:</span>
            <span className="ml-2">{car.transmission}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleViewDetails}>
          <Info className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
