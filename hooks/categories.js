import React, { createContext, useState, useContext } from 'react';

const CategoriesContext = createContext();

const API = "http://localhost:1234"

const CategoriesProvider = ({ children }) => {

  const [ categories, setCategories ] = useState([])

  const addCategoria = (data)=>{
    const newData = {
      ...data,
      image: API + data.image
    }
    setCategories([ ...categories, newData])
  }

  const editCategoria = (id, data)=>{
    const 
      tempCategories = [...categories],
      index = tempCategories.findIndex(product=>product._id == id)

    if(index == -1) return

    tempCategories[index] = {
      ...data,
      image: API + data.image
    }

    setCategories(tempCategories)
  }

  const excluirCategoria = (id)=>{
    let 
      tempCategories = [...categories],
      indexExcluir = tempCategories.findIndex(product=>product._id == id)

    if(id == -1) return
    tempCategories = tempCategories.filter((el,index)=>index != indexExcluir)
    setCategories(tempCategories)
  }

  return (
    <CategoriesContext.Provider
      value={{ categories, setCategories, addCategoria, editCategoria, excluirCategoria }}>
      {children}
    </CategoriesContext.Provider>
  );
};

const useCategories = () => {
  return useContext(CategoriesContext)
};

export { CategoriesProvider, useCategories };
