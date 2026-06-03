'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockTrips, mockRoutes, mockBuses, mockDrivers, formatCurrency, getRouteById, getBusById, getDriverById } from '@/lib/mock-data'
import { Trip } from '@/lib/types'
import { Plus, Search, Calendar, Bus, User, MapPin, Clock, Eye } from 'lucide-react'

export default function AsignacionPage() {
  const [trips, setTrips] = useState<Trip[]>(mockTrips)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredTrips = trips.filter(trip => {
    const route = getRouteById(trip.routeId)
    const bus = getBusById(trip.busId)
    const driver = getDriverById(trip.driverId)
    
    const matchesSearch = 
      route?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus?.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver?.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || trip.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Trip['status']) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Programado</Badge>
      case 'in_progress':
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">En Curso</Badge>
      case 'completed':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Completado</Badge>
      case 'cancelled':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Cancelado</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Asignación de Viajes</h1>
          <p className="text-muted-foreground">Gestiona la programación de viajes y asignación de recursos</p>
        </div>
        <Link href="/dashboard/asignacion/nueva">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Asignación
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Viajes</CardDescription>
            <CardTitle className="text-3xl text-primary">{trips.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Programados</CardDescription>
            <CardTitle className="text-3xl text-blue-500">
              {trips.filter(t => t.status === 'scheduled').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completados</CardDescription>
            <CardTitle className="text-3xl text-green-500">
              {trips.filter(t => t.status === 'completed').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Ingresos Programados</CardDescription>
            <CardTitle className="text-2xl">
              {formatCurrency(trips.filter(t => t.status === 'scheduled').reduce((acc, t) => acc + t.revenue, 0))}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Lista de Viajes</CardTitle>
              <CardDescription>{filteredTrips.length} viajes registrados</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="scheduled">Programados</SelectItem>
                  <SelectItem value="in_progress">En Curso</SelectItem>
                  <SelectItem value="completed">Completados</SelectItem>
                  <SelectItem value="cancelled">Cancelados</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha/Hora</TableHead>
                <TableHead>Ruta</TableHead>
                <TableHead>Bus</TableHead>
                <TableHead>Conductor</TableHead>
                <TableHead>Pasajeros</TableHead>
                <TableHead>Ingresos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrips.map((trip) => {
                const route = getRouteById(trip.routeId)
                const bus = getBusById(trip.busId)
                const driver = getDriverById(trip.driverId)
                const coDriver = trip.coDriverId ? getDriverById(trip.coDriverId) : null

                return (
                  <TableRow key={trip.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">{new Date(trip.departureDate).toLocaleDateString('es-CL')}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {trip.departureTime}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{route?.name || 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Bus className="h-4 w-4 text-muted-foreground" />
                        <span>{bus?.plate || 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{driver?.name || 'N/A'}</p>
                          {coDriver && (
                            <p className="text-xs text-muted-foreground">Co: {coDriver.name}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{trip.passengers} pax</TableCell>
                    <TableCell className="font-medium text-primary">{formatCurrency(trip.revenue)}</TableCell>
                    <TableCell>{getStatusBadge(trip.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
