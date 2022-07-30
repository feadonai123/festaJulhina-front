import { useEffect, useState } from 'react'
import { Container, Content, ImageContent, DetailsContent, Separator, QuantidadeContent, ButtonCartShopping } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useCarrinho } from '../../hooks/carrinho'

export default function ProductDetails ({ product }) {

  const { addCarrinho } = useCarrinho()
  const [quantidade, setQuantidade] = useState(1)

  const clearStates = ()=>{ setQuantidade(1) }
  const handleClickAddQuantidade = (quant)=>{ setQuantidade(Math.max(quantidade + quant, 1)) }

  const handleAddCarrinho = ()=>{
    addCarrinho({
      productId: product._id,
      quantity: quantidade
    })
    clearStates()
    alert(`${quantidade} ${product.name}(s) adicionado(s) ao carrinho`)
  }

  return (
    <Container>
      <Content>
        <ImageContent>
          <img src={product.image}></img>
        </ImageContent>
        <DetailsContent>
          <h2>{product.name}</h2>
          <Separator/>
          <h1>R$ {product.value}</h1>
          <p style={{ fontSize: "0.9rem" }}>{product.description}</p>

          <QuantidadeContent >
            <div><p>Quantidade: </p></div>
            <div><button onClick={()=>handleClickAddQuantidade(-1)}><FontAwesomeIcon icon={faMinus} height="100%"/></button></div>
            <div><h1>{quantidade}</h1></div>
            <div><button onClick={()=>handleClickAddQuantidade(1)}><FontAwesomeIcon icon={faPlus} height="100%"/></button></div>
          </QuantidadeContent>
          <ButtonCartShopping onClick={handleAddCarrinho}>Adicionar ao carrinho <FontAwesomeIcon icon={faCartShopping}  style={{ height: "1rem", verticalAlign: "middle" }}/></ButtonCartShopping>
        </DetailsContent>
      </Content>
    </Container>
  )
}