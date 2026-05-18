import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CarrinhoProvider } from './context/CarrinhoContext';
import { AuthProvider } from './context/AuthContext';
import ListarProduto from './pages/ListarProduto'
import ListaCompra from './pages/ListaCompra'
import CadastroProduto from './pages/CadastroProduto'
import CadastroCompra from './pages/CadastroCompra' 

import TopContainer from './layout/TopContainer'
import Footer from './layout/Footer'
import Product from './pages/Product'

import Login from './pages/Login'
import Register from './pages/Register'



import PrivateRoute from './components/PrivateRoute'; 

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <CarrinhoProvider>
          <Router>
            
            <TopContainer />
            
            <main className="main-content">
              <Routes>
                {/* Rotas Públicas */}
                <Route path="/produtos" element={<ListarProduto />} />
                <Route path="/produtos/:id" element={<Product />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastre-se" element={<Register />} />
                <Route path="/comprar" element={<CadastroCompra />} />

                {/* Rotas Protegidas */}
                <Route path="/cadastrar" element={
                  <PrivateRoute>
                    <CadastroProduto />
                  </PrivateRoute>
                } />
                
                
                
                <Route path="/listar" element={
                  <PrivateRoute>
                    <ListaCompra />
                  </PrivateRoute>
                } />
              </Routes>
            </main>

            <Footer />
          </Router>
        </CarrinhoProvider>
      </AuthProvider>
    </div>
  )
}

export default App;
