import { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faStore } from '@fortawesome/free-solid-svg-icons'
import { Container, Content, Links } from './styles'
import { useCarrinho } from '../../hooks/carrinho'

export default function HeaderComponent () {

  const { carrinho } = useCarrinho()
  const linkCarrinho = useRef()

  useEffect(()=>{
    const quantity = carrinho.map(product=>product.quantity).reduce((a,b)=>a+b, 0)
    if(quantity > 0) linkCarrinho.current.setAttribute("notify", quantity > 9 ? "9+" : quantity)
    else delete linkCarrinho.current.dataset.notify
  }, [carrinho])

  return (
    <Container>
      <Content>
        <div>
          <h1>HEADER</h1>
        </div>

        <div>
          <Links>
            <a href="/produtos">Produtos <FontAwesomeIcon style={{ height: "1rem", verticalAlign: "middle" }} icon={faStore} /></a>
            <a href="/carrinho" ref={linkCarrinho}>Carrinho <FontAwesomeIcon style={{ height: "1rem", verticalAlign: "middle" }} icon={faCartShopping} /></a>
          </Links>
        </div>
      </Content>
    </Container>
  )
}