import React, { createContext, useState, useContext } from 'react';

const CarrinhoContext = createContext();

const CarrinhoProvider = ({ children }) => {

  const [ carrinho, setCarrinho ] = useState([])

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
