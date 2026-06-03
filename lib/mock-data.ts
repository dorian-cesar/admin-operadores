import { Bus, Driver, Route, Trip, Operator, Production, DashboardStats, ChartData } from './types'

// Mock Operators
export const mockOperators: Operator[] = [
  {
    id: 'op-1',
    name: 'Juan Pérez',
    email: 'juan@olaspa.cl',
    company: 'Transportes del Sur SpA',
    phone: '+56 9 1234 5678',
    rut: '12.345.678-9',
    status: 'active',
    createdAt: '2024-01-15'
  }
]

// Mock Buses
export const mockBuses: Bus[] = [
  {
    id: 'bus-1',
    operatorId: 'op-1',
    plate: 'ABCD-12',
    model: 'Marcopolo Paradiso 1800 DD',
    brand: 'Marcopolo',
    year: 2022,
    capacity: 52,
    status: 'active',
    lastMaintenance: '2024-05-15'
  },
  {
    id: 'bus-2',
    operatorId: 'op-1',
    plate: 'EFGH-34',
    model: 'Modasa Zeus 3',
    brand: 'Modasa',
    year: 2021,
    capacity: 48,
    status: 'active',
    lastMaintenance: '2024-04-20'
  },
  {
    id: 'bus-3',
    operatorId: 'op-1',
    plate: 'IJKL-56',
    model: 'Busscar Vissta Buss DD',
    brand: 'Busscar',
    year: 2023,
    capacity: 55,
    status: 'maintenance',
    lastMaintenance: '2024-06-01'
  },
  {
    id: 'bus-4',
    operatorId: 'op-1',
    plate: 'MNOP-78',
    model: 'Irizar i6S',
    brand: 'Irizar',
    year: 2020,
    capacity: 44,
    status: 'active',
    lastMaintenance: '2024-03-10'
  }
]

// Mock Drivers
export const mockDrivers: Driver[] = [
  {
    id: 'drv-1',
    operatorId: 'op-1',
    name: 'Carlos Rodríguez',
    rut: '15.234.567-8',
    licenseNumber: 'A1-12345678',
    licenseExpiry: '2025-08-15',
    phone: '+56 9 8765 4321',
    email: 'carlos.r@email.com',
    status: 'active',
    hireDate: '2022-03-01'
  },
  {
    id: 'drv-2',
    operatorId: 'op-1',
    name: 'María González',
    rut: '16.345.678-9',
    licenseNumber: 'A1-23456789',
    licenseExpiry: '2025-12-20',
    phone: '+56 9 7654 3210',
    email: 'maria.g@email.com',
    status: 'active',
    hireDate: '2021-06-15'
  },
  {
    id: 'drv-3',
    operatorId: 'op-1',
    name: 'Pedro Sánchez',
    rut: '17.456.789-0',
    licenseNumber: 'A1-34567890',
    licenseExpiry: '2024-10-05',
    phone: '+56 9 6543 2109',
    email: 'pedro.s@email.com',
    status: 'on_trip',
    hireDate: '2023-01-10'
  },
  {
    id: 'drv-4',
    operatorId: 'op-1',
    name: 'Ana Martínez',
    rut: '18.567.890-1',
    licenseNumber: 'A1-45678901',
    licenseExpiry: '2026-02-28',
    phone: '+56 9 5432 1098',
    email: 'ana.m@email.com',
    status: 'active',
    hireDate: '2022-09-20'
  }
]

// Mock Routes
export const mockRoutes: Route[] = [
  {
    id: 'route-1',
    operatorId: 'op-1',
    name: 'Santiago - Temuco',
    origin: 'Terminal San Borja, Santiago',
    destination: 'Terminal de Buses Temuco',
    distance: 680,
    estimatedDuration: 540,
    basePrice: 25000,
    status: 'active'
  },
  {
    id: 'route-2',
    operatorId: 'op-1',
    name: 'Santiago - Valdivia',
    origin: 'Terminal San Borja, Santiago',
    destination: 'Terminal de Buses Valdivia',
    distance: 850,
    estimatedDuration: 660,
    basePrice: 32000,
    status: 'active'
  },
  {
    id: 'route-3',
    operatorId: 'op-1',
    name: 'Santiago - Puerto Montt',
    origin: 'Terminal San Borja, Santiago',
    destination: 'Terminal de Buses Puerto Montt',
    distance: 1020,
    estimatedDuration: 780,
    basePrice: 38000,
    status: 'active'
  },
  {
    id: 'route-4',
    operatorId: 'op-1',
    name: 'Temuco - Valdivia',
    origin: 'Terminal de Buses Temuco',
    destination: 'Terminal de Buses Valdivia',
    distance: 170,
    estimatedDuration: 150,
    basePrice: 8000,
    status: 'active'
  }
]

