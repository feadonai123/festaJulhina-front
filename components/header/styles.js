import styled, { css }  from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: var(--color-papaya-whip);
  justify-content: center;
  align-items: center;
`

export const MenuIcon = styled.div`
  display: none;

  button{
    cursor: pointer;
    background-color: var( --color-ruby);
    padding: 0.5rem;
    font-size: 1rem;
    color: white;
    border-radius: 8px;
    box-shadow:0px 0px 5px 1px #00000040;
    position: relative;
  
    &:hover{
      transform: scale(1.03);
    }
  
    &:active{
      transform: scale(0.97);
    }

    &[notify]::after{
      content: attr(notify);
      position: absolute;
      top: -0.6rem;
      right: 0;
      background-color: var(--color-write);
      color: var( --color-ruby);
      border-radius: 100%;
      padding: 0;
      width: 1.2rem;
      height: 1.2rem;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(2px 4px 6px black);
    }
  }

  @media (max-width: 768px) {
    display: flex;
  }
`

export const Content = styled.div`
  max-width: var(--screen-large);
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;


  &>div{
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    width: 100%;
  }

  &>div:nth-child(1){
    justify-content: space-between;
  }

  &>div:nth-child(2){
    justify-content: flex-end;

    @media (max-width: 768px) {
      overflow: hidden;
      padding-top: 1rem;
      justify-content: center;
      transition: all 0.3s ease-in-out;
      max-height: 200px;

      ${props=>props.collapse && css`
        max-height: 0;
        margin-top: 0;
        margin-bottom: 0;
        padding-top: 0;
        padding-bottom: 0;
        opacity: 0;
      `}
    }
  }
  h1{
    margin: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Links = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }


  a{
    cursor: pointer;
    background-color: var( --color-ruby);
    padding: 0.5rem;
    font-size: 1rem;
    color: white;
    border-radius: 24px;
    box-shadow:0px 0px 5px 1px #00000040;
    position: relative;

    &:hover{
      transform: scale(1.03);
    }

    &:active{
      transform: scale(0.97);
    }

    &[notify]::after{
      content: attr(notify);
      position: absolute;
      top: -0.6rem;
      right: 0;
      background-color: var(--color-write);
      color: var( --color-ruby);
      border-radius: 100%;
      padding: 0;
      width: 1.2rem;
      height: 1.2rem;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(2px 4px 6px black);
    }
  }
`