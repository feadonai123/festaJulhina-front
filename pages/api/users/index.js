
import Users from "../../../api/users"

export default async function handler(req, res) {
  
  let status = 400, message = undefined, result = undefined
  const token = req.cookies.token || ""
  const header = {
    'Authorization': 'baerel ' + token,
  }
  Users.HEADERS = header

  try{
    const 
      { method, body } = req,
      action = {
        POST : ()=>create(body),
        GET: ()=>getAll()
      }

    if(!action[method]) throw {
      message: "Método não permitido",
      status: 405
    }
  
    const resultMethod = await action[method]()
    if(!resultMethod.success)throw {
      message: resultMethod.message,
      status: 400
    }
    result = resultMethod.data
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

const create = async(data)=>{
  return await Users.create(data)
}

const getAll = async()=>{
  return await Users.getAll()
}