// Mock Trips
export const mockTrips: Trip[] = [
  {
    id: 'trip-1',
    operatorId: 'op-1',
    routeId: 'route-1',
    busId: 'bus-1',
    driverId: 'drv-1',
    coDriverId: 'drv-2',
    departureDate: '2024-06-15',
    departureTime: '08:00',
    arrivalTime: '17:00',
    status: 'completed',
    passengers: 48,
    revenue: 1200000,
    expenses: 350000,
    notes: 'Viaje sin incidentes'
  },
  {
    id: 'trip-2',
    operatorId: 'op-1',
    routeId: 'route-2',
    busId: 'bus-2',
    driverId: 'drv-3',
    departureDate: '2024-06-16',
    departureTime: '22:00',
    status: 'scheduled',
    passengers: 42,
    revenue: 1344000,
    expenses: 0
  },
  {
    id: 'trip-3',
    operatorId: 'op-1',
    routeId: 'route-3',
    busId: 'bus-4',
    driverId: 'drv-4',
    coDriverId: 'drv-1',
    departureDate: '2024-06-14',
    departureTime: '20:00',
    arrivalTime: '09:00',
    status: 'completed',
    passengers: 40,
    revenue: 1520000,
    expenses: 420000
  },
  {
    id: 'trip-4',
    operatorId: 'op-1',
    routeId: 'route-4',
    busId: 'bus-1',
    driverId: 'drv-2',
    departureDate: '2024-06-17',
    departureTime: '10:00',
    status: 'scheduled',
    passengers: 35,
    revenue: 280000,
    expenses: 0
  }
]

// Mock Productions
export const mockProductions: Production[] = [
  {
    id: 'prod-1',
    tripId: 'trip-1',
    operatorId: 'op-1',
    date: '2024-06-15',
    revenue: 1200000,
    fuelCost: 180000,
    tollCost: 85000,
    otherExpenses: 85000,
    netIncome: 850000
  },
  {
    id: 'prod-2',
    tripId: 'trip-3',
    operatorId: 'op-1',
    date: '2024-06-14',
    revenue: 1520000,
    fuelCost: 220000,
    tollCost: 95000,
    otherExpenses: 105000,
    netIncome: 1100000
  }
]

// Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalRevenue: 15840000,
  totalTrips: 48,
  activeBuses: 3,
  activeDrivers: 4,
  avgRevenuePerTrip: 330000,
  monthlyGrowth: 12.5
}

// Chart Data - Monthly Revenue
export const monthlyRevenueData: ChartData[] = [
  { name: 'Ene', value: 12500000 },
  { name: 'Feb', value: 11800000 },
  { name: 'Mar', value: 13200000 },
  { name: 'Abr', value: 14100000 },
  { name: 'May', value: 15200000 },
  { name: 'Jun', value: 15840000 }
]

// Chart Data - Trips by Route
export const tripsByRouteData: ChartData[] = [
  { name: 'Stgo-Temuco', value: 18 },
  { name: 'Stgo-Valdivia', value: 12 },
  { name: 'Stgo-Pto Montt', value: 10 },
  { name: 'Temuco-Valdivia', value: 8 }
]

// Chart Data - Bus Usage
export const busUsageData: ChartData[] = [
  { name: 'ABCD-12', value: 15 },
  { name: 'EFGH-34', value: 12 },
  { name: 'IJKL-56', value: 8 },
  { name: 'MNOP-78', value: 13 }
]

// Helper functions
export function getBusById(id: string): Bus | undefined {
  return mockBuses.find(bus => bus.id === id)
}

export function getDriverById(id: string): Driver | undefined {
  return mockDrivers.find(driver => driver.id === id)
}

export function getRouteById(id: string): Route | undefined {
  return mockRoutes.find(route => route.id === id)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(amount)
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}
