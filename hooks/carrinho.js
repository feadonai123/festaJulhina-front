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
    if(index != -1) tempCarrinho[index].quantity += data.quantity
    else tempCarrinho.push(data)

    setCarrinho(tempCarrinho)
  }

  return (
    <CarrinhoContext.Provider
      value={{ carrinho, addCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

const useCarrinho = () => {
  return useContext(CarrinhoContext)
};

export { CarrinhoProvider, useCarrinho };
