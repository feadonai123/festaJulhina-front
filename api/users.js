import CRUD from "./CRUD"

class Users extends CRUD{

  constructor(){
    super("users")
  }

  formatCreateData(data){
    return {
      username: data.username,
      image: data.image,
      roles: data.roles
    }
  }

  formatUpdateData(data){
    return{
      username: data.username || undefined,
      image: data.image || undefined,
      role: data.role
    }
  }
}

export default new Users()