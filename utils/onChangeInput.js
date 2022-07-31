export default class OnChangeInput{

  static value(data){
    let v = data.replace(/^0+/, '').replace(/[^0-9.]/g, "")
    if(v.match(/[.]/g)) v = v.split('.')[0].slice(0, 4) + "." + v.split('.')[1]
    else v = v.split('.')[0].slice(0, 4)
    if(v.match(/[.]/g) && v.match(/[.]/g).length > 1){
      const [primeiro, ...outros] = v.split('.')
      v = primeiro + "." + outros.join('')
    }
    if(v.split('.').length > 1 && v.split('.')[1].length > 2) v = v.split('.')[0] + "." + v.split('.')[1].slice(0, 2)
    return v
  }
}