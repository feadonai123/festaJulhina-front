import { useState, useEffect } from 'react'
import { Container, List, Card, IconEdit, Editar, EditarContent } from './styles'
import { useCategories } from '../../hooks/categories'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import FormCategoria from '../formCategoria'

const DEFAULT_IMAGE = "http://localhost:1234/public/images/default.png"

export default function EditarCat () {

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
      {categories.map((categorie)=><Card key={categorie._id} onClick={()=>handleClickEditar(categorie)}>
        <IconEdit data-animation='heartbeat'><FontAwesomeIcon icon={faPen} /></IconEdit>
        <img src={edit?._id == categorie._id ? DEFAULT_IMAGE : categorie.image} alt={categorie.updated_at}></img>
        <h2>{categorie.name}</h2>
      </Card>)}
    </List>
    {edit && <Editar onClick={handleCloseEditar}>
      <EditarContent onClick={(e) =>e.stopPropagation()}>
        <FormCategoria categorie={edit} callback={handleFimEditar}/>
      </EditarContent>
    </Editar>}
  </Container>)
}