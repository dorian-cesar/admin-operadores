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
import { mockBuses } from '@/lib/mock-data'
import { Bus } from '@/lib/types'
import { Plus, Search, Bus as BusIcon, Edit, Trash2, Wrench } from 'lucide-react'
import { toast } from 'sonner'

export default function FlotaPage() {
  const [buses, setBuses] = useState<Bus[]>(mockBuses)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBus, setEditingBus] = useState<Bus | null>(null)
  const [formData, setFormData] = useState({
    plate: '',
    model: '',
    brand: '',
    year: new Date().getFullYear(),
    capacity: 45,
    status: 'active' as Bus['status']
  })

  const filteredBuses = buses.filter(bus =>
    bus.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.brand.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const resetForm = () => {
    setFormData({
      plate: '',
      model: '',
      brand: '',
      year: new Date().getFullYear(),
      capacity: 45,
      status: 'active'
    })
    setEditingBus(null)
  }

  const handleOpenDialog = (bus?: Bus) => {
    if (bus) {
      setEditingBus(bus)
      setFormData({
        plate: bus.plate,
        model: bus.model,
        brand: bus.brand,
        year: bus.year,
        capacity: bus.capacity,
        status: bus.status
      })
    } else {
      resetForm()
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingBus) {
      setBuses(buses.map(b => 
        b.id === editingBus.id 
          ? { ...b, ...formData }
          : b
      ))
      toast.success('Bus actualizado correctamente')
    } else {
      const newBus: Bus = {
        id: `bus-${Date.now()}`,
        operatorId: 'op-1',
        ...formData
      }
      setBuses([...buses, newBus])
      toast.success('Bus agregado correctamente')
    }
    
    setIsDialogOpen(false)
    resetForm()
  }

  const handleDelete = (busId: string) => {
    setBuses(buses.filter(b => b.id !== busId))
    toast.success('Bus eliminado correctamente')
  }

  const getStatusBadge = (status: Bus['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Activo</Badge>
      case 'maintenance':
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Mantenimiento</Badge>
      case 'inactive':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Inactivo</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Flota</h1>
          <p className="text-muted-foreground">Administra los buses de tu operación</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Bus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingBus ? 'Editar Bus' : 'Agregar Nuevo Bus'}</DialogTitle>
              <DialogDescription>
                {editingBus ? 'Modifica los datos del bus' : 'Completa los datos para registrar un nuevo bus'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="plate">Patente/Placa</Label>
                  <Input
                    id="plate"
                    placeholder="ABCD-12"
                    value={formData.plate}
                    onChange={(e) => setFormData({ ...formData, plate: e.target.value.toUpperCase() })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Input
                    id="brand"
                    placeholder="Marcopolo"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="model">Modelo</Label>
                  <Input
                    id="model"
                    placeholder="Paradiso 1800 DD"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Año</Label>
                  <Input
                    id="year"
                    type="number"
                    min="2000"
                    max={new Date().getFullYear() + 1}
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacidad (pasajeros)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: Bus['status']) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="maintenance">En Mantenimiento</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingBus ? 'Guardar Cambios' : 'Agregar Bus'}
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
            <CardDescription>Total Buses</CardDescription>
            <CardTitle className="text-3xl text-primary">{buses.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Activos</CardDescription>
            <CardTitle className="text-3xl text-green-500">
              {buses.filter(b => b.status === 'active').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>En Mantenimiento</CardDescription>
            <CardTitle className="text-3xl text-yellow-500">
              {buses.filter(b => b.status === 'maintenance').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Capacidad Total</CardDescription>
            <CardTitle className="text-3xl">{buses.reduce((acc, b) => acc + b.capacity, 0)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Lista de Buses</CardTitle>
              <CardDescription>{filteredBuses.length} buses registrados</CardDescription>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por patente, modelo..."
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
                <TableHead>Patente</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Año</TableHead>
                <TableHead>Capacidad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBuses.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <BusIcon className="h-4 w-4 text-primary" />
                      <span className="font-medium">{bus.plate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{bus.brand}</p>
                      <p className="text-sm text-muted-foreground">{bus.model}</p>
                    </div>
                  </TableCell>
                  <TableCell>{bus.year}</TableCell>
                  <TableCell>{bus.capacity} pax</TableCell>
                  <TableCell>{getStatusBadge(bus.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(bus)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(bus.id)}
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
