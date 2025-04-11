
import { Car } from '@/types/car';
import { useWishlist } from '@/contexts/WishlistContext';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Heart, X } from 'lucide-react';
import { useState } from 'react';

interface CarDetailsDialogProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

const CarDetailsDialog = ({ car, isOpen, onClose }: CarDetailsDialogProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (!car) return null;

  const handleWishlistToggle = () => {
    if (isInWishlist(car.id)) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">
              {car.brand} {car.model} ({car.year})
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>
        <div className="relative overflow-hidden bg-gray-200 rounded-lg aspect-[16/9]">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-car-blue rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Specifications</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b">
                <span className="font-medium">Price:</span>
                <span className="text-car-blue font-semibold">{formatCurrency(car.price)}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="font-medium">Year:</span>
                <span>{car.year}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="font-medium">Fuel Type:</span>
                <span>{car.fuelType}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="font-medium">Transmission:</span>
                <span>{car.transmission}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="font-medium">Seating Capacity:</span>
                <span>{car.seatingCapacity}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="font-medium">Mileage:</span>
                <span>{car.mileage} {car.fuelType === 'Electric' ? 'MPGe' : 'MPG'}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="font-medium">Engine Capacity:</span>
                <span>{car.engineCapacity > 0 ? `${car.engineCapacity}L` : 'Electric'}</span>
              </div>
            </div>
          </div>
          
          <div>
            <DialogDescription className="mb-4">
              {car.description}
            </DialogDescription>
            <h3 className="font-semibold text-lg mb-2">Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              {car.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-car-blue mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <DialogFooter className="mt-4">
          <Button
            variant={isInWishlist(car.id) ? "destructive" : "default"}
            onClick={handleWishlistToggle}
            className="w-full sm:w-auto"
          >
            <Heart className={`mr-2 h-4 w-4 ${isInWishlist(car.id) ? '' : 'fill-white'}`} />
            {isInWishlist(car.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CarDetailsDialog;
