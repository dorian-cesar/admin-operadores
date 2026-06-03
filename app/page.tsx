import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LandingHero, LandingFeatures, LandingPricing, LandingCTA } from '@/components/landing/sections'
import { AuthProvider } from '@/lib/auth-context'

export default function Home() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <LandingHero />
          <LandingFeatures />
          <LandingPricing />
          <LandingCTA />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
