'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  mockDashboardStats, 
  monthlyRevenueData, 
  tripsByRouteData, 
  busUsageData,
  formatCurrency,
  mockTrips,
  mockBuses,
  mockDrivers,
  mockRoutes
} from '@/lib/mock-data'
import { 
  DollarSign, 
  Bus, 
  Users, 
  MapPin, 
  TrendingUp, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

const CHART_COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444']

export default function IndicadoresPage() {
  const stats = mockDashboardStats

  const kpiCards = [
    {
      title: 'Ingresos Totales',
      value: formatCurrency(stats.totalRevenue),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      description: 'vs. mes anterior'
    },
    {
      title: 'Viajes Realizados',
      value: stats.totalTrips.toString(),
      change: '+8',
      trend: 'up',
      icon: MapPin,
      description: 'este mes'
    },
    {
      title: 'Buses Activos',
      value: `${stats.activeBuses}/${mockBuses.length}`,
      change: '75%',
      trend: 'neutral',
      icon: Bus,
      description: 'disponibilidad'
    },
    {
      title: 'Conductores Activos',
      value: stats.activeDrivers.toString(),
      change: '100%',
      trend: 'up',
      icon: Users,
      description: 'disponibles'
    },
    {
      title: 'Promedio por Viaje',
      value: formatCurrency(stats.avgRevenuePerTrip),
      change: '+5.2%',
      trend: 'up',
      icon: TrendingUp,
      description: 'ingresos'
    },
    {
      title: 'Rutas Activas',
      value: mockRoutes.filter(r => r.status === 'active').length.toString(),
      change: mockRoutes.length.toString(),
      trend: 'neutral',
      icon: Calendar,
      description: 'de total configuradas'
    }
  ]

  // Calculate occupancy rate
  const avgOccupancy = mockTrips.length > 0 
    ? Math.round(mockTrips.reduce((acc, trip) => {
        const bus = mockBuses.find(b => b.id === trip.busId)
        return acc + (bus ? (trip.passengers / bus.capacity) * 100 : 0)
      }, 0) / mockTrips.length)
    : 0

  const occupancyData = [
    { name: 'Ocupado', value: avgOccupancy },
    { name: 'Disponible', value: 100 - avgOccupancy }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Panel de Indicadores</h1>
          <p className="text-muted-foreground">Métricas clave de rendimiento de tu operación</p>
        </div>
        <Badge variant="outline" className="w-fit border-primary/50 text-primary">
          Actualizado hace 5 min
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpiCards.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-sm font-medium">
                {kpi.title}
              </CardDescription>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <kpi.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center gap-2 mt-1">
                {kpi.trend === 'up' && (
                  <span className="flex items-center text-sm text-green-500">
                    <ArrowUpRight className="h-4 w-4" />
                    {kpi.change}
                  </span>
                )}
                {kpi.trend === 'down' && (
                  <span className="flex items-center text-sm text-red-500">
                    <ArrowDownRight className="h-4 w-4" />
                    {kpi.change}
                  </span>
                )}
                {kpi.trend === 'neutral' && (
                  <span className="text-sm text-muted-foreground">{kpi.change}</span>
                )}
                <span className="text-sm text-muted-foreground">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Ingresos Mensuales</CardTitle>
            <CardDescription>Evolución de ingresos en los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9ca3af" 
                    tick={{ fill: '#9ca3af' }}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    tick={{ fill: '#9ca3af' }}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#f3f4f6' }}
                    formatter={(value: number) => [formatCurrency(value), 'Ingresos']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#f59e0b" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Trips by Route Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Viajes por Ruta</CardTitle>
            <CardDescription>Distribución de viajes realizados por ruta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tripsByRouteData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="#9ca3af" 
                    tick={{ fill: '#9ca3af' }}
                    width={100}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#f3f4f6' }}
                    formatter={(value: number) => [value, 'Viajes']}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#f59e0b" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bus Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Uso de Flota</CardTitle>
            <CardDescription>Viajes por bus este mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={busUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                  <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#f3f4f6' }}
                    formatter={(value: number) => [value, 'Viajes']}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {busUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Occupancy Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Tasa de Ocupación</CardTitle>
            <CardDescription>Promedio de ocupación en viajes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={occupancyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#f59e0b" />
                    <Cell fill="#374151" />
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <p className="text-3xl font-bold text-primary">{avgOccupancy}%</p>
                <p className="text-sm text-muted-foreground">Ocupación</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen Rápido</CardTitle>
            <CardDescription>Estadísticas del período</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Viajes Completados</span>
              <span className="font-bold text-green-500">
                {mockTrips.filter(t => t.status === 'completed').length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Viajes Programados</span>
              <span className="font-bold text-blue-500">
                {mockTrips.filter(t => t.status === 'scheduled').length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Buses en Mantenimiento</span>
              <span className="font-bold text-yellow-500">
                {mockBuses.filter(b => b.status === 'maintenance').length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Conductores en Viaje</span>
              <span className="font-bold text-primary">
                {mockDrivers.filter(d => d.status === 'on_trip').length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Crecimiento Mensual</span>
              <span className="font-bold text-green-500">+{stats.monthlyGrowth}%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
