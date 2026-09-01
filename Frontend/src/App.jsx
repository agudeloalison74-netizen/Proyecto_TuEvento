import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";

function App() {

  return (

    <AuthProvider>

      <Navbar />

      <AppRoutes />

    </AuthProvider>

  );

}

export default App;