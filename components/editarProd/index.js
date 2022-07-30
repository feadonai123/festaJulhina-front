import { useState, useEffect } from 'react'
import { Container, List, Card, IconEdit, Editar, EditarContent, ImgCategorie } from './styles'
import { useProducts } from '../../hooks/products'
import { useCategories } from '../../hooks/categories'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import FormProduto from '../formProduto'

const DEFAULT_IMAGE = "http://localhost:1234/public/images/default.png"

export default function EditarProd () {

  const { products } = useProducts()
  const { categories } = useCategories()
  const [ edit, setEdit ] = useState(null)

  const handleClickEditar = (product)=>{
    document.querySelector("body").style.overflow = "hidden"
    setEdit(product)
  }

  const handleCloseEditar = ()=>{
    document.querySelector("body").style.overflow = ""
    setEdit(null)
  }

  const handleFimEditar = (message)=>{
    alert(message)
    handleCloseEditar()
  }

  return (<Container>
    <List>
      {products.map((product)=><Card key={product._id} onClick={()=>handleClickEditar(product)}>
        <ImgCategorie>
          <img src={ categories.find(cat=>cat._id==product.categorie)?.image || DEFAULT_IMAGE} alt={product.updated_at}></img>
        </ImgCategorie>
        <IconEdit data-animation='heartbeat'><FontAwesomeIcon icon={faPen} /></IconEdit>
        <img src={edit?._id == product._id ? DEFAULT_IMAGE : product.image} alt={product.updated_at}></img>
        <h2>{product.name}</h2>
        <h1>R$ {(+product.value).toFixed(2)}</h1>
      </Card>)}
    </List>
    {edit && <Editar onClick={handleCloseEditar}>
      <EditarContent onClick={(e) =>e.stopPropagation()}>
        <FormProduto product={edit} callback={handleFimEditar}/>
      </EditarContent>
    </Editar>}
  </Container>)
}