// const { Configuration, OpenAIApi } = require("openai");
//  const key=process.env.OPENAI_API_KEY;
//  console.log(key);

let config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    }
  }
  
let data = {
    'prompt': 'A cute baby sea otter',
    'n': 1,
    'size': '256x256'
}
let URL = "https://api.openai.com/v1/images/generations"  
axios.post(URL, data, config).then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log("err:", err)
})
