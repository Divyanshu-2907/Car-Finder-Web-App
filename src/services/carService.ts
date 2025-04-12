import { Car, CarFilterParams } from "../types/car";

// Mock car data
const CARS_DATA: Car[] = [
  {
    id: 1,
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    price: 25000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    seatingCapacity: 5,
    mileage: 32,
    engineCapacity: 2.5,
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb",
    description: "The Toyota Camry is a reliable mid-size sedan known for its comfort, fuel efficiency, and longevity.",
    features: ["Bluetooth", "Backup Camera", "Cruise Control", "Lane Departure Warning"]
  },
  {
    id: 2,
    brand: "Honda",
    model: "Accord",
    year: 2022,
    price: 26500,
    fuelType: "Gasoline",
    transmission: "Automatic",
    seatingCapacity: 5,
    mileage: 30,
    engineCapacity: 1.5,
    imageUrl: "https://images.unsplash.com/photo-1594070319944-7c0cbebb6f58?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvbmRhJTIwYWNjb3JkfGVufDB8fDB8fHww",
    description: "The Honda Accord is a popular mid-size sedan offering a good balance of performance, comfort, and reliability.",
    features: ["Apple CarPlay", "Android Auto", "Adaptive Cruise Control", "Heated Seats"]
  },
  {
    id: 3,
    brand: "Ford",
    model: "F-150",
    year: 2022,
    price: 35000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    seatingCapacity: 6,
    mileage: 20,
    engineCapacity: 3.5,
    imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
    description: "The Ford F-150 is America's best-selling pickup truck, known for its capability, durability, and versatility.",
    features: ["4WD", "Towing Package", "Touchscreen Infotainment", "Power Tailgate"]
  },
  {
    id: 4,
    brand: "Chevrolet",
    model: "Equinox",
    year: 2022,
    price: 28000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    seatingCapacity: 5,
    mileage: 26,
    engineCapacity: 1.5,
    imageUrl: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5",
    description: "The Chevrolet Equinox is a compact SUV offering good fuel economy, comfortable seating, and modern technology.",
    features: ["Wi-Fi Hotspot", "Teen Driver Technology", "Blind Spot Monitoring", "Rear Cross Traffic Alert"]
  },
  {
    id: 5,
    brand: "Tesla",
    model: "Model 3",
    year: 2022,
    price: 45000,
    fuelType: "Electric",
    transmission: "Automatic",
    seatingCapacity: 5,
    mileage: 120,
    engineCapacity: 0,
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
    description: "The Tesla Model 3 is a popular electric car known for its long range, cutting-edge technology, and impressive performance.",
    features: ["Autopilot", "Full Self-Driving Capability", "Glass Roof", "Minimalist Interior"]
  },
  {
    id: 6,
    brand: "BMW",
    model: "3 Series",
    year: 2022,
    price: 42000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    seatingCapacity: 5,
    mileage: 26,
    engineCapacity: 2.0,
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
    description: "The BMW 3 Series is a luxury compact sedan known for its sporty handling, upscale interior, and advanced technology.",
    features: ["iDrive Infotainment", "Leather Seats", "Harman Kardon Audio", "Dynamic Driving Modes"]
  },
  {
    id: 7,
    brand: "Audi",
    model: "Q5",
    year: 2022,
    price: 45000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    seatingCapacity: 5,
    mileage: 24,
    engineCapacity: 2.0,
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
    description: "The Audi Q5 is a luxury compact SUV offering a refined interior, smooth ride quality, and Quattro all-wheel drive.",
    features: ["Virtual Cockpit", "Quattro AWD", "Panoramic Sunroof", "Bang & Olufsen Sound"]
  },
  {
    id: 8,
    brand: "Hyundai",
    model: "Santa Fe",
    year: 2022,
    price: 27500,
    fuelType: "Gasoline",
    transmission: "Automatic",
    seatingCapacity: 5,
    mileage: 25,
    engineCapacity: 2.5,
    imageUrl: "https://images.unsplash.com/photo-1571037697753-e796f324bbd6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aHl1bmRhaXxlbnwwfHwwfHx8MA%3D%3D",
    description: "The Hyundai Santa Fe is a mid-size SUV offering great value, a comfortable interior, and plenty of standard features.",
    features: ["BlueLink Connected Car System", "Safe Exit Assist", "Smart Cruise Control", "Remote Start"]
  },
  {
    id: 9,
    brand: "Kia",
    model: "Telluride",
    year: 2022,
    price: 34000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    seatingCapacity: 8,
    mileage: 23,
    engineCapacity: 3.8,
    imageUrl: "https://images.unsplash.com/photo-1693456356273-b0bfab25c4bf?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGtpYXxlbnwwfHwwfHx8MA%3D%3D",
    description: "The Kia Telluride is a mid-size SUV with three rows of seating, upscale features, and a spacious interior.",
    features: ["Driver Talk", "Quiet Mode", "Heads-Up Display", "10.25-inch Touchscreen"]
  },
  {
    id: 10,
    brand: "Mazda",
    model: "CX-5",
    year: 2022,
    price: 26000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    seatingCapacity: 5,
    mileage: 28,
    engineCapacity: 2.5,
    imageUrl: "https://images.unsplash.com/photo-1629897048514-3dd7414fe72a",
    description: "The Mazda CX-5 is a compact crossover SUV known for its upscale interior, engaging driving dynamics, and sleek styling.",
    features: ["Mazda Connect Infotainment", "G-Vectoring Control Plus", "Bose Premium Audio", "Active Driving Display"]
  },
  {
    id: 11,
    brand: "Subaru",
    model: "Outback",
    year: 2022,
    price: 28000,
    fuelType: "Gasoline",
    transmission: "CVT",
    seatingCapacity: 5,
    mileage: 26,
    engineCapacity: 2.5,
    imageUrl: "https://images.unsplash.com/photo-1591827285933-08285e588df0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3ViYXJ1fGVufDB8fDB8fHww",
    description: "The Subaru Outback is a versatile wagon-like SUV with standard all-wheel drive and excellent off-road capability.",
    features: ["Symmetrical All-Wheel Drive", "EyeSight Driver Assist", "X-MODE", "StarLink Safety and Security"]
  },
  {
    id: 12,
    brand: "Volkswagen",
    model: "Tiguan",
    year: 2022,
    price: 27000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    seatingCapacity: 7,
    mileage: 23,
    engineCapacity: 2.0,
    imageUrl: "https://images.unsplash.com/photo-1609521263047-f8f205293f24",
    description: "The Volkswagen Tiguan is a compact SUV with optional third-row seating, refined handling, and European styling.",
    features: ["Digital Cockpit", "4Motion All-Wheel Drive", "App-Connect", "Panoramic Sunroof"]
  },
  {
    id: 13,
    brand: "Lexus",
    model: "RX",
    year: 2022,
    price: 46000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    seatingCapacity: 5,
    mileage: 30,
    engineCapacity: 3.5,
    imageUrl: "https://images.unsplash.com/photo-1601752874509-0e350467dc7b",
    description: "The Lexus RX is a luxury mid-size SUV offering exceptional comfort, reliability, and available hybrid powertrain.",
    features: ["Mark Levinson Audio", "Power Folding Rear Seats", "Color Head-Up Display", "Lexus Safety System+"]
  },
  {
    id: 14,
    brand: "Jeep",
    model: "Grand Cherokee",
    year: 2022,
    price: 38000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    seatingCapacity: 5,
    mileage: 22,
    engineCapacity: 3.6,
    imageUrl: "https://images.unsplash.com/photo-1511527844068-006b95d162c2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amVlcCUyMGdyYW5kJTIwY2hlcm9rZWV8ZW58MHx8MHx8fDA%3D",
    description: "The Jeep Grand Cherokee is a mid-size SUV known for its off-road capability, luxurious interior, and powerful engines.",
    features: ["Quadra-Drive II 4x4", "Quadra-Lift Air Suspension", "Selec-Terrain Traction Management", "McIntosh Audio System"]
  },
  {
    id: 15,
    brand: "Nissan",
    model: "Rogue",
    year: 2022,
    price: 27000,
    fuelType: "Gasoline",
    transmission: "CVT",
    seatingCapacity: 5,
    mileage: 30,
    engineCapacity: 2.5,
    imageUrl: "https://images.unsplash.com/photo-1551817280-6d59c77ce1b8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmlzc2FufGVufDB8fDB8fHww",
    description: "The Nissan Rogue is a compact SUV with a spacious interior, good fuel economy, and advanced safety features.",
    features: ["ProPILOT Assist", "Divide-N-Hide Cargo System", "Intelligent Around View Monitor", "Motion Activated Liftgate"]
  },
  {
    id: 16,
    brand: "Toyota",
    model: "RAV4",
    year: 2022,
    price: 27500,
    fuelType: "Hybrid",
    transmission: "CVT",
    seatingCapacity: 5,
    mileage: 40,
    engineCapacity: 2.5,
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb",
    description: "The Toyota RAV4 Hybrid is a compact SUV offering excellent fuel economy, standard all-wheel drive, and Toyota Safety Sense.",
    features: ["Toyota Safety Sense 2.0", "All-Wheel Drive with Intelligence", "Multi-Terrain Select", "JBL Premium Audio"]
  },
  {
    id: 17,
    brand: "Honda",
    model: "CR-V",
    year: 2022,
    price: 27000,
    fuelType: "Gasoline",
    transmission: "CVT",
    seatingCapacity: 5,
    mileage: 28,
    engineCapacity: 1.5,
    imageUrl: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982",
    description: "The Honda CR-V is a compact SUV offering a versatile interior, smooth ride, and excellent fuel economy.",
    features: ["Honda Sensing Suite", "Real Time AWD", "Hands-Free Access Power Tailgate", "Wireless Phone Charger"]
  },
  {
    id: 18,
    brand: "Ford",
    model: "Explorer",
    year: 2022,
    price: 34000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    seatingCapacity: 7,
    mileage: 24,
    engineCapacity: 2.3,
    imageUrl: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5",
    description: "The Ford Explorer is a three-row SUV with spacious seating, good towing capability, and a range of engine options.",
    features: ["Ford Co-Pilot360", "PowerFold Third-Row Seat", "Twin-Panel Moonroof", "Terrain Management System"]
  },
  {
    id: 19,
    brand: "Mercedes-Benz",
    model: "E-Class",
    year: 2022,
    price: 55000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    seatingCapacity: 5,
    mileage: 25,
    engineCapacity: 2.0,
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8",
    description: "The Mercedes-Benz E-Class is a luxury midsize car offering sophisticated technology, refined handling, and a stunning interior.",
    features: ["MBUX Infotainment", "Driver Assistance Package", "Air Body Control Suspension", "Burmester Surround Sound"]
  },
  {
    id: 20,
    brand: "Porsche",
    model: "911",
    year: 2022,
    price: 105000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    seatingCapacity: 4,
    mileage: 20,
    engineCapacity: 3.0,
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    description: "The Porsche 911 is an iconic sports car known for its exceptional performance, distinctive design, and everyday usability.",
    features: ["Sport Chrono Package", "Adaptive Sport Seats", "PASM Sport Suspension", "Bose Surround Sound System"]
  }
];

