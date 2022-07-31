import RequestHelper from "../utils/RequestHelper"

export default class CRUD{

  collection = []
  url = ""
  /*
    formatCreateData
    formatUpdateData
  */

  constructor(collection){
    this.collection = collection
    this.url = `${process.env.API}/dbTest/${this.collection}`
  }

  async create(data){
    return await RequestHelper.post(this.url, this.formatCreateData(data))
  }

  async update(id, data){
    return await RequestHelper.patch(`${this.url}/${id}`, this.formatUpdateData(data))
  }
  
  async get(id){
    return await RequestHelper.get(`${this.url}/${id}`)
  }

  async excluir(id){
    return await RequestHelper.delete(`${this.url}/${id}`)
  }

  async getAll(){
    return await RequestHelper.get(this.url)
  }

}