import { useState } from 'react'
import styles from '../styles/Login.module.css'
import { useUser } from '../hooks/user'
import { useRouter } from 'next/router'
import RequestHelper from '../utils/RequestHelper'

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




export async function getServerSideProps (context) {
  const 
    token = context.req.cookies['token'],
    responseCheckToken = await RequestHelper.post(`http://${context.req.headers.host}/api/auth/checkToken`, { token }),
    userData = responseCheckToken && responseCheckToken.success && responseCheckToken?.data ? responseCheckToken.data : null
  
  if (userData){
    return {
      redirect: {
        permanent: false,
        destination: `/admin`,
      },
      props:{},
    };
  }

  return { props: { } }
}