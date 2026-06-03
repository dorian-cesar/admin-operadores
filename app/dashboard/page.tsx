'use client'

import { useAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { mockOperators } from '@/lib/mock-data'
import { Building2, Mail, Phone, User, FileText, Calendar, Edit } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  const operator = mockOperators.find(op => op.id === user?.operatorId) || mockOperators[0]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Ficha del Operador</h1>
          <p className="text-muted-foreground">Información de tu cuenta y empresa</p>
        </div>
        <Badge variant="outline" className="w-fit border-primary text-primary">
          Operador Activo
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Información General</CardTitle>
              <CardDescription>Datos del representante legal</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  Nombre Completo
                </Label>
                <Input id="name" value={user?.name || operator.name} readOnly className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rut" className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  RUT
                </Label>
                <Input id="rut" value={operator.rut} readOnly className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  Correo Electrónico
                </Label>
                <Input id="email" value={user?.email || operator.email} readOnly className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  Teléfono
                </Label>
                <Input id="phone" value={operator.phone} readOnly className="bg-muted/50" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Razón Social</Label>
              <p className="font-medium">{user?.company || operator.company}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Estado</Label>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm">Activo</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Fecha de Registro
              </Label>
              <p className="text-sm">{new Date(operator.createdAt).toLocaleDateString('es-CL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Buses Activos</CardDescription>
            <CardTitle className="text-3xl text-primary">3</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">de 4 registrados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Conductores</CardDescription>
            <CardTitle className="text-3xl text-primary">4</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">todos activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Rutas Configuradas</CardDescription>
            <CardTitle className="text-3xl text-primary">4</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">4 activas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Viajes este Mes</CardDescription>
            <CardTitle className="text-3xl text-primary">48</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
