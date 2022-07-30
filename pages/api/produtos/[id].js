
import Produtos from "../../../api/produtos"

export default async function handler(req, res) {
  
  let status = 400, message = undefined, result = undefined

  try{
    const 
      { method, body, query } = req,
      action = {
        PATCH : ()=>update(body, query),
        GET: ()=>get(query),
        DELETE: ()=>excluir(query)
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

const update = async(body, query)=>{
  return await Produtos.update(query.id, body)
}

const get = async(query)=>{
  return await Produtos.get(query.id)
}

const excluir = async(query)=>{
  return await Produtos.excluir(query.id)
}
