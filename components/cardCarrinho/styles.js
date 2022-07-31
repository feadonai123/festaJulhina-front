import styled, { css }  from 'styled-components';

export const Content = styled.div`
  cursor: pointer;
  background-color: var(--color-papaya-whip);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  box-shadow: 0px 0px 5px 1px #00000040;
  border-radius: 8px;
  transition: all .3s ease-in-out;

  &:hover{
    transform: scale(1.02);
    filter: drop-shadow(2px 4px 6px black);
  }

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

`

export const Main = styled.div`

  display: flex;
  flex-direction: row;
  height: 64px;
  padding: 0 8px 0 0;
  gap: 0.4rem;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 576px) {
    flex-direction: column;
    height: fit-content;
  }

  &>div{
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 0.4rem;
    align-items: center;
  }

  &>div:nth-child(1){
    justify-content: flex-start;
    @media (max-width: 576px) {
      width: 100%;
      justify-content: flex-start;
    }
  }
  &>div:nth-child(2){
    justify-content: center;
    @media (max-width: 576px) {
      width: 100%;
      justify-content: flex-start;
      margin-left: 2rem;
    }
  }
  &>div:nth-child(3){
    justify-content: flex-end;
    @media (max-width: 576px) {
      width: 100%;
      justify-content: flex-start;
      margin-left: 2rem;
    }
  }

  img{
    border-radius: 8px;
    box-shadow: 0px 0px 5px 1px #00000040;
    object-fit: cover;
    width: 64px;
    height: 64px;
  }

`

export const Collapse = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 8px 24px 24px 24px;
  gap: 0.5rem;
  transition: all .3s ease-in-out;

  ${props=>!props.collapse ? css`
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    opacity: 0;
  ` : css`
    max-height: 150px;
  `};
`
export const ButtonsCollapse = styled.div`

  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: flex-end;

  @media (max-width: 576px) {
    justify-content: center;
  }

  &>div{
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
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