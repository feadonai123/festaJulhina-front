
import { useEffect, useState } from 'react'
import { Content, Main, Collapse, ButtonsCollapse } from './styles'
import { useProducts } from "../../hooks/products"
import { useCarrinho } from "../../hooks/carrinho"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons'


const CardCarrinho = ({ index, ...props })=>{

  const { products } = useProducts()
  const { carrinho, addCarrinho, deleteCarrinho } = useCarrinho()

  const [ product, setProduct ] = useState()
  const [ collapse, setCollapse ] = useState(false)

  useEffect(()=>{
    const productData = products.find(product=>product._id == carrinho[index].productId)
    setProduct(productData)
  }, [])


  const handleCollapse = ()=>{
    setCollapse(!collapse)
  }

  const handleAddItem = (quantity)=>{
    let newItem = {...carrinho[index]}
    newItem.quantity = quantity
    addCarrinho(newItem)
  }

  const handleDeleteItem =()=>{
    deleteCarrinho(carrinho[index].productId)
  }

  return (
    <Content {...props} onClick={handleCollapse}>
      <Main>
        <div style={{ justifyContent: "flex-start" }}>
          <img src={product?.image} alt={product?.updated_at}></img>
          <h2>{product?.name}</h2>
        </div>
        <div style={{ justifyContent: "center" }}>
          <h2>R$ {(+product?.value).toFixed(2)}</h2>
        </div>
        <div style={{ justifyContent: "flex-end" }}>
          <h2>{carrinho[index].quantity}x</h2>
        </div>
      </Main>
      <Collapse collapse={collapse}>
        <label>{product?.description}</label>
        <ButtonsCollapse>
          <div>
            <button onClick={(e)=>{
              e.stopPropagation()
              handleAddItem(1)}
            }><FontAwesomeIcon icon={faPlus} height="100%"/></button>
            <button onClick={(e)=>{
              e.stopPropagation()
              handleAddItem(-1)
            }}><FontAwesomeIcon icon={faMinus} height="100%"/></button>
          </div>
          <button onClick={(e)=>{
            e.stopPropagation()
            handleDeleteItem()
          }}><FontAwesomeIcon icon={faTrash} height="100%"/></button>
        </ButtonsCollapse>
      </Collapse>
    </Content>
  )

}

export default CardCarrinho