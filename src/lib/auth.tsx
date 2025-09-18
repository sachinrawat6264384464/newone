// lib/auth.tsx
'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth'
import { auth } from './firebase'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<UserCredential>
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

  const login = async (email: string, password: string): Promise<UserCredential> => {
    // Check if credentials match the admin credentials
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin@gmail.com'
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin@123'
    
    if (email === adminEmail && password === adminPassword) {
      // For demo purposes, we'll use Firebase auth with these credentials
      // In production, you'd want to create this user in Firebase Auth
      try {
        return await signInWithEmailAndPassword(auth, email, password)
      } catch {
        // If user doesn't exist in Firebase, create them or handle accordingly
        throw new Error('Invalid credentials')
      }
    } else {
      throw new Error('Invalid credentials')
    }
  }

  const logout = (): Promise<void> => {
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