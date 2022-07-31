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
        <div className={styles.menu}>
          <button onClick={handleClickEditarProd} className={mode=="editarProd" ? styles.btnSelected : ""}>EP</button>
          <button onClick={handleClickEditarCat} className={mode=="editarCat" ? styles.btnSelected : ""}>EC</button>
          <button onClick={handleClickCriarProd} className={mode=="criarProd" ? styles.btnSelected : ""}>CP</button>
          <button onClick={handleClickCriarCat} className={mode=="criarCat" ? styles.btnSelected : ""}>CC</button>
        </div>
        <div className={styles.main}>
          {mode == "criarProd" && <FormProduto/>}
          {mode == "criarCat" && <FormCategoria/>}
          {mode == "editarProd" && <EditarProd products={products}/>}
          {mode == "editarCat" && <EditarCat products={products}/>}
        </div>
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