// Available brands for filtering
export const AVAILABLE_BRANDS = [...new Set(CARS_DATA.map(car => car.brand))];

// Available fuel types for filtering
export const AVAILABLE_FUEL_TYPES = [...new Set(CARS_DATA.map(car => car.fuelType))];

// Min and max price for the price range filter
export const PRICE_RANGE = {
  min: Math.min(...CARS_DATA.map(car => car.price)),
  max: Math.max(...CARS_DATA.map(car => car.price))
};

// Min and max seating capacity for the seating filter
export const SEATING_CAPACITY_RANGE = {
  min: Math.min(...CARS_DATA.map(car => car.seatingCapacity)),
  max: Math.max(...CARS_DATA.map(car => car.seatingCapacity))
};

// Function to fetch cars with filtering and pagination
export const fetchCars = (params: CarFilterParams = {}): Promise<{ cars: Car[], total: number }> => {
  return new Promise((resolve) => {
    // Simulate API delay - reduced from 800ms to 300ms for better responsiveness
    setTimeout(() => {
      let filteredCars = [...CARS_DATA];

      // Apply filters
      if (params.brand) {
        filteredCars = filteredCars.filter(car => car.brand === params.brand);
      }

      if (params.minPrice) {
        filteredCars = filteredCars.filter(car => car.price >= params.minPrice!);
      }

      if (params.maxPrice) {
        filteredCars = filteredCars.filter(car => car.price <= params.maxPrice!);
      }

      if (params.fuelType) {
        filteredCars = filteredCars.filter(car => car.fuelType === params.fuelType);
      }

      if (params.minSeats) {
        filteredCars = filteredCars.filter(car => car.seatingCapacity >= params.minSeats!);
      }

      if (params.maxSeats) {
        filteredCars = filteredCars.filter(car => car.seatingCapacity <= params.maxSeats!);
      }

      // Sort cars
      if (params.sortBy) {
        filteredCars = filteredCars.sort((a, b) => {
          if (params.sortBy === 'price') {
            return params.sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
          } else if (params.sortBy === 'year') {
            return params.sortOrder === 'asc' ? a.year - b.year : b.year - a.year;
          }
          return 0;
        });
      }

      // Apply pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const paginatedCars = filteredCars.slice(startIndex, endIndex);

      resolve({
        cars: paginatedCars,
        total: filteredCars.length
      });
    }, 300);
  });
};

// Function to fetch a single car by ID
export const fetchCarById = (id: number): Promise<Car | null> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const car = CARS_DATA.find(car => car.id === id) || null;
      resolve(car);
    }, 500);
  });
};
