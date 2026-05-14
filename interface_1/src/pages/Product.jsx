import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Produtc.module.css'
import { Adicionar_carrinho } from '../functions/Adicionar_carrinho'

function Product() {
  const { id } = useParams()
  const [produto, setProduto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function buscarProduto() {
      try {
        const response = await fetch('http://localhost:3000/produtos')
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos')
        }

        const produtos = await response.json()
        const produtoEncontrado = produtos.find((item) => String(item.id) === String(id))

        if (!produtoEncontrado) {
          throw new Error('Produto não encontrado')
        }

        setProduto(produtoEncontrado)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    buscarProduto()
  }, [id])

  if (loading) {
    return <div>Carregando produto...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.imageBox}>
        <img
          src={produto.imagem || '/placeholder.png'}
          alt={produto.nome}
        />
      </div>

      <div className={styles.info}>
        <h1>{produto.nome}</h1>
        <p className={styles.price}>R$ {produto.preco}</p>
        {produto.descricao && <p>{produto.descricao}</p>}

        <div >
          <button className={styles.buttons} onClick={() => navigate('/produtos')}>
            Continuar Comprando
          </button>
          <button className={styles.buttons} onClick={() => navigate('/comprar')}>
            Ir para o Carrinho
          </button>
          <Adicionar_carrinho produto={produto} />
        </div>
      </div>
    </div>
  )
}

export default Product