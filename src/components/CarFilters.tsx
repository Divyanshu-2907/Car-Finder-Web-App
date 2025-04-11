
import { useState, useEffect, useCallback, useMemo } from 'react';
import { CarFilterParams } from '@/types/car';
import { AVAILABLE_BRANDS, AVAILABLE_FUEL_TYPES, PRICE_RANGE, SEATING_CAPACITY_RANGE } from '@/services/carService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { formatCurrency, useSkipFirstRender } from '@/lib/utils';
import { 
  Filter, 
  SortDesc, 
  SortAsc, 
  ListFilter, 
  X
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface CarFiltersProps {
  initialFilters: CarFilterParams;
  onFilterChange: (filters: CarFilterParams) => void;
  isLoading: boolean;
}

const CarFilters = ({ initialFilters, onFilterChange, isLoading }: CarFiltersProps) => {
  const [filters, setFilters] = useState<CarFilterParams>(initialFilters);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice || PRICE_RANGE.min,
    filters.maxPrice || PRICE_RANGE.max
  ]);
  const [seatsRange, setSeatsRange] = useState<[number, number]>([
    filters.minSeats || SEATING_CAPACITY_RANGE.min,
    filters.maxSeats || SEATING_CAPACITY_RANGE.max
  ]);
  
  // Optimize filter application with useSkipFirstRender to avoid initial trigger
  useSkipFirstRender(() => {
    const timer = setTimeout(() => {
      onFilterChange({
        ...filters,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        minSeats: seatsRange[0],
        maxSeats: seatsRange[1],
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, priceRange, seatsRange]);

  // Memoize handlers to prevent unnecessary re-creations
  const handleSortChange = useCallback((sortOption: string) => {
    const [sortBy, sortOrder] = sortOption.split('-');
    setFilters(prev => ({
      ...prev,
      sortBy: sortBy as 'price' | 'year',
      sortOrder: sortOrder as 'asc' | 'desc'
    }));
  }, []);

  const handleBrandChange = useCallback((brand: string) => {
    setFilters(prev => ({ 
      ...prev, 
      brand: brand === "all" ? undefined : brand 
    }));
  }, []);

  const handleFuelTypeChange = useCallback((fuelType: string) => {
    setFilters(prev => ({ 
      ...prev, 
      fuelType: fuelType === "all" ? undefined : fuelType 
    }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setPriceRange([PRICE_RANGE.min, PRICE_RANGE.max]);
    setSeatsRange([SEATING_CAPACITY_RANGE.min, SEATING_CAPACITY_RANGE.max]);
    setFilters({
      page: 1,
      sortBy: 'price',
      sortOrder: 'asc',
    });
  }, []);

  // Memoize this calculation to prevent recalculation on every render
  const isFiltered = useMemo(() => (
    !!filters.brand || 
    !!filters.fuelType || 
    priceRange[0] > PRICE_RANGE.min || 
    priceRange[1] < PRICE_RANGE.max ||
    seatsRange[0] > SEATING_CAPACITY_RANGE.min || 
    seatsRange[1] < SEATING_CAPACITY_RANGE.max
  ), [filters.brand, filters.fuelType, priceRange, seatsRange]);

  // Filter panel content (shared between desktop and mobile)
  const filterPanelContent = (
    <div className="space-y-6 p-1">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-base">Brand</Label>
          {filters.brand && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs px-2" 
              onClick={() => handleBrandChange('all')}
            >
              Clear <X className="ml-1 h-3 w-3" />
            </Button>
          )}
        </div>
        <Select value={filters.brand || 'all'} onValueChange={handleBrandChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {AVAILABLE_BRANDS.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-base">Fuel Type</Label>
          {filters.fuelType && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs px-2" 
              onClick={() => handleFuelTypeChange('all')}
            >
              Clear <X className="ml-1 h-3 w-3" />
            </Button>
          )}
        </div>
        <Select value={filters.fuelType || 'all'} onValueChange={handleFuelTypeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Fuel Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fuel Types</SelectItem>
            {AVAILABLE_FUEL_TYPES.map((fuelType) => (
              <SelectItem key={fuelType} value={fuelType}>
                {fuelType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-base">Price Range</Label>
          <div className="pt-6 px-2">
            <Slider
              min={PRICE_RANGE.min}
              max={PRICE_RANGE.max}
              step={1000}
              value={priceRange}
              onValueChange={setPriceRange as any}
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-sm">
            <span>{formatCurrency(priceRange[0])}</span>
            <span>{formatCurrency(priceRange[1])}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-base">Seating Capacity</Label>
          <div className="pt-6 px-2">
            <Slider
              min={SEATING_CAPACITY_RANGE.min}
              max={SEATING_CAPACITY_RANGE.max}
              step={1}
              value={seatsRange}
              onValueChange={setSeatsRange as any}
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-sm">
            <span>{seatsRange[0]} seats</span>
            <span>{seatsRange[1]} seats</span>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={handleClearFilters}
        disabled={!isFiltered || isLoading}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 items-center">
          {/* Mobile filters */}
          <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden flex gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {isFiltered && <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">!</span>}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
              <SheetHeader className="mb-5">
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              {filterPanelContent}
            </SheetContent>
          </Sheet>

          {/* Sort dropdown */}
          <Select
            value={`${filters.sortBy || 'price'}-${filters.sortOrder || 'asc'}`}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <ListFilter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">
                <div className="flex items-center">
                  <SortAsc className="mr-2 h-4 w-4" />
                  Price: Low to High
                </div>
              </SelectItem>
              <SelectItem value="price-desc">
                <div className="flex items-center">
                  <SortDesc className="mr-2 h-4 w-4" />
                  Price: High to Low
                </div>
              </SelectItem>
              <SelectItem value="year-desc">
                <div className="flex items-center">
                  <SortDesc className="mr-2 h-4 w-4" />
                  Year: Newest First
                </div>
              </SelectItem>
              <SelectItem value="year-asc">
                <div className="flex items-center">
                  <SortAsc className="mr-2 h-4 w-4" />
                  Year: Oldest First
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Badges to show active filters */}
        {isFiltered && (
          <div className="flex flex-wrap gap-2">
            {filters.brand && (
              <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center">
                <span>Brand: {filters.brand}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 ml-1 hover:bg-transparent" 
                  onClick={() => handleBrandChange('all')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            {filters.fuelType && (
              <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center">
                <span>Fuel: {filters.fuelType}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 ml-1 hover:bg-transparent" 
                  onClick={() => handleFuelTypeChange('all')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            {(priceRange[0] > PRICE_RANGE.min || priceRange[1] < PRICE_RANGE.max) && (
              <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                Price: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
              </div>
            )}
            {(seatsRange[0] > SEATING_CAPACITY_RANGE.min || seatsRange[1] < SEATING_CAPACITY_RANGE.max) && (
              <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                Seats: {seatsRange[0]} - {seatsRange[1]}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop filters (hidden on mobile) */}
      <div className="hidden lg:block bg-card rounded-lg border shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        {filterPanelContent}
      </div>
    </div>
  );
};

export default CarFilters;
