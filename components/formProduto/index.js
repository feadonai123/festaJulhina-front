/* eslint-disable @next/next/no-img-element */
import { Form, Row, Left, Right, ImageContent, Submit, Separator } from './styles'
import React, { useState, useRef, useEffect } from 'react'
import { useProducts } from '../../hooks/products'
import { useCategories } from '../../hooks/categories'
import RequestHelper from "../../utils/RequestHelper"
import { Image } from '../../utils/Image'
import onChangeInput from '../../utils/onChangeInput'
import Validate from '../../utils/Validate'
import OnBlur from '../../utils/onBlurInput'
import LocalStorage from '../../utils/LocalStorage'

// TODO tratativa de erros e loading
const 
  DEFAULT_IMAGE = "http://localhost:1234/public/images/default.png",
  defaultFormData = {
    name: "",
    description: "",
    value: "",
    categorie: "-1",
    image: DEFAULT_IMAGE
  },
  defaultFormDataError = {
    name: {
      message: "Nome inválido",
      error: false
    },
    description: {
      message: "Descrição inválida",
      error: false
    },
    value: {
      message: "Valor inválido",
      error: false
    },
    categorie:{
      message: "Categoria inválido",
      error: false
    },
    image: {
      message: "Imagem inválida",
      error: false
    }
  }

