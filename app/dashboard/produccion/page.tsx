'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockTrips, mockProductions, formatCurrency, getRouteById, getBusById, getDriverById } from '@/lib/mock-data'
import { Production } from '@/lib/types'
import { Plus, Search, DollarSign, TrendingUp, TrendingDown, Fuel, Receipt, Calendar } from 'lucide-react'
import { toast } from 'sonner'

export default function ProduccionPage() {
  const [productions, setProductions] = useState<Production[]>(mockProductions)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    tripId: '',
    date: new Date().toISOString().split('T')[0],
    revenue: 0,
    fuelCost: 0,
    tollCost: 0,
    otherExpenses: 0
  })

  const completedTrips = mockTrips.filter(t => t.status === 'completed')

  const filteredProductions = productions.filter(prod => {
    const trip = mockTrips.find(t => t.id === prod.tripId)
    const route = trip ? getRouteById(trip.routeId) : null
    return route?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           prod.date.includes(searchTerm)
  })

  const totalRevenue = productions.reduce((acc, p) => acc + p.revenue, 0)
  const totalExpenses = productions.reduce((acc, p) => acc + p.fuelCost + p.tollCost + p.otherExpenses, 0)
  const totalNetIncome = productions.reduce((acc, p) => acc + p.netIncome, 0)
  const avgNetIncome = productions.length > 0 ? totalNetIncome / productions.length : 0

  const resetForm = () => {
    setFormData({
      tripId: '',
      date: new Date().toISOString().split('T')[0],
      revenue: 0,
      fuelCost: 0,
      tollCost: 0,
      otherExpenses: 0
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const netIncome = formData.revenue - formData.fuelCost - formData.tollCost - formData.otherExpenses

    const newProduction: Production = {
      id: `prod-${Date.now()}`,
      tripId: formData.tripId,
      operatorId: 'op-1',
      date: formData.date,
      revenue: formData.revenue,
      fuelCost: formData.fuelCost,
      tollCost: formData.tollCost,
      otherExpenses: formData.otherExpenses,
      netIncome
    }

    setProductions([...productions, newProduction])
    toast.success('Producción registrada correctamente')
    setIsDialogOpen(false)
    resetForm()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Producción Económica</h1>
          <p className="text-muted-foreground">Registro y seguimiento de ingresos y gastos por viaje</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="mr-2 h-4 w-4" />
              Registrar Producción
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Registrar Producción</DialogTitle>
              <DialogDescription>
                Ingresa los datos económicos del viaje completado
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="trip">Viaje</Label>
                <Select
                  value={formData.tripId}
                  onValueChange={(value) => {
                    const trip = completedTrips.find(t => t.id === value)
                    setFormData({ 
                      ...formData, 
                      tripId: value,
                      revenue: trip?.revenue || 0,
                      date: trip?.departureDate || formData.date
                    })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un viaje completado" />
                  </SelectTrigger>
                  <SelectContent>
                    {completedTrips.map((trip) => {
                      const route = getRouteById(trip.routeId)
                      return (
                        <SelectItem key={trip.id} value={trip.id}>
                          {route?.name} - {new Date(trip.departureDate).toLocaleDateString('es-CL')}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="revenue">Ingresos (CLP)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    min="0"
                    value={formData.revenue}
                    onChange={(e) => setFormData({ ...formData, revenue: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuelCost">Combustible (CLP)</Label>
                  <Input
                    id="fuelCost"
                    type="number"
                    min="0"
                    value={formData.fuelCost}
                    onChange={(e) => setFormData({ ...formData, fuelCost: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tollCost">Peajes (CLP)</Label>
                  <Input
                    id="tollCost"
                    type="number"
                    min="0"
                    value={formData.tollCost}
                    onChange={(e) => setFormData({ ...formData, tollCost: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="otherExpenses">Otros Gastos (CLP)</Label>
                  <Input
                    id="otherExpenses"
                    type="number"
                    min="0"
                    value={formData.otherExpenses}
                    onChange={(e) => setFormData({ ...formData, otherExpenses: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              {formData.revenue > 0 && (
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Utilidad Neta Estimada:</span>
                    <span className={`text-xl font-bold ${
                      (formData.revenue - formData.fuelCost - formData.tollCost - formData.otherExpenses) >= 0 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`}>
                      {formatCurrency(formData.revenue - formData.fuelCost - formData.tollCost - formData.otherExpenses)}
                    </span>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Registrar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Ingresos Totales
            </CardDescription>
            <CardTitle className="text-3xl text-primary">{formatCurrency(totalRevenue)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Gastos Totales
            </CardDescription>
            <CardTitle className="text-3xl text-red-500">{formatCurrency(totalExpenses)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Utilidad Neta
            </CardDescription>
            <CardTitle className="text-3xl text-green-500">{formatCurrency(totalNetIncome)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Utilidad Promedio/Viaje</CardDescription>
            <CardTitle className="text-3xl">{formatCurrency(avgNetIncome)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Registro de Producción</CardTitle>
              <CardDescription>{filteredProductions.length} registros</CardDescription>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ruta o fecha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Viaje</TableHead>
                <TableHead>Ingresos</TableHead>
                <TableHead>Combustible</TableHead>
                <TableHead>Peajes</TableHead>
                <TableHead>Otros</TableHead>
                <TableHead>Utilidad Neta</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProductions.map((prod) => {
                const trip = mockTrips.find(t => t.id === prod.tripId)
                const route = trip ? getRouteById(trip.routeId) : null
                const bus = trip ? getBusById(trip.busId) : null

                return (
                  <TableRow key={prod.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {new Date(prod.date).toLocaleDateString('es-CL')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{route?.name || 'N/A'}</p>
                        <p className="text-sm text-muted-foreground">{bus?.plate || ''}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-primary">{formatCurrency(prod.revenue)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-red-400">
                        <Fuel className="h-3 w-3" />
                        {formatCurrency(prod.fuelCost)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-red-400">
                        <Receipt className="h-3 w-3" />
                        {formatCurrency(prod.tollCost)}
                      </div>
                    </TableCell>
                    <TableCell className="text-red-400">{formatCurrency(prod.otherExpenses)}</TableCell>
                    <TableCell>
                      <Badge className={prod.netIncome >= 0 
                        ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                        : 'bg-red-500/10 text-red-500 border-red-500/20'
                      }>
                        {formatCurrency(prod.netIncome)}
                      </Badge>
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
