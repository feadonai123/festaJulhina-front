import styled, { css }  from 'styled-components';


export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input[type=file]{
    display: none;
  }

  button{
    cursor: pointer;
    width: fit-content;
    background-color: var(--color-tart-orange);

    &:hover{
      transform: scale(1.03);
    }

    &:active{
      transform: scale(0.97);
    }
  }

  input, textarea, button, select{
    width: 100%;
    padding: 0.3rem 1rem;
    font-size: 24px;
    border-radius: 4px;
    box-shadow: 0px 0px 5px 1px #00000040;
  }

  textarea{
    height: 7rem;
  }

  p{
    margin: 0;
  }

`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 300px;
  flex: 1;
`

export const Right = styled.div`
  display: flex;
  max-width: 300px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  p{
    font-size: 12px;
  }
`

export const ImageContent = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  text-align: center;

  &:hover{
    filter: contrast(0.5);
  }

  img{
    width: 100%;
    height: 100%;
    max-width: 250px;
    max-height: 250px;
    object-fit: cover;
    object-position: center;
    box-shadow: 0px 0px 5px 1px #00000040;
    border-radius: 4px;
  }
`

export const Submit = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 300px;
  width: 100%;
  gap: 1rem;
`

export const Checkbox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;

  input{
    height: 1rem;
    width: 1rem;
  }
`

export const Separator = styled.div`
  margin: 0.5rem 0;
  width: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: var(--color-black-coffee);
`