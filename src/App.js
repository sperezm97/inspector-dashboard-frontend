// ** Router Import
import { AuthProvider } from './contexts/auth/authProvider'
import Router from './router/Router'

const App = function() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App
