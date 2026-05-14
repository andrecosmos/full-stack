
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

function App() {
  

  return (
    <div className="app">
      <CarrinhoProvider>
       
     <Router>
        <Navbar />

        <Routes>
          <Route path="/produtos"   element={<ListarProduto />} />
          <Route path="/cadastrar"  element={<CadastroProduto />} />
          <Route path="/comprar"    element={<CadastroCompra />} />
          <Route path="/listar"     element={<ListaCompra />} />
          <Route path="/produtos/:id"        element={<Product />} />
        </Routes>

       <Footer />
      </Router>
      
      </CarrinhoProvider>
   </div>
  )
}

export default App
