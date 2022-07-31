import React, { createContext, useState, useContext, useEffect } from 'react';
import LocalStorage from '../utils/localStorage';

const CarrinhoContext = createContext();

const CarrinhoProvider = ({ children }) => {

  const [ carrinho, setCarrinho ] = useState([])

  useEffect(()=>{
    try{
      const 
        carrinho = LocalStorage.get("carrinho"),
        carrinhoFormat = JSON.parse(carrinho)
      if(!carrinhoFormat || carrinhoFormat.length == 0) return
      setCarrinho(carrinhoFormat)
    }catch(e){}
  }, [])

  useEffect(()=>{
    LocalStorage.set("carrinho", JSON.stringify(carrinho))
  }, [ carrinho ])

  const addCarrinho = (data)=>{
    const tempCarrinho = [...carrinho]
    const index = tempCarrinho.findIndex(product=>product.productId == data.productId)
    if(index != -1) {
      let newQuantity = Math.max(tempCarrinho[index].quantity + data.quantity, 1)
      tempCarrinho[index].quantity = newQuantity
    }
    else tempCarrinho.push(data)

    setCarrinho(tempCarrinho)
  }

  const deleteCarrinho = (productId)=>{
    let 
      tempCarrinho = [...carrinho],
      indexExcluir = tempCarrinho.findIndex(carrinho=>carrinho.productId == productId)

    if(indexExcluir == -1) return
    tempCarrinho = tempCarrinho.filter((el,index)=>index != indexExcluir)
    setCarrinho(tempCarrinho)
  }

  return (
    <CarrinhoContext.Provider
      value={{ carrinho, addCarrinho, deleteCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

const useCarrinho = () => {
  return useContext(CarrinhoContext)
};

export { CarrinhoProvider, useCarrinho };
