'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockRoutes, mockBuses, mockDrivers, formatCurrency, formatDuration } from '@/lib/mock-data'
import { ArrowLeft, Bus, User, MapPin, Calendar, Clock, DollarSign, Users } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function NuevaAsignacionPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    routeId: '',
    busId: '',
    driverId: '',
    coDriverId: '',
    departureDate: '',
    departureTime: '',
    passengers: 0,
    notes: ''
  })

  const selectedRoute = mockRoutes.find(r => r.id === formData.routeId)
  const selectedBus = mockBuses.find(b => b.id === formData.busId)
  const availableBuses = mockBuses.filter(b => b.status === 'active')
  const availableDrivers = mockDrivers.filter(d => d.status === 'active')
  const availableCoDrivers = mockDrivers.filter(d => d.status === 'active' && d.id !== formData.driverId)

  const estimatedRevenue = selectedRoute && formData.passengers 
    ? selectedRoute.basePrice * formData.passengers 
    : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast.success('Viaje programado correctamente', {
      description: `${selectedRoute?.name} - ${formData.departureDate}`
    })

    router.push('/dashboard/asignacion')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/asignacion">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Nueva Asignación</h1>
          <p className="text-muted-foreground">Programa un nuevo viaje asignando ruta, bus y tripulación</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Route Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Selección de Ruta
                </CardTitle>
                <CardDescription>Elige la ruta para este viaje</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="route">Ruta</Label>
                    <Select
                      value={formData.routeId}
                      onValueChange={(value) => setFormData({ ...formData, routeId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una ruta" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockRoutes.filter(r => r.status === 'active').map((route) => (
                          <SelectItem key={route.id} value={route.id}>
                            {route.name} - {formatCurrency(route.basePrice)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedRoute && (
                    <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Origen:</span>
                        <span>{selectedRoute.origin}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Destino:</span>
                        <span>{selectedRoute.destination}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Distancia:</span>
                        <span>{selectedRoute.distance} km</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duración estimada:</span>
                        <span>{formatDuration(selectedRoute.estimatedDuration)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Bus Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bus className="h-5 w-5 text-primary" />
                  Asignación de Bus
                </CardTitle>
                <CardDescription>Selecciona el bus para este viaje</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bus">Bus</Label>
                    <Select
                      value={formData.busId}
                      onValueChange={(value) => setFormData({ ...formData, busId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un bus" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableBuses.map((bus) => (
                          <SelectItem key={bus.id} value={bus.id}>
                            {bus.plate} - {bus.brand} {bus.model} ({bus.capacity} pax)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedBus && (
                    <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Modelo:</span>
                        <span>{selectedBus.brand} {selectedBus.model}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Capacidad máxima:</span>
                        <span>{selectedBus.capacity} pasajeros</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Año:</span>
                        <span>{selectedBus.year}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Crew Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Asignación de Tripulación
                </CardTitle>
                <CardDescription>Asigna conductor y co-conductor (opcional)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="driver">Conductor Principal</Label>
                    <Select
                      value={formData.driverId}
                      onValueChange={(value) => setFormData({ ...formData, driverId: value, coDriverId: formData.coDriverId === value ? '' : formData.coDriverId })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona conductor" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDrivers.map((driver) => (
                          <SelectItem key={driver.id} value={driver.id}>
                            {driver.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coDriver">Co-Conductor (Opcional)</Label>
                    <Select
                      value={formData.coDriverId}
                      onValueChange={(value) => setFormData({ ...formData, coDriverId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona co-conductor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Sin co-conductor</SelectItem>
                        {availableCoDrivers.map((driver) => (
                          <SelectItem key={driver.id} value={driver.id}>
                            {driver.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Programación
                </CardTitle>
                <CardDescription>Define fecha, hora y cantidad de pasajeros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha de Salida</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.departureDate}
                      onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Hora de Salida</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.departureTime}
                      onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passengers">Pasajeros</Label>
                    <Input
                      id="passengers"
                      type="number"
                      min="1"
                      max={selectedBus?.capacity || 100}
                      placeholder="0"
                      value={formData.passengers || ''}
                      onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) || 0 })}
                      required
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="notes">Notas (Opcional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Observaciones adicionales para este viaje..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumen del Viaje</CardTitle>
                <CardDescription>Revisa los detalles antes de confirmar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ruta</p>
                      <p className="font-medium">{selectedRoute?.name || 'No seleccionada'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Bus className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bus</p>
                      <p className="font-medium">{selectedBus?.plate || 'No seleccionado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Fecha y Hora</p>
                      <p className="font-medium">
                        {formData.departureDate 
                          ? `${new Date(formData.departureDate).toLocaleDateString('es-CL')} ${formData.departureTime || ''}`
                          : 'No definida'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Pasajeros</p>
                      <p className="font-medium">{formData.passengers || 0} personas</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Ingreso Estimado</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(estimatedRevenue)}
                    </span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={!formData.routeId || !formData.busId || !formData.driverId || !formData.departureDate || !formData.departureTime || !formData.passengers || isSubmitting}
                >
                  {isSubmitting ? 'Programando...' : 'Programar Viaje'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
