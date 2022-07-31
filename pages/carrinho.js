import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Carrinho.module.css'
import GenericList from '../components/genericList'
import CardCarrinho from '../components/cardCarrinho'

import Produtos from "../api/produtos"
import Categories from "../api/categorias"

import { useCarrinho } from '../hooks/carrinho'
import { useCategories } from '../hooks/categories'
import { useProducts } from '../hooks/products'

export default function Home ({ products, categories }) {

  const router = useRouter()
  const { carrinho } = useCarrinho()
  const { setProducts } = useProducts()
  const { setCategories } = useCategories()

  useEffect(()=>{
    setProducts(products)
    setCategories(categories)
  }, [ products, setProducts, categories, setCategories ])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.carrinhoContent}>
          <div className={styles.carrinhoList}>
            <GenericList>
              { carrinho.map((item, index)=>(
                <CardCarrinho index={index} key={index}/>
              ))}
            </GenericList>
          </div>
          <button className={styles.buttonAdicionar} onClick={()=>router.push("/produtos")}>Adicionar mais itens ao carrinho <FontAwesomeIcon style={{ height: "1rem", verticalAlign: "middle" }} icon={faStore} /></button>
        </div>
        <button disabled={!carrinho || carrinho.length == 0} className={styles.btnPagar}>Avançar para pagamento</button>
      </div>
    </div>
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