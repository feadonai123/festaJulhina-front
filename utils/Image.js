

export default class Image{
  static fileToBase64Compress(file){
    return new Promise(resolve=>{
      const reader = new FileReader();
      reader.onloadend = () => {
        var image = document.createElement("img");
        image.onload = async()=> {
          const result = await Image.compressImage(reader.result, image.width, image.height)
          resolve(result)
        };
        image.src = reader.result;   
      };
      reader.readAsDataURL(file);
    })
  }

  static compressImage(base64, width, height){
    return new Promise(resolve=>{
        const 
            canvas = document.createElement("canvas"),
            MAX_WIDTH = 500,
            scaleSize = MAX_WIDTH / width;

        canvas.width = MAX_WIDTH;
        canvas.height = height * scaleSize;

        const ctx = canvas.getContext("2d");

        var image = document.createElement("img")
        image.src = base64
        
        image.onload = function() {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          const srcEncoded = ctx.canvas.toDataURL(image, "image/jpeg");
          resolve(srcEncoded)
        };
    })
  }

}