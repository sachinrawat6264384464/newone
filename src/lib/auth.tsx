// lib/auth.tsx
'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth'
import { auth } from './firebase'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<UserCredential | { user: any }>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string): Promise<UserCredential | { user: any }> => {
    // Demo credentials
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin@gmail.com'
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin@123'
    
    if (email === adminEmail && password === adminPassword) {
      console.log('Demo credentials detected, bypassing Firebase auth')
      
      // Create a mock user object for demo purposes
      const mockUser = {
        uid: 'demo-admin-uid',
        email: adminEmail,
        displayName: 'Demo Admin',
        emailVerified: true
      }
      
      // Set the user state manually for demo
      setUser(mockUser as User)
      
      // Return a mock credential object
      return Promise.resolve({
        user: mockUser,
        operationType: 'signIn',
        providerId: 'password'
      } as any)
    } 
    
    // For non-demo credentials, try Firebase authentication
    try {
      return await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Firebase authentication failed:', error)
      throw new Error('Invalid credentials')
    }
  }

  const logout = async (): Promise<void> => {
    // Handle demo user logout
    if (user && (user as any).uid === 'demo-admin-uid') {
      setUser(null)
      return Promise.resolve()
    }
    
    // Regular Firebase logout
    return signOut(auth)
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}