/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import RequestHelper from '../utils/RequestHelper'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/header'
import Footer from '../components/footer'
import styles from '../styles/Carrinho.module.css'
import GenericList from '../components/genericList'
import CardCarrinho from '../components/cardCarrinho'

import Produtos from "../api/produtos"
import Categories from "../api/categorias"

import { useCarrinho } from '../hooks/carrinho'
import { useCategories } from '../hooks/categories'
import { useUser } from '../hooks/user'
import { useProducts } from '../hooks/products'

export default function Home ({ products, categories, user }) {

  const router = useRouter()
  const { setUser } = useUser()
  const { carrinho } = useCarrinho()
  const { setProducts } = useProducts()
  const { setCategories } = useCategories()

  useEffect(()=>{
    setUser(user)
    setProducts(products)
    setCategories(categories)
  }, [ products, categories, user ])

  return (
    <>
      <Header/>
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
      <Footer/>
    </>
  )
}


export async function getServerSideProps (context) {
  let products = [], categories = [], user = null;
  
  const 
    token = context.req.cookies['token'],
    responseCheckToken = await RequestHelper.post(`http://${context.req.headers.host}/api/auth/checkToken`, { token }),
    userData = responseCheckToken && responseCheckToken.success && responseCheckToken?.data ? responseCheckToken.data : null
  
  if(userData){
    user = {
      ...userData,
      image: process.env.API + userData.image
    }
  }
  
  const productsResponse = await Produtos.getAll()
  const categoriesResponse = await Categories.getAll()

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

  return { props: { products, categories, user } }
}