/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Header from '../components/header'
import Footer from '../components/footer'
import RequestHelper from '../utils/RequestHelper'
import Produtos from '../api/produtos'
import Categories from '../api/categorias'
import { useProducts } from '../hooks/products'
import { useCategories } from '../hooks/categories'
import { useUser } from '../hooks/user'

export default function Home ({ products, categories, user }) {
  
  const { setUser } = useUser()
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
        Index
      </div>
      <Footer/>
    </>
  )
}


export async function getServerSideProps (context) {
  let products = [], categories = [], user = null
  
  const 
    token = context.req.cookies['token'],
    responseCheckToken = await RequestHelper.post(`http://${context.req.headers.host}/api/auth/checkToken`, { token }),
    userData = responseCheckToken && responseCheckToken.success && responseCheckToken?.data ? responseCheckToken.data : undefined
  
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