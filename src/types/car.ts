
export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  transmission: string;
  seatingCapacity: number;
  mileage: number;
  engineCapacity: number;
  imageUrl: string;
  description: string;
  features: string[];
}

export type CarFilterParams = {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  fuelType?: string;
  minSeats?: number;
  maxSeats?: number;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'year';
  sortOrder?: 'asc' | 'desc';
};