export default function FormProduto ({ product = null, callback = ()=>{} }) {

  const isEditar = !!product

  const { addProduct, editProduct, excluirProduto } = useProducts()
  const { categories } = useCategories()

  const inputFileRef = useRef()

  const [ formData, setFormData ] = useState(defaultFormData)
  const [ formDataError, setFormDataError ] = useState(defaultFormDataError)

  useEffect(()=>{
    if(isEditar) initEditar()
    else initCriar()
  }, [])

  const initEditar = ()=>{
    setFormData({ ...defaultFormData, ...product })
  }

  const initCriar = ()=>{
    const formDataStoraged = getLocalStorage()
    if(!formDataStoraged) return
    const { name, description, value, image } = JSON.parse(formDataStoraged)
    setFormData({ ...defaultFormData, name, description, value, image })
  }

  const getLocalStorage = ()=>{
    if(!isEditar) return LocalStorage.get("formDataProduct")
    return null
  }
  const saveLocalStorage = (data)=>{
    if(!isEditar) LocalStorage.set("formDataProduct", JSON.stringify(data))
  }

  const handleSetFormData = (key, data) => {
    saveLocalStorage({ ...formData, [key]: data })
    setFormData({ ...formData, [key]: data })
  }

  const handleSetFormDataError = (key, data) => {
    setFormDataError({ ...formDataError, [key]: { ...formDataError[key], ...data } })
  }

  const cleanFormData = ()=>{
    saveLocalStorage(defaultFormData)
    setFormData(defaultFormData)
  }

  const handleVerifica = (key, value)=>{
    const verifica = {
      name: (data)=>Validate.name(data),
      description: (data)=>Validate.description(data),
      value: (data)=>Validate.value(data),
      image: (data)=>Validate.image(data),
      categorie: (data)=>Validate.select(data),
    }

    return verifica[key] ? verifica[key](value) : { error: false }
  }

  const handleVerificaFormData = (key, value)=>{
    const verificaResult = handleVerifica(key, value)
    handleSetFormDataError(key, verificaResult)
    return verificaResult
  }

  const handleVerificaTudoFormData = ()=>{
    let tempFormDataError = {...formDataError}
    Object.keys(formData).forEach(key=>{
      tempFormDataError[key] = handleVerifica(key, formData[key])
    })
    setFormDataError(tempFormDataError)

    const hasError = Object.keys(tempFormDataError).find(key=>tempFormDataError[key].error)
    return hasError
  }

  const onBlurFormData = (key, data)=>{
    const 
      format = {
        value: (data)=>OnBlur.value(data)
      },
      newData = format[key] ? format[key](data) : data

    handleSetFormData(key, newData)
    const verificado = handleVerificaFormData(key, newData)
    handleSetFormDataError(key, verificado)
  }

  const onChangeFormData = (key, data)=>{
    const 
      format = {
        value: (data)=>onChangeInput.value(data)
      },
      newData = format[key] ? format[key](data) : data
  
    handleSetFormData(key, newData)
  }

  const handleClickImg = ()=>{
    inputFileRef.current.click()
  }

  const handleImgPicked = async(e)=>{
    const file = e.target.files[0]
    if(!file) return
    if (!file.type.includes("image")){
      handleSetFormDataError("image", { error: true, message: "Arquivo inválido" })
      return
    }
    const base64 = await Image.fileToBase64Compress(e.target.files[0])
    handleSetFormData(e.target.name, base64)
    handleVerificaFormData("image", base64)
  }

  const handleClickCriar = async()=>{
    try{
      const hasError = handleVerificaTudoFormData()
      if(hasError) return

      if(isEditar){
        const resultUpdate = await RequestHelper.patch("/api/produtos/" + formData._id, formData)
        if(!resultUpdate.success) throw new Error (resultUpdate.message)
        editProduct(formData._id, resultUpdate.data)
        return callback("Produto editado com sucesso")
      }else{
        const resultCreate = await RequestHelper.post("/api/produtos", formData)
        if(!resultCreate.success) throw new Error (resultCreate.message)
        addProduct(resultCreate.data)
      }

      cleanFormData()
    }catch(e){
      return alert(e.message)
    }
    return alert("Sucesso ao criar produto")
  }

  const handleClickExcluir = async()=>{
    try{
      const resultExcluir = await RequestHelper.delete("/api/produtos/" + formData._id)
      if(!resultExcluir.success) throw new Error (resultExcluir.message)
      excluirProduto(formData._id)
      return callback("Produto excluido com sucesso")
    }catch(e){
      console.log(e)
      return alert(e.message)
    }
  }

  return <Form>
    <Row>
      <Left>
        <div data-message={formDataError.name.message} data-error={formDataError.name.error}>
          <p>Nome:</p>
          <input 
            name="name" 
            onChange={(e)=>onChangeFormData(e.target.name, e.target.value)} 
            onBlur={(e)=>onBlurFormData(e.target.name, e.target.value)} 
            value={formData.name}
            placeholder='nome' 
            type="text" 
            maxLength="16">
          </input>
        </div>
        <div data-message={formDataError.description.message} data-error={formDataError.description.error}>
          <p>Descrição:</p>
          <textarea 
            name="description" 
            onChange={(e)=>onChangeFormData(e.target.name, e.target.value)} 
            onBlur={(e)=>onBlurFormData(e.target.name, e.target.value)} 
            value={formData.description} 
            placeholder='descrição' 
            type="text" 
            maxLength="100">
          </textarea>
        </div>
        <div data-message={formDataError.value.message} data-error={formDataError.value.error}>
          <p>Valor (R$):</p>
          <input 
            name="value" 
            onChange={(e)=>onChangeFormData(e.target.name, e.target.value)} 
            onBlur={(e)=>onBlurFormData(e.target.name, e.target.value)} 
            value={formData.value} 
            placeholder='valor' 
            type="text">
          </input>
        </div>
        <div data-message={formDataError.categorie.message} data-error={formDataError.categorie.error}>
          <p>Categoria:</p>
          <select name="categorie" onChange={(e)=>onChangeFormData(e.target.name, e.target.value)} onBlur={(e)=>onBlurFormData(e.target.name, e.target.value)} value={formData.categorie}>
            <option value="-1" key="-1">Selecione uma opção</option>
            {categories.map(categorie=><option value={categorie._id} key={categorie._id}>{categorie.name}</option>)}
          </select>
        </div>
      </Left>
      <Right>
        <ImageContent onClick={handleClickImg} data-message={formDataError.image.message} data-error={formDataError.image.error}>
          <img src={formData.image} alt="image"></img>
          <input name="image" ref={inputFileRef} onChange={handleImgPicked} type="file" accept='image/*'/>
          <p>Clique para alterar a imagem</p>
        </ImageContent>
      </Right>
    </Row>
    <Submit>
      <Separator></Separator>
      <button onClick={handleClickCriar}>{isEditar ? "Editar" : "Criar"}</button>
      {isEditar && <button onClick={handleClickExcluir}>Excluir</button>}
    </Submit>
  </Form>
}
