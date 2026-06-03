'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  FileQuestion, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Send
} from 'lucide-react'
import { toast } from 'sonner'

interface Ticket {
  id: string
  subject: string
  status: 'open' | 'in_progress' | 'resolved'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  lastUpdate: string
}

const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    subject: 'Problema al generar reporte de producción',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-06-10',
    lastUpdate: '2024-06-12'
  },
  {
    id: 'TKT-002',
    subject: 'Consulta sobre integración con sistema externo',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-06-05',
    lastUpdate: '2024-06-08'
  }
]

export default function SoportePage() {
  const [tickets] = useState<Ticket[]>(mockTickets)
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success('Ticket creado correctamente', {
      description: 'Nuestro equipo te contactará pronto'
    })
    
    setFormData({
      subject: '',
      category: '',
      priority: 'medium',
      description: ''
    })
    setIsSubmitting(false)
  }

  const getStatusBadge = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Abierto</Badge>
      case 'in_progress':
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">En Proceso</Badge>
      case 'resolved':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Resuelto</Badge>
    }
  }

  const getPriorityBadge = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline">Baja</Badge>
      case 'medium':
        return <Badge variant="outline" className="border-yellow-500/50 text-yellow-500">Media</Badge>
      case 'high':
        return <Badge variant="outline" className="border-red-500/50 text-red-500">Alta</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Centro de Soporte</h1>
        <p className="text-muted-foreground">Obtén ayuda y contacta a nuestro equipo de soporte</p>
      </div>

      {/* Contact Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Teléfono</CardTitle>
                <CardDescription>Lun-Vie 9:00-18:00</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-lg">+56 2 2345 6789</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Email</CardTitle>
                <CardDescription>Respuesta en 24h</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-lg">soporte@olaspa.cl</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Chat en Vivo</CardTitle>
                <CardDescription>Disponible ahora</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Iniciar Chat</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* New Ticket Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileQuestion className="h-5 w-5 text-primary" />
              Crear Nuevo Ticket
            </CardTitle>
            <CardDescription>Describe tu problema o consulta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  id="subject"
                  placeholder="Resumen breve del problema"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Problema Técnico</SelectItem>
                      <SelectItem value="billing">Facturación</SelectItem>
                      <SelectItem value="feature">Solicitud de Función</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe tu problema o consulta en detalle..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Ticket
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Ticket History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Mis Tickets
            </CardTitle>
            <CardDescription>Historial de solicitudes de soporte</CardDescription>
          </CardHeader>
          <CardContent>
            {tickets.length > 0 ? (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-muted-foreground">{ticket.id}</span>
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                        <p className="font-medium">{ticket.subject}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Creado: {new Date(ticket.createdAt).toLocaleDateString('es-CL')}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">Ver</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No tienes tickets abiertos</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Preguntas Frecuentes</CardTitle>
          <CardDescription>Respuestas a las consultas más comunes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                q: '¿Cómo agrego un nuevo bus a mi flota?',
                a: 'Ve a Flota > Agregar Bus y completa los datos del vehículo.'
              },
              {
                q: '¿Cómo genero un reporte de producción?',
                a: 'En Producción puedes filtrar y exportar los datos económicos.'
              },
              {
                q: '¿Puedo asignar múltiples conductores a un viaje?',
                a: 'Sí, puedes asignar un conductor principal y un co-conductor.'
              },
              {
                q: '¿Cómo cambio mi plan de suscripción?',
                a: 'Contacta a nuestro equipo de ventas para actualizar tu plan.'
              }
            ].map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/50">
                <p className="font-medium flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  {faq.q}
                </p>
                <p className="text-sm text-muted-foreground mt-2 ml-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
