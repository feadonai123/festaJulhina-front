import styled, { css }  from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  h1, h2, p{
    margin: 0;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Separator = styled.div`
  width: 100%;
  height: 0px;
  border-style: solid;
  border-color: var( --color-ruby);
`

export const ImageContent = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex: 1;

  img{
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 24px;
    box-shadow: 0px 0px 5px 1px #00000040;
  }
`

export const DetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
`

export const QuantidadeContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;

  p, h1{
    margin: 0;
  }

  button{
    background-color: var( --color-ruby);
    color: white;
    border-radius: 100%;
    padding: 10px;
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    cursor: pointer
  }

  button:hover{
    transform: scale(1.03);
  }

  button:active{
    transform: scale(0.97);
  }

  
`

export const ButtonCartShopping = styled.button`
  background-color: var( --color-ruby);
  padding: 0.5rem;
  font-size: 1rem;
  color: white;
  border-radius: 24px;
  box-shadow:0px 0px 5px 1px #00000040;

  &:hover{
    transform: scale(1.03);
  }

  &:active{
    transform: scale(0.97);
  }
`