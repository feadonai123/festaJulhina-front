import CRUD from "./CRUD"

class Categories extends CRUD{

  constructor(){
    super("categories")
  }

  formatCreateData(data){
    return {
      name: data.name,
      image: data.image,
    }
  }

  formatUpdateData(data){
    return{
      name: data.name || undefined,
      image: data.image || undefined,
    }
  }
}

export default new Categories()