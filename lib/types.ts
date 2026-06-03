// Types for OLAspa SaaS Platform

export interface Operator {
  id: string
  name: string
  email: string
  company: string
  phone: string
  rut: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
}

export interface Bus {
  id: string
  operatorId: string
  plate: string
  model: string
  brand: string
  year: number
  capacity: number
  status: 'active' | 'maintenance' | 'inactive'
  lastMaintenance?: string
}

export interface Driver {
  id: string
  operatorId: string
  name: string
  rut: string
  licenseNumber: string
  licenseExpiry: string
  phone: string
  email: string
  status: 'active' | 'inactive' | 'on_trip'
  hireDate: string
}

export interface Route {
  id: string
  operatorId: string
  name: string
  origin: string
  destination: string
  distance: number
  estimatedDuration: number
  basePrice: number
  status: 'active' | 'inactive'
}

export interface Trip {
  id: string
  operatorId: string
  routeId: string
  busId: string
  driverId: string
  coDriverId?: string
  departureDate: string
  departureTime: string
  arrivalTime?: string
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  passengers: number
  revenue: number
  expenses: number
  notes?: string
}

export interface Production {
  id: string
  tripId: string
  operatorId: string
  date: string
  revenue: number
  fuelCost: number
  tollCost: number
  otherExpenses: number
  netIncome: number
}

export interface DashboardStats {
  totalRevenue: number
  totalTrips: number
  activeBuses: number
  activeDrivers: number
  avgRevenuePerTrip: number
  monthlyGrowth: number
}

export interface ChartData {
  name: string
  value: number
}

export interface AuthUser {
  id: string
  operatorId: string
  name: string
  email: string
  company: string
}
