// lib/auth.tsx
'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth'
import { auth } from './firebase'

// Define a type for the mock user
interface MockUser {
  uid: string
  email: string
  displayName: string
  emailVerified: boolean
}

// Define a type for the mock credential
interface MockCredential {
  user: MockUser
  operationType: string
  providerId: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<UserCredential | MockCredential>
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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string): Promise<UserCredential | MockCredential> => {
    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()

    // Admin credentials (env or fallback)
    const adminEmail = (process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin@gmail.com').trim().toLowerCase()
    const adminPassword = (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin@123').trim()
    
    const isDefaultAdmin = (cleanEmail === adminEmail || cleanEmail === 'admin') && cleanPassword === adminPassword

    if (isDefaultAdmin) {
      console.log('Admin credentials detected, using admin session')
      
      // Create a mock user object for admin session
      const mockUser: MockUser = {
        uid: 'demo-admin-uid',
        email: cleanEmail,
        displayName: 'Home Storey Admin',
        emailVerified: true
      }
      
      // Set the user state manually
      setUser(mockUser as User)
      
      // Return a mock credential object
      return Promise.resolve({
        user: mockUser,
        operationType: 'signIn',
        providerId: 'password'
      } as MockCredential)
    } 
    
    // For non-demo credentials, try Firebase authentication
    try {
      return await signInWithEmailAndPassword(auth, cleanEmail, password)
    } catch (error: any) {
      console.warn('Firebase authentication failed:', error?.code || error)
      const code = error?.code || ''
      let userFriendlyMessage = 'Invalid email or password. Please try again.'
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        userFriendlyMessage = 'Invalid credentials. For admin access, use admin@gmail.com / admin@123'
      } else if (code === 'auth/invalid-email') {
        userFriendlyMessage = 'Invalid email address format.'
      } else if (code === 'auth/too-many-requests') {
        userFriendlyMessage = 'Too many failed login attempts. Please try again later.'
      } else if (error?.message) {
        userFriendlyMessage = error.message
      }
      throw new Error(userFriendlyMessage)
    }
  }

  const logout = async (): Promise<void> => {
    // Handle demo user logout
    if (user && (user as MockUser).uid === 'demo-admin-uid') {
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
      {children}
    </AuthContext.Provider>
  )
}