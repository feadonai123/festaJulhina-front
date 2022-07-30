import styled, { css }  from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Editar = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  padding: 2rem 0 0 0;
  overflow-y: scroll;
  top: 0;
  left: 0;
  background-color: #0000007a;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`
export const EditarContent = styled.div`
  padding: 2rem;
  border-radius: 24px;
  height: fit-content;
  box-shadow: 0px 0px 5px 1px #00000040;
  background-color: var(--color-papaya-whip);
`

export const List = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-around;
`
export const IconEdit = styled.div`
  font-size: 1rem;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 24px;
  opacity: 0;
  transition: all .3s ease-in-out;
`

export const Card = styled.div`
  position:relative;
  cursor: pointer;
  background-color: var(--color-papaya-whip);
  display: flex;
  flex-direction: column;
  max-width: 200px;
  width: 100%;
  padding: 4px;
  box-shadow: 0px 0px 5px 1px #00000040;
  border-radius: 24px;
  text-align: center;
  gap: 0.4rem;
  padding-bottom: 1em;
  transition: all .3s ease-in-out;

  h1, h2{
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  h1{
    font-size: 1.2rem;
  }
  h2{
    font-size: 1rem;
  }

  &:hover{
    transform: scale(1.02);
    filter: drop-shadow(2px 4px 6px black);
  }

  &:hover ${IconEdit}{
    opacity: 1;
  }

  img{
    margin: auto;
    border-radius: 24px;
    box-shadow: 0px 0px 5px 1px #00000040;
    object-fit: cover;
    width: 190px;
    height: 190px;
  }
`
export const ImgCategorie = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 24px;

  img{
    border-radius: 50%;
    object-fit: cover;
    width: 32px;
    height: 32px;
  }
`