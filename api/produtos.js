import CRUD from "./CRUD"

class Products extends CRUD{

  constructor(){
    super("products")
  }

  formatCreateData(data){
    return {
      name: data.name,
      description: data.description,
      categorie: data.categorie,
      image: data.image,
      value: data.value
    }
  }

  formatUpdateData(data){
    return{
      name: data.name || undefined,
      categorie: data.categorie || undefined,
      description: data.description || undefined,
      image: data.image || undefined,
      value: data.value || undefined
    }
  }
}

export default new Products()