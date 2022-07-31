import { useState } from 'react'
import styles from '../styles/Login.module.css'
import { useUser } from '../hooks/user'
import { useRouter } from 'next/router'

export default function Home () {
  const router = useRouter()

  const { login } = useUser()

  const [ formData, setFormData ] = useState({
    username: '',
    password: ""
  })

  const handleSetFormData = function (key, data) {
    setFormData({ ...formData, [key]: data })
  }

  const handleVerificaTudoFormData = ()=>{
    if(!formData.username || !formData.password){
      alert("Preencha todos os campos")
      return false
    }
    return true
  }

  const handleOnClickLogin = async()=>{
    try{
      const isOk = handleVerificaTudoFormData()
      if(!isOk) return

      const resultLogin = await login(formData)
      if(!resultLogin) throw new Error("Erro ao fazer login")
    }catch(e){
      return alert(e.message)
    }
    router.push("/admin")
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.form}>
          <h1>Login</h1>
          <div>
            <p>Nome de usuário</p>
            <input type="text" placeholder='Username' onChange={(e)=>handleSetFormData("username", e.target.value)}/>
          </div>
          <div>
            <p>Senha</p>
            <input type="pass" placeholder='Password' onChange={(e)=>handleSetFormData("password", e.target.value)}/>
          </div>
          <button onClick={handleOnClickLogin} className={styles.buttonEntrar}>Entrar</button>
        </div>
      </div>
    </div>
  )
}
