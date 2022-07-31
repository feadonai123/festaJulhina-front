/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styles from '../styles/Products.module.css'
import Produtos from '../api/produtos'
import Categories from '../api/categorias'
import ReactModal from 'react-modal'
import ProductDetails from "../components/productDetails"
import { useProducts } from "../hooks/products"
import { useCategories } from "../hooks/categories"

ReactModal.setAppElement('#__next');

export default function Products ({ products, categories }) {

  const [ productsShow, setProductsShow ] = useState([])
  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  const [ productSelected, setProductSelected] = useState()

  const { setProducts } = useProducts()
  const { setCategories } = useCategories()

  useEffect(()=>{
    setProducts(products)
    setCategories(categories)
  }, [ products, setProducts, categories, setCategories ])

  useEffect(()=>{
    filterProducts()
  }, [])

  const filterProducts = (id)=>{
    let productsTemp = []
    if(id) productsTemp = products.filter(product=>product.categorie == id)
    else productsTemp = products
    setProductsShow(productsTemp)
  }

  const handleClickCategoria = (id = null)=>{
    filterProducts(id)
  }

  const handleClickProduto = (product)=>{
    setProductSelected(product)
    handleOpenModal()
  }

  const handleOpenModal = ()=>{
    document.querySelector("body").style.overflow = "hidden"
    setModalIsOpen(true)
  }
  
  const handlCloseModal = ()=>{
    document.querySelector("body").style.overflow = ""
    setModalIsOpen(false)
  }
  
  return (
    <main className={styles.container}>
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={()=>{}}
        onRequestClose={handlCloseModal}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="overlay-modal"
      >
        <ProductDetails product={productSelected}/>
      </ReactModal>
      <div className={styles.content}>
        <div className={styles.header}>
          Lista de produtos
        </div>
        <div className={styles.nav}>
          <p>Categorias</p>
          <div className={styles.list}>
            <div onClick={()=>handleClickCategoria()}>Todas</div>
            {categories.map(cat=><div key={cat._id} data-id={cat._id} onClick={(e)=>handleClickCategoria(e.target.dataset.id)}>{cat.name}</div>)}
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.listProducts}>
            {productsShow.map(product=><div key={product._id} className={styles.card} data-id={product._id} onClick={(e)=>handleClickProduto(product)}>
              <img src={product.image} alt={product.updated_at}></img>
              <h2>{product.name}</h2>
              <h1>R$ {(+product.value).toFixed(2)}</h1>
            </div>)}
          </div>
        </div>
        <div className={styles.footer}>
          <br></br>
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
    categories = categoriesResponse.data
    products = productsResponse.data.map(prod=>{
      return{
        ...prod,
        image: process.env.API + prod.image
      }
    })
  }

  return { props: { products, categories }, revalidate: 10 }
}