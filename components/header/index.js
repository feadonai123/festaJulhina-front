import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faStore, faBars, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { Container, Content, Links, MenuIcon } from './styles'
import { useCarrinho } from '../../hooks/carrinho'
import { useUser } from '../../hooks/user'

export default function HeaderComponent ({ adminMode = false}) {

  const { user, logout } = useUser()
  const { carrinho } = useCarrinho()
  const linkCarrinho = useRef()
  const menuIcon = useRef()

  const [ collapse, setCollapse] = useState(false)

  useEffect(()=>{
    if(adminMode) return
    const 
      quantity = carrinho.map(product=>product.quantity).reduce((a,b)=>a+b, 0),
      quantityMap = quantity > 9 ? "9+" : quantity

    if(quantity > 0) {
      linkCarrinho.current.setAttribute("notify", quantityMap)
      menuIcon.current.setAttribute("notify", quantityMap)
    }
    else {
      delete linkCarrinho.current.dataset.notify
      delete menuIcon.current.dataset.notify
    }
  }, [carrinho])

  const handleClickCollapse= ()=>{
    setCollapse(!collapse)
  }

  return (
    <Container>
      <Content collapse={collapse}>
        <div>
          <h3>HEADER</h3>
          <MenuIcon>
            <button ref={menuIcon} onClick={handleClickCollapse}><FontAwesomeIcon style={{ height: "1rem", verticalAlign: "middle" }} icon={faBars} /></button>
          </MenuIcon>
        </div>

        <div>
          <Links>
            { user && <a style={{ paddingLeft: 0 }}><img src={user.image}></img> {user.username}</a> }
            { user && <a onClick={logout}>Logout <FontAwesomeIcon style={{ height: "1rem", verticalAlign: "middle" }} icon={faArrowRightToBracket} /></a> }
            { !user && <a href="/login">Login <FontAwesomeIcon style={{ height: "1rem", verticalAlign: "middle" }} icon={faArrowRightToBracket} /></a>}
            {!adminMode && <a href="/produtos">Produtos <FontAwesomeIcon style={{ height: "1rem", verticalAlign: "middle" }} icon={faStore} /></a>}
            {!adminMode && <a href="/carrinho" ref={linkCarrinho}>Carrinho <FontAwesomeIcon style={{ height: "1rem", verticalAlign: "middle" }} icon={faCartShopping} /></a>}
          </Links>
        </div>
      </Content>
    </Container>
  )
}