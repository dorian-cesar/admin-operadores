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
import { mockDrivers } from '@/lib/mock-data'
import { Driver } from '@/lib/types'
import { Plus, Search, User, Edit, Trash2, Phone, Mail, Calendar } from 'lucide-react'
import { toast } from 'sonner'

export default function ConductoresPage() {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    rut: '',
    licenseNumber: '',
    licenseExpiry: '',
    phone: '',
    email: '',
    status: 'active' as Driver['status'],
    hireDate: new Date().toISOString().split('T')[0]
  })

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.rut.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const resetForm = () => {
    setFormData({
      name: '',
      rut: '',
      licenseNumber: '',
      licenseExpiry: '',
      phone: '',
      email: '',
      status: 'active',
      hireDate: new Date().toISOString().split('T')[0]
    })
    setEditingDriver(null)
  }

  const handleOpenDialog = (driver?: Driver) => {
    if (driver) {
      setEditingDriver(driver)
      setFormData({
        name: driver.name,
        rut: driver.rut,
        licenseNumber: driver.licenseNumber,
        licenseExpiry: driver.licenseExpiry,
        phone: driver.phone,
        email: driver.email,
        status: driver.status,
        hireDate: driver.hireDate
      })
    } else {
      resetForm()
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingDriver) {
      setDrivers(drivers.map(d => 
        d.id === editingDriver.id 
          ? { ...d, ...formData }
          : d
      ))
      toast.success('Conductor actualizado correctamente')
    } else {
      const newDriver: Driver = {
        id: `drv-${Date.now()}`,
        operatorId: 'op-1',
        ...formData
      }
      setDrivers([...drivers, newDriver])
      toast.success('Conductor agregado correctamente')
    }
    
    setIsDialogOpen(false)
    resetForm()
  }

  const handleDelete = (driverId: string) => {
    setDrivers(drivers.filter(d => d.id !== driverId))
    toast.success('Conductor eliminado correctamente')
  }

  const getStatusBadge = (status: Driver['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Activo</Badge>
      case 'on_trip':
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">En Viaje</Badge>
      case 'inactive':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Inactivo</Badge>
    }
  }

  const isLicenseExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 90 && diffDays > 0
  }

  const isLicenseExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Conductores</h1>
          <p className="text-muted-foreground">Administra la tripulación de tu operación</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Conductor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingDriver ? 'Editar Conductor' : 'Agregar Nuevo Conductor'}</DialogTitle>
              <DialogDescription>
                {editingDriver ? 'Modifica los datos del conductor' : 'Completa los datos para registrar un nuevo conductor'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    placeholder="Juan Pérez González"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rut">RUT</Label>
                  <Input
                    id="rut"
                    placeholder="12.345.678-9"
                    value={formData.rut}
                    onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">N° Licencia</Label>
                  <Input
                    id="licenseNumber"
                    placeholder="A1-12345678"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseExpiry">Vencimiento Licencia</Label>
                  <Input
                    id="licenseExpiry"
                    type="date"
                    value={formData.licenseExpiry}
                    onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="conductor@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hireDate">Fecha de Contratación</Label>
                  <Input
                    id="hireDate"
                    type="date"
                    value={formData.hireDate}
                    onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: Driver['status']) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="on_trip">En Viaje</SelectItem>
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
                  {editingDriver ? 'Guardar Cambios' : 'Agregar Conductor'}
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
            <CardDescription>Total Conductores</CardDescription>
            <CardTitle className="text-3xl text-primary">{drivers.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Disponibles</CardDescription>
            <CardTitle className="text-3xl text-green-500">
              {drivers.filter(d => d.status === 'active').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>En Viaje</CardDescription>
            <CardTitle className="text-3xl text-blue-500">
              {drivers.filter(d => d.status === 'on_trip').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Licencias por Vencer</CardDescription>
            <CardTitle className="text-3xl text-yellow-500">
              {drivers.filter(d => isLicenseExpiringSoon(d.licenseExpiry)).length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Lista de Conductores</CardTitle>
              <CardDescription>{filteredDrivers.length} conductores registrados</CardDescription>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, RUT..."
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
                <TableHead>Conductor</TableHead>
                <TableHead>RUT</TableHead>
                <TableHead>Licencia</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Desde {new Date(driver.hireDate).toLocaleDateString('es-CL')}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{driver.rut}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{driver.licenseNumber}</p>
                      <p className={`text-sm ${
                        isLicenseExpired(driver.licenseExpiry) 
                          ? 'text-red-500' 
                          : isLicenseExpiringSoon(driver.licenseExpiry)
                            ? 'text-yellow-500'
                            : 'text-muted-foreground'
                      }`}>
                        Vence: {new Date(driver.licenseExpiry).toLocaleDateString('es-CL')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {driver.phone}
                      </p>
                      <p className="text-sm flex items-center gap-1 text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {driver.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(driver.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(driver)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(driver.id)}
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
