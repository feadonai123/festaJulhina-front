import React, { createContext, useState, useContext } from 'react';

const ProductsContext = createContext();

const API = "http://localhost:1234"

const ProductsProvider = ({ children }) => {

  const [ products, setProducts ] = useState([])

  const addProduct = (data)=>{
    const newData = {
      ...data,
      image: API + data.image
    }
    setProducts([ ...products, newData])
  }

  const editProduct = (id, data)=>{
    const 
      tempProducts = [...products],
      index = tempProducts.findIndex(product=>product._id == id)

    if(index == -1) return

    tempProducts[index] = {
      ...data,
      image: API + data.image
    }

    setProducts(tempProducts)
  }

  const excluirProduto = (id)=>{
    let 
      tempProducts = [...products],
      indexExcluir = tempProducts.findIndex(product=>product._id == id)

    if(editProduct == -1) return
    tempProducts = tempProducts.filter((el,index)=>index != indexExcluir)
    setProducts(tempProducts)
  }

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, addProduct, editProduct, excluirProduto }}>
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => {
  return useContext(ProductsContext)
};

export { ProductsProvider, useProducts };
