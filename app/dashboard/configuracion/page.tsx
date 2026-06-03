'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { 
  Bell, 
  Shield, 
  Palette,
  Globe,
  Save
} from 'lucide-react'
import { toast } from 'sonner'

export default function ConfiguracionPage() {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    trips: true,
    maintenance: true,
    reports: false
  })

  const handleSave = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    toast.success('Configuración guardada')
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">Administra las preferencias de tu cuenta</p>
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Cuenta y Seguridad
          </CardTitle>
          <CardDescription>Gestiona tu información de cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" defaultValue={user?.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input id="company" defaultValue={user?.company} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" type="tel" placeholder="+56 9 1234 5678" />
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h4 className="font-medium">Cambiar Contraseña</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contraseña Actual</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input id="newPassword" type="password" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notificaciones
          </CardTitle>
          <CardDescription>Configura cómo recibir alertas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificaciones por Email</p>
              <p className="text-sm text-muted-foreground">Recibe actualizaciones en tu correo</p>
            </div>
            <Switch 
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de Viajes</p>
              <p className="text-sm text-muted-foreground">Notificaciones de viajes programados</p>
            </div>
            <Switch 
              checked={notifications.trips}
              onCheckedChange={(checked) => setNotifications({ ...notifications, trips: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Recordatorios de Mantenimiento</p>
              <p className="text-sm text-muted-foreground">Alertas de mantenimiento de flota</p>
            </div>
            <Switch 
              checked={notifications.maintenance}
              onCheckedChange={(checked) => setNotifications({ ...notifications, maintenance: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Reportes Semanales</p>
              <p className="text-sm text-muted-foreground">Resumen semanal de producción</p>
            </div>
            <Switch 
              checked={notifications.reports}
              onCheckedChange={(checked) => setNotifications({ ...notifications, reports: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Preferencias
          </CardTitle>
          <CardDescription>Personaliza tu experiencia</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Idioma</p>
                <p className="text-sm text-muted-foreground">Español (Chile)</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Cambiar</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Tema</p>
                <p className="text-sm text-muted-foreground">Oscuro</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Cambiar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>
    </div>
  )
}
