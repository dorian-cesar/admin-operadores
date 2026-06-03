import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bus, Users, MapPin, BarChart3, Shield, Zap, Clock, CheckCircle2 } from 'lucide-react'

export function LandingHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">

        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
          <span className="text-foreground">Gestion integral de transporte</span>
          <br />
          <span className="text-primary">OLA SpA</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 italic">
          {'"Los mejores buses del País"'}
        </p>
        
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
          Únete a la red de operadores de transporte más avanzada. Gestiona tus rutas, 
          mantén el control de tu flota y eleva el estándar de viaje.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/registro">
            <Button size="lg" className="text-lg px-8 py-6">
              Quiero ser Operador
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Conocer más
            </Button>
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Operadores</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">2,000+</div>
            <div className="text-sm text-muted-foreground">Buses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">50K+</div>
            <div className="text-sm text-muted-foreground">Viajes/mes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function LandingFeatures() {
  const features = [
    {
      icon: Bus,
      title: 'Gestión de Flota',
      description: 'Administra todos tus buses en un solo lugar. Control de mantenimiento, documentación y estado en tiempo real.'
    },
    {
      icon: Users,
      title: 'Control de Tripulación',
      description: 'Gestiona conductores, licencias, turnos y disponibilidad de forma eficiente y centralizada.'
    },
    {
      icon: MapPin,
      title: 'Rutas y Asignaciones',
      description: 'Crea rutas, programa viajes y asigna recursos de manera dinámica y optimizada.'
    },
    {
      icon: BarChart3,
      title: 'Indicadores KPI',
      description: 'Dashboard completo con métricas de rendimiento, ingresos y análisis de productividad.'
    },
    {
      icon: Shield,
      title: 'Multi-tenant Seguro',
      description: 'Cada operador tiene su espacio aislado y seguro. Datos protegidos y encriptados.'
    },
    {
      icon: Zap,
      title: 'Tiempo Real',
      description: 'Actualizaciones instantáneas del estado de viajes, producción y alertas del sistema.'
    }
  ]

  return (
    <section id="features" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            Características
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Todo lo que necesitas para gestionar tu operación
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Una plataforma completa diseñada específicamente para operadores de transporte de pasajeros.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function LandingPricing() {
  const plans = [
    {
      name: 'Starter',
      price: '49.990',
      description: 'Ideal para operadores pequeños',
      features: [
        'Hasta 5 buses',
        'Hasta 10 conductores',
        'Gestión de rutas básica',
        'Dashboard de indicadores',
        'Soporte por email'
      ]
    },
    {
      name: 'Professional',
      price: '99.990',
      description: 'Para operadores en crecimiento',
      features: [
        'Hasta 20 buses',
        'Hasta 40 conductores',
        'Rutas ilimitadas',
        'Dashboard avanzado',
        'Reportes personalizados',
        'Soporte prioritario',
        'API access'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Consultar',
      description: 'Solución a medida',
      features: [
        'Buses ilimitados',
        'Conductores ilimitados',
        'Funcionalidades custom',
        'Integraciones dedicadas',
        'SLA garantizado',
        'Account manager',
        'Training incluido'
      ]
    }
  ]

  // return (
  //   <section id="pricing" className="py-24">
  //     <div className="container mx-auto px-4">
  //       <div className="text-center mb-16">
  //         <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
  //           Precios
  //         </Badge>
  //         <h2 className="text-3xl md:text-4xl font-bold mb-4">
  //           Planes que se adaptan a tu operación
  //         </h2>
  //         <p className="text-muted-foreground max-w-2xl mx-auto">
  //           Sin contratos a largo plazo. Cancela cuando quieras.
  //         </p>
  //       </div>

  //       <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
  //         {plans.map((plan, index) => (
  //           <Card 
  //             key={index} 
  //             className={`relative ${plan.popular ? 'border-primary shadow-lg shadow-primary/10' : 'bg-card/50 border-border/50'}`}
  //           >
  //             {plan.popular && (
  //               <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
  //                 Más Popular
  //               </Badge>
  //             )}
  //             <CardHeader className="text-center pb-2">
  //               <CardTitle className="text-xl">{plan.name}</CardTitle>
  //               <CardDescription>{plan.description}</CardDescription>
  //               <div className="mt-4">
  //                 <span className="text-4xl font-bold">
  //                   {plan.price === 'Consultar' ? '' : '$'}
  //                   {plan.price}
  //                 </span>
  //                 {plan.price !== 'Consultar' && (
  //                   <span className="text-muted-foreground">/mes</span>
  //                 )}
  //               </div>
  //             </CardHeader>
  //             <CardContent>
  //               <ul className="space-y-3">
  //                 {plan.features.map((feature, i) => (
  //                   <li key={i} className="flex items-center gap-2 text-sm">
  //                     <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
  //                     <span>{feature}</span>
  //                   </li>
  //                 ))}
  //               </ul>
  //               <Link href="/registro" className="block mt-6">
  //                 <Button 
  //                   className="w-full" 
  //                   variant={plan.popular ? 'default' : 'outline'}
  //                 >
  //                   {plan.price === 'Consultar' ? 'Contactar Ventas' : 'Comenzar Ahora'}
  //                 </Button>
  //               </Link>
  //             </CardContent>
  //           </Card>
  //         ))}
  //       </div>
  //     </div>
  //   </section>
  // )
}

export function LandingCTA() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <Clock className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comienza en minutos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Registra tu empresa, agrega tu flota y comienza a gestionar tu operación 
              de transporte de forma profesional. Sin instalaciones, sin complicaciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/registro">
                <Button size="lg" className="text-lg px-8">
                  Crear Cuenta Gratis
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Ya tengo cuenta
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Prueba gratis por 14 días. No requiere tarjeta de crédito.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
