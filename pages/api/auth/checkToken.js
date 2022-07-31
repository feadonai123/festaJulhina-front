
import Auth from "../../../api/auth"

export default async function handler(req, res) {
  
  let status = 400, message = undefined, result = undefined

  try{
    const 
      token = req.body.token,
      resultCheckToken = await Auth.checkToken(token)

    if(!resultCheckToken.success) throw {
      message: resultCheckToken.message,
      status: 400
    }

    result = resultCheckToken.data
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