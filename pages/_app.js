import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth)

  if (!user) return <Login /> // Login Component to be builtin

  return <Component {...pageProps} />
}

export default MyApp
