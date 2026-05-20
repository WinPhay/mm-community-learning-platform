import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

import { supabase } from "../lib/supabase"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthReady, setIsAuthReady] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setIsAuthReady(true)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null)
        setIsAuthReady(true)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function signIn(email, password) {
    return supabase.auth.signInWithPassword({
      email,
      password
    })
  }

  async function signUp(email, password) {
    return supabase.auth.signUp({
      email,
      password
    })
  }

  async function signOut() {
    return supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthReady,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
