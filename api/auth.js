import RequestHelper from "../utils/RequestHelper"

class Auth{

  static async checkToken(token){
    return await RequestHelper.get(`${process.env.API}/auth/checkToken/${token}`)
  }

  static async login({ username, password }){
    return await RequestHelper.post(`${process.env.API}/auth/login`, { username, password })
  }

}

export default Auth