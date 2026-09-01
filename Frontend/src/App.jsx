import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <AppRouter />
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;