import styles from '../../styles/Admin.module.css'
import React, { useState, useEffect } from 'react'
import Produtos from "../../api/produtos"
import Categories from "../../api/categorias"
import FormProduto from '../../components/formProduto'
import FormCategoria from '../../components/formCategoria'
import EditarProd from '../../components/editarProd'
import EditarCat from '../../components/editCat'
import { useProducts } from '../../hooks/products'
import { useCategories } from '../../hooks/categories'

export default function Admin ({ products, categories }) {

  const { setProducts } = useProducts()
  const { setCategories } = useCategories()

  const [ mode, setMode ] = useState("editarProd")

  useEffect(()=>{
    setProducts(products)
    setCategories(categories)
  }, [ products, setProducts, categories, setCategories ])

  const handleClickEditarProd = ()=>{
    setMode("editarProd")
  }

  const handleClickEditarCat = ()=>{
    setMode("editarCat")
  }

  const handleClickCriarProd = ()=>{
    setMode("criarProd")
  }

  const handleClickCriarCat = ()=>{
    setMode("criarCat")
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}></div>
        <div className={styles.nav}>
          <div className={styles.group}>
            <p>Edição</p>
            <div className={styles.list}>
              <div onClick={handleClickEditarProd} data-selected={mode=="editarProd"} className={mode=="editarProd" ? styles.btnSelected : ""}>Editar Produtos</div>
              <div onClick={handleClickEditarCat} data-selected={mode=="editarCat"}  className={mode=="editarCat" ? styles.btnSelected : ""}>Editar Categorias</div>
            </div>
          </div>
          <div className={styles.group}>
            <p>Criação</p>
            <div className={styles.list}>
              <div onClick={handleClickCriarProd} data-selected={mode=="criarProd"} className={mode=="criarProd" ? styles.btnSelected : ""}>Criar Produtos</div>
              <div onClick={handleClickCriarCat} data-selected={mode=="criarCat"} className={mode=="criarCat" ? styles.btnSelected : ""}>Criar Categorias</div>
            </div>
          </div>
        </div>
        <div className={styles.main}>
          {mode == "criarProd" && <FormProduto/>}
          {mode == "criarCat" && <FormCategoria/>}
          {mode == "editarProd" && <EditarProd products={products}/>}
          {mode == "editarCat" && <EditarCat products={products}/>}
        </div>
        <div className={styles.footer}></div>
      </div>
    </main>
  )
}

export async function getStaticProps () {
  let products = [], categories = []
  const productsResponse = await Produtos.getAll()
  const categoriesResponse = await Categories.getAll()

  // TODO ver o q acontece quando da falha
  if(!productsResponse.success || !categoriesResponse.success){}
  else {
    categories = categoriesResponse.data.map(cat=>{
      return{
        ...cat,
        image: process.env.API + cat.image
      }
    })
    products = productsResponse.data.map(prod=>{
      return{
        ...prod,
        image: process.env.API + prod.image
      }
    })
  }

  return { props: { products, categories }, revalidate: 10 }
}