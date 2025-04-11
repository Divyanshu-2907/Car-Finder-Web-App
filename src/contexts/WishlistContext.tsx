
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Car } from '../types/car';
import { toast } from '@/components/ui/use-toast';

interface WishlistContextProps {
  wishlist: Car[];
  addToWishlist: (car: Car) => void;
  removeFromWishlist: (carId: number) => void;
  isInWishlist: (carId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Car[]>([]);

  // Load wishlist from localStorage on initial mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('carWishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
        localStorage.removeItem('carWishlist');
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('carWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (car: Car) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === car.id)) {
        return prev;
      }
      toast({
        title: "Added to Wishlist",
        description: `${car.brand} ${car.model} has been added to your wishlist.`,
      });
      return [...prev, car];
    });
  };

  const removeFromWishlist = (carId: number) => {
    setWishlist((prev) => {
      const car = prev.find((item) => item.id === carId);
      const newWishlist = prev.filter((car) => car.id !== carId);
      
      if (car) {
        toast({
          title: "Removed from Wishlist",
          description: `${car.brand} ${car.model} has been removed from your wishlist.`,
        });
      }
      
      return newWishlist;
    });
  };

  const isInWishlist = (carId: number) => {
    return wishlist.some((car) => car.id === carId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
