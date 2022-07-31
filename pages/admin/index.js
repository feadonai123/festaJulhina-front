/* eslint-disable react-hooks/exhaustive-deps */
import styles from '../../styles/Admin.module.css'
import React, { useState, useEffect } from 'react'
import RequestHelper from '../../utils/RequestHelper'
import Produtos from "../../api/produtos"
import Categories from "../../api/categorias"
import FormProduto from '../../components/formProduto'
import FormCategoria from '../../components/formCategoria'
import EditarProd from '../../components/editarProd'
import EditarCat from '../../components/editCat'
import CadastrarUser from '../../components/cadastrarUser'
import EditarUsers from '../../components/editarUsers'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { useProducts } from '../../hooks/products'
import { useCategories } from '../../hooks/categories'
import { useUser } from '../../hooks/user'

export default function Admin ({ products, categories, user }) {

  const { setUser } = useUser()
  const { setProducts } = useProducts()
  const { setCategories } = useCategories()

  const [ mode, setMode ] = useState("editarProd")

  useEffect(()=>{
    setProducts(products)
    setCategories(categories)
    setUser(user)
  }, [ products, categories, user ])

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
  const handleClickCriarUser = ()=>{
    setMode("criarUser")
  }
  const handleClickEditarUser = ()=>{
    setMode("editarUser")
  }

  return (
    <>
      <Header adminMode={true}/>
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
            <div className={styles.group}>
              <p>Usuários</p>
              <div className={styles.list}>
                <div onClick={handleClickCriarUser} data-selected={mode=="criarUser"} className={mode=="criarUser" ? styles.btnSelected : ""}>Cadastrar usuário</div>
                <div onClick={handleClickEditarUser} data-selected={mode=="editarUser"} className={mode=="editarUser" ? styles.btnSelected : ""}>Editar usuários</div>
              </div>
            </div>
          </div>
          <div className={styles.main}>
            {mode == "criarProd" && <FormProduto/>}
            {mode == "criarCat" && <FormCategoria/>}
            {mode == "editarProd" && <EditarProd products={products}/>}
            {mode == "editarCat" && <EditarCat products={products}/>}
            {mode == "criarUser" && <CadastrarUser />}
            {mode == "editarUser" && <EditarUsers />}

          </div>
          <div className={styles.footer}></div>
        </div>
      </main>
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
  
  if (!userData){
    return {
      redirect: {
        permanent: false,
        destination: `/login`,
      },
      props:{},
    };
  }

  user = {
    ...userData,
    image: process.env.API + userData.image
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