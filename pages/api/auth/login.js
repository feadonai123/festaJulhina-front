
import Auth from "../../../api/auth"

export default async function handler(req, res) {
  
  let status = 400, message = undefined, result = undefined

  try{
    const 
      { username, password } = req.body,
      resultLogin = await Auth.login({ username, password })

    if(!resultLogin.success) throw {
      message: resultLogin.message,
      status: 400
    }

    result = resultLogin.data
    status = 200
  }catch(e){
    status = e.status || 500
    message = e.message
  }

  return res.status(status).json({
    success: status == 200,
    message,
    data: result
  })

}