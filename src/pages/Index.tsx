import { useState, useEffect } from "react";
import { Car, CarFilterParams } from "@/types/car";
import { fetchCars, PRICE_RANGE, SEATING_CAPACITY_RANGE } from "@/services/carService";
import { useWishlist } from "@/contexts/WishlistContext";
import { Button } from "@/components/ui/button";
import CarCard from "@/components/CarCard";
import CarFilters from "@/components/CarFilters";
import CarDetailsDialog from "@/components/CarDetailsDialog";
import Pagination from "@/components/Pagination";
import { Car as CarIcon, Heart, Grid2X2, List, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // State for cars data
  const [cars, setCars] = useState<Car[]>([]);
  const [totalCars, setTotalCars] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for filters and pagination
  const [filters, setFilters] = useState<CarFilterParams>({
    page: 1,
    limit: 10,
    sortBy: 'price',
    sortOrder: 'asc',
    minPrice: PRICE_RANGE.min,
    maxPrice: PRICE_RANGE.max,
    minSeats: SEATING_CAPACITY_RANGE.min,
    maxSeats: SEATING_CAPACITY_RANGE.max,
  });
  
  // State for car details and view mode
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { wishlist } = useWishlist();

  // Fetch cars whenever filters change
  useEffect(() => {
    const loadCars = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchCars(filters);
        setCars(result.cars);
        setTotalCars(result.total);
      } catch (err) {
        setError("Failed to load cars. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCars();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters: CarFilterParams) => {
    // Reset to page 1 when filters change, but keep other filters
    setFilters({ ...newFilters, page: 1 });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle car selection for details view
  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
    setIsDetailsOpen(true);
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalCars / (filters.limit || 10));

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <header className="bg-car-dark text-white py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <CarIcon className="h-8 w-8" />
                <h1 className="text-3xl font-bold">Car Quest Explorer</h1>
              </div>
              <p className="text-gray-300 mt-2">Find your dream car with ease</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" asChild className="border-white text-white hover:text-car-dark">
                <Link to="/wishlist" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Wishlist
                  {wishlist.length > 0 && (
                    <span className="bg-car-red text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Filters - for desktop, this is shown as a sidebar. Mobile filters use a dialog */}
          <div className="hidden lg:block">
            <CarFilters
              initialFilters={filters}
              onFilterChange={handleFilterChange}
              isLoading={isLoading}
            />
          </div>

          {/* Car listings */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Show filters for mobile */}
              <div className="lg:hidden w-full">
                <CarFilters
                  initialFilters={filters}
                  onFilterChange={handleFilterChange}
                  isLoading={isLoading}
                />
              </div>

              <div className="flex items-center justify-between w-full">
                {/* Results count */}
                <div>
                  {!isLoading && (
                    <p className="text-muted-foreground">
                      Showing <span className="font-medium text-foreground">{cars.length}</span> of{" "}
                      <span className="font-medium text-foreground">{totalCars}</span> cars
                    </p>
                  )}
                </div>

                {/* View mode toggle */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Loading state */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="h-12 w-12 animate-spin mb-4 text-car-blue" />
                <p className="text-lg font-medium">Loading cars...</p>
              </div>
            )}

            {/* Error state */}
            {error && !isLoading && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-md text-center">
                <p>{error}</p>
                <Button variant="outline" onClick={() => setFilters({ ...filters })} className="mt-2">
                  Try Again
                </Button>
              </div>
            )}

            {/* Empty state */}
            {!isLoading && !error && cars.length === 0 && (
              <div className="text-center py-16 bg-muted/50 rounded-lg">
                <CarIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-semibold mb-2">No cars found</h2>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button onClick={() => handleFilterChange({
                  page: 1,
                  sortBy: 'price',
                  sortOrder: 'asc',
                })}>
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Car grid/list */}
            {!isLoading && !error && cars.length > 0 && (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6" 
                  : "flex flex-col gap-4"
              }>
                {cars.map((car) => (
                  <div key={car.id} className={viewMode === 'list' ? "border rounded-lg overflow-hidden" : ""}>
                    {viewMode === 'grid' ? (
                      <CarCard car={car} onViewDetails={handleViewDetails} />
                    ) : (
                      <div className="flex flex-col md:flex-row h-full">
                        <div className="relative w-full md:w-2/5 h-[200px] md:h-auto bg-gray-200">
                          <img 
                            src={car.imageUrl} 
                            alt={`${car.brand} ${car.model}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="text-xl font-bold">{car.brand} {car.model}</h3>
                              <p className="text-lg font-semibold text-car-blue">${car.price.toLocaleString()}</p>
                            </div>
                            <p className="text-muted-foreground line-clamp-2 mt-1">{car.description}</p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
                              <div className="flex items-center text-sm">
                                <span className="font-medium">Year:</span>
                                <span className="ml-2">{car.year}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <span className="font-medium">Fuel:</span>
                                <span className="ml-2">{car.fuelType}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <span className="font-medium">Seats:</span>
                                <span className="ml-2">{car.seatingCapacity}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <span className="font-medium">Trans:</span>
                                <span className="ml-2">{car.transmission}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button onClick={() => handleViewDetails(car)}>
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && !error && totalPages > 1 && (
              <Pagination
                currentPage={filters.page || 1}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </main>

      {/* Car details dialog */}
      <CarDetailsDialog
        car={selectedCar}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};

export default Index;
