
import './App.css'
import ListarProduto from './pages/ListarProduto'
import ListaCompra from './pages/ListaCompra'
import CadastroProduto from './pages/CadastroProduto'
import CadastroCompra from './pages/CadastroCompra' 
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Navbar from './layout/Navibar'
import Footer from './layout/Footer'
import Product from './pages/Product'
import { CarrinhoProvider } from './context/CarrinhoContext';
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from './context/AuthContext';
function App() {
  

  return (
    <div className="app">
      <AuthProvider>
      <CarrinhoProvider>
       
     <Router>
        <Navbar />

        <Routes>
          <Route path="/produtos"   element={<ListarProduto />} />
          <Route path="/cadastrar"  element={<CadastroProduto />} />
          <Route path="/comprar"    element={<CadastroCompra />} />
          <Route path="/listar"     element={<ListaCompra />} />
          <Route path="/produtos/:id"        element={<Product />} />
          <Route path="/login"    element={<Login/>} />
          <Route path="/cadastre-se" element={<Register />} />
        </Routes>

       <Footer />
      </Router>
      
      </CarrinhoProvider>
      </AuthProvider>
   </div>
  )
}

export default App
