'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AuthUser } from './types'
import { mockOperators } from './mock-data'

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, company: string, password: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'olaspa_auth_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Mock validation - in production this would be a real API call
    const operator = mockOperators.find(op => op.email === email)
    
    if (operator && password.length >= 6) {
      const authUser: AuthUser = {
        id: operator.id,
        operatorId: operator.id,
        name: operator.name,
        email: operator.email,
        company: operator.company
      }
      setUser(authUser)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser))
      return true
    }
    
    // Allow demo login
    if (email === 'demo@olaspa.cl' && password === 'demo123') {
      const demoUser: AuthUser = {
        id: 'demo-1',
        operatorId: 'op-1',
        name: 'Usuario Demo',
        email: 'demo@olaspa.cl',
        company: 'Empresa Demo SpA'
      }
      setUser(demoUser)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser))
      return true
    }
    
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const register = async (name: string, email: string, company: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock registration - in production this would create the user in DB
    if (name && email && company && password.length >= 6) {
      const newUser: AuthUser = {
        id: `op-${Date.now()}`,
        operatorId: `op-${Date.now()}`,
        name,
        email,
        company
      }
      setUser(newUser)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
      return true
    }
    
    return false
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
