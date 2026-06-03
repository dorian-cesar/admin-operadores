import Link from 'next/link'
import { Bus, Globe, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Bus className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-primary">OLA</span>
                <span className="text-foreground"> SpA</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Gestión integral de transporte para operadores de buses en Chile.
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="mailto:contacto@olaspa.cl" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                contacto@olaspa.cl
              </a>
              <a href="tel:+56912345678" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                +56 9 1234 5678
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Santiago, Chile
              </span>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold">Producto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#features" className="hover:text-primary transition-colors">Características</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors">Precios</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Integraciones</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">API</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Nosotros</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Carreras</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Términos de Servicio</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Política de Privacidad</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookies</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Seguridad</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              2024 OLA SpA. Todos los derechos reservados.
            </p>
            <p className="text-sm text-muted-foreground">
              Hecho con amor en Chile
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
