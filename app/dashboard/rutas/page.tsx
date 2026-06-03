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
import { mockRoutes, formatCurrency, formatDuration } from '@/lib/mock-data'
import { Route } from '@/lib/types'
import { Plus, Search, MapPin, Edit, Trash2, Clock, DollarSign, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

export default function RutasPage() {
  const [routes, setRoutes] = useState<Route[]>(mockRoutes)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRoute, setEditingRoute] = useState<Route | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    destination: '',
    distance: 0,
    estimatedDuration: 0,
    basePrice: 0,
    status: 'active' as Route['status']
  })

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.destination.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const resetForm = () => {
    setFormData({
      name: '',
      origin: '',
      destination: '',
      distance: 0,
      estimatedDuration: 0,
      basePrice: 0,
      status: 'active'
    })
    setEditingRoute(null)
  }

  const handleOpenDialog = (route?: Route) => {
    if (route) {
      setEditingRoute(route)
      setFormData({
        name: route.name,
        origin: route.origin,
        destination: route.destination,
        distance: route.distance,
        estimatedDuration: route.estimatedDuration,
        basePrice: route.basePrice,
        status: route.status
      })
    } else {
      resetForm()
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingRoute) {
      setRoutes(routes.map(r => 
        r.id === editingRoute.id 
          ? { ...r, ...formData }
          : r
      ))
      toast.success('Ruta actualizada correctamente')
    } else {
      const newRoute: Route = {
        id: `route-${Date.now()}`,
        operatorId: 'op-1',
        ...formData
      }
      setRoutes([...routes, newRoute])
      toast.success('Ruta creada correctamente')
    }
    
    setIsDialogOpen(false)
    resetForm()
  }

  const handleDelete = (routeId: string) => {
    setRoutes(routes.filter(r => r.id !== routeId))
    toast.success('Ruta eliminada correctamente')
  }

  const getStatusBadge = (status: Route['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Activa</Badge>
      case 'inactive':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Inactiva</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Rutas</h1>
          <p className="text-muted-foreground">Administra las rutas de viaje de tu operación</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Ruta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingRoute ? 'Editar Ruta' : 'Crear Nueva Ruta'}</DialogTitle>
              <DialogDescription>
                {editingRoute ? 'Modifica los datos de la ruta' : 'Define los datos para una nueva ruta de viaje'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">Nombre de la Ruta</Label>
                  <Input
                    id="name"
                    placeholder="Santiago - Temuco"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin">Origen</Label>
                  <Input
                    id="origin"
                    placeholder="Terminal San Borja, Santiago"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destino</Label>
                  <Input
                    id="destination"
                    placeholder="Terminal de Buses Temuco"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distance">Distancia (km)</Label>
                  <Input
                    id="distance"
                    type="number"
                    min="1"
                    value={formData.distance}
                    onChange={(e) => setFormData({ ...formData, distance: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedDuration">Duración Estimada (minutos)</Label>
                  <Input
                    id="estimatedDuration"
                    type="number"
                    min="1"
                    value={formData.estimatedDuration}
                    onChange={(e) => setFormData({ ...formData, estimatedDuration: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="basePrice">Precio Base (CLP)</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: Route['status']) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activa</SelectItem>
                      <SelectItem value="inactive">Inactiva</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingRoute ? 'Guardar Cambios' : 'Crear Ruta'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Rutas</CardDescription>
            <CardTitle className="text-3xl text-primary">{routes.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Rutas Activas</CardDescription>
            <CardTitle className="text-3xl text-green-500">
              {routes.filter(r => r.status === 'active').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Distancia Total</CardDescription>
            <CardTitle className="text-3xl">{routes.reduce((acc, r) => acc + r.distance, 0)} km</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Precio Promedio</CardDescription>
            <CardTitle className="text-2xl">
              {formatCurrency(routes.reduce((acc, r) => acc + r.basePrice, 0) / routes.length)}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Lista de Rutas</CardTitle>
              <CardDescription>{filteredRoutes.length} rutas configuradas</CardDescription>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, origen..."
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
                <TableHead>Ruta</TableHead>
                <TableHead>Trayecto</TableHead>
                <TableHead>Distancia</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Precio Base</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoutes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">{route.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground truncate max-w-[120px]">{route.origin.split(',')[0]}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground truncate max-w-[120px]">{route.destination.split(',')[0]}</span>
                    </div>
                  </TableCell>
                  <TableCell>{route.distance} km</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {formatDuration(route.estimatedDuration)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-primary" />
                      {formatCurrency(route.basePrice)}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(route.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(route)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(route.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
