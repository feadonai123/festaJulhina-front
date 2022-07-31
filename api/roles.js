import CRUD from "./CRUD"

class Roles extends CRUD{

  constructor(){
    super("roles")
  }

  formatCreateData(data){
    return {
      name: data.name,
      permissions: data.permissions,
      all: data?.all
    }
  }

  formatUpdateData(data){
    return{
      name: data.name || undefined,
      permissions: data.permissions || undefined,
      all: data?.all || undefined
    }
  }
}

export default new Roles()