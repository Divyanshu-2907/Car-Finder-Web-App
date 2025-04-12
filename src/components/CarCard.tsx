import { Car } from '@/types/car';
import { useWishlist } from '@/contexts/WishlistContext';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Heart, Info, Car as CarIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
}

const CarCard = ({ car, onViewDetails }: CarCardProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Preload image with priority
  useEffect(() => {
    const img = new Image();
    img.src = car.imageUrl;
    img.onload = () => {
      if (imgRef.current) {
        imgRef.current.src = car.imageUrl;
        setIsImageLoading(false);
      }
    };
    img.onerror = () => {
      setImageError(true);
      setIsImageLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [car.imageUrl]);

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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-car-blue"></div>
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
            <CarIcon className="h-16 w-16 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Image not available</p>
          </div>
        ) : (
          <img
            ref={imgRef}
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isImageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
            decoding="async"
          />
        )}

        <Button
          variant="outline"
          size="icon"
          className={`absolute top-2 right-2 rounded-full bg-white/90 backdrop-blur-sm ${
            isInWishlist(car.id) ? 'text-car-red' : 'text-gray-500'
          }`}
          onClick={handleWishlistToggle}
        >
          <Heart
            className={`h-5 w-5 ${isInWishlist(car.id) ? 'fill-car-red' : ''}`}
          />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 left-2 rounded-full bg-white/90 backdrop-blur-sm text-car-blue"
          onClick={handleViewDetails}
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{car.brand} {car.model}</h3>
            <p className="text-sm text-muted-foreground">{car.year}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-car-blue">{formatCurrency(car.price)}</p>
            <p className="text-xs text-muted-foreground">per day</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{car.seatingCapacity} seats</span>
          <span>•</span>
          <span>{car.fuelType}</span>
          <span>•</span>
          <span>{car.transmission}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
