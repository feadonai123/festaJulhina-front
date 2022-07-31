import { useState, useRef, useEffect } from 'react'
import { Form, Row, Left, Right, ImageContent, Submit, Separator, Checkbox } from './styles'
import Image from '../../utils/Image'
import LocalStorage from '../../utils/LocalStorage'
import OnChangeInput from '../../utils/onChangeInput'
import OnBlur from '../../utils/onBlurInput'
import Validate from '../../utils/Validate'
import RequestHelper from '../../utils/RequestHelper'

const DEFAULT_IMAGE = "http://localhost:1234/public/images/default.png"
const DEFAULT_FORM_DATA = {
  username: '',
  image: DEFAULT_IMAGE,
  roles: []
}

const CadastrarUser = ({ isEditar = false, user = {}, ...props })=>{

  const inputFileRef = useRef()
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA)
  const [ roles, setRoles ] = useState([])

  useEffect(()=>{
    const getRoles = async ()=>{
      const resultGetRoles = await RequestHelper.get("/api/roles")
      if(!resultGetRoles || !resultGetRoles.success){
        alert(resultGetRoles.message)
        return
      }
      setRoles(resultGetRoles.data)
    }
    getRoles()
  }, [])

  useEffect(()=>{
    if(isEditar) initEditar()
    else initCriar()
  }, [])

  const initEditar = ()=>{
    setFormData({ ...DEFAULT_FORM_DATA, ...user })
  }
  const initCriar = ()=>{
    const formDataStoraged = getLocalStorage()
    if(!formDataStoraged) return
    const { username, image, roles } = JSON.parse(formDataStoraged)
    setFormData({ ...DEFAULT_FORM_DATA, username, image, roles })
  }
  const getLocalStorage = ()=>{
    if(!isEditar) return LocalStorage.get("formDataUser")
    return null
  }
  const saveLocalStorage = (data)=>{
    if(!isEditar) LocalStorage.set("formDataUser", JSON.stringify(data))
  }

  const handleChangeRole = (e)=>{
    const 
      isCheck = e.target.checked, 
      value = e.target.value

    let tempRoles = [...formData.roles]

    if(isCheck){
      tempRoles.indexOf(value) === -1 ? tempRoles.push(value) : null
    }else{
      tempRoles = tempRoles.filter(item=>item !== value)
    }
    handleSetFormData('roles', tempRoles)
  }

  const handleSetFormData = (key, data) => {
    saveLocalStorage({ ...formData, [key]: data })
    setFormData({ ...formData, [key]: data })
  }

  const onChangeFormData = (e)=>{
    const 
      key = e.target.parentElement.getAttribute("data-id"),
      value = e.target.value,
      format = {
        value: (data)=>OnChangeInput.value(data)
      },
      newData = format[key] ? format[key](value) : value
  
    handleSetFormData(key, newData)
  }

  const onBlurFormData = (e)=>{
    const 
      key = e.target.parentElement.getAttribute("data-id"),
      value = e.target.value,
      format = {
        value: (data)=>OnBlur.value(data)
      },
      newData = format[key] ? format[key](value) : value

    handleSetFormData(key, newData)

    isValid(key, newData)
  }

  const updateErrorInput = (key, error, message)=>{
    const el = document.querySelector(`[data-id=${key}]`)
    if(error){
      el.setAttribute("data-message", message)
      el.setAttribute("data-error", true)
    }else{
      el.setAttribute("data-error", false)
    }
  }

  const isValid = (key, value)=>{
    const verifica = {
      name: (data)=>Validate.name(data),
      description: (data)=>Validate.description(data),
      value: (data)=>Validate.value(data),
      image: (data)=>Validate.image(data),
      categorie: (data)=>Validate.select(data),
      roles: (data)=>{
        return {
          error: data.length == 0,
          message: "* Selecione pelo menos um cargo"
        }
      }
    },
    verificaDefault = (data)=>{
      return {
        error: !data,
        message: "* Campo Obrigatório"
      }
    }

    const { error, message } =  verifica[key] ? verifica[key](value) : verificaDefault(value)
    updateErrorInput(key, error, message)
    return !error
  }

  const handleClickImg = ()=>{
    inputFileRef.current.click()
  }

  const handleImgPicked = async(e)=>{
    const file = e.target.files[0]
    const key = e.target.name
    if(!file) return
    if (!file.type.includes("image")){
      updateErrorInput(key, true, "Arquivo inválido")
      return
    }
    const base64 = await Image.fileToBase64Compress(e.target.files[0])
    handleSetFormData(key, base64)
    isValid(key, base64)
  }

  const cleanFormData = ()=>{
    saveLocalStorage(DEFAULT_FORM_DATA)
    setFormData(DEFAULT_FORM_DATA)
  }

  const handleClickCriar = async()=>{
    try{
      let hasError = false
      Object.keys(formData).forEach(key=>{
        const isOk = isValid(key, formData[key])
        if(!isOk) hasError = true
      })
      if(hasError) return

      if(isEditar){
        
      }else{
        const resultCreate = await RequestHelper.post("/api/users", formData)
        if(!resultCreate.success) throw new Error (resultCreate.message)
      }

      cleanFormData()
    }catch(e){
      return alert(e.message)
    }
    return alert("Sucesso ao criar usuário")
  }

  return(
    <Form>
      <Row>
        <Left>
          <div data-id="username">
            <p>Nome de usuário:</p>
            <input 
              name="username" 
              onChange={onChangeFormData} 
              onBlur={onBlurFormData} 
              value={formData.username}
              placeholder='username' 
              type="text" 
              maxLength="16">
            </input>
          </div>
          <div data-id="roles">
            <p>Cargo:</p>
            <div style={{ padding: "0.5rem 0 1rem 0.5rem" }}>
              {roles && roles.map((role, index)=><Checkbox key={index}>
                <input type="checkbox" value={role._id} checked={formData.roles.indexOf(role._id) != -1} onChange={handleChangeRole}/>
                {role.name}
              </Checkbox>)}
            </div>
          </div>
        </Left> 
        <Right>
          <ImageContent data-id="image" onClick={handleClickImg}>
            <img src={formData.image} alt="image"></img>
            <input name="image" ref={inputFileRef} onChange={handleImgPicked} type="file" accept='image/*'/>
            <p>Clique para alterar a imagem</p>
          </ImageContent>
        </Right>
      </Row>
      <Submit>
        <Separator></Separator>
        <button onClick={handleClickCriar}>{isEditar ? "Editar" : "Criar"}</button>
        {/*{isEditar && <button onClick={handleClickExcluir}>Excluir</button>}*/}
      </Submit>
    </Form>
  )
}

export default CadastrarUser