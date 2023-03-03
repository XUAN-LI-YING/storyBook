
const reqButton = document.getElementById('button-request');
const reqStatus = document.getElementById('request-status');

//當按下按鈕
reqButton.onclick = function () {

  //按鈕無法讓使用者按
  reqButton.disabled = true; 
  console.log(reqButton.disabled);

  // Give some feedback to user
  reqStatus.innerHTML = "Request started...";

  // Fetch image request data
  const key = document.getElementById('api-key').value;
  const prompt = document.getElementById('text-prompt').value;
  const count = Number(document.getElementById('image-count').value);
  const radios = document.getElementsByName('image-size');
  let size;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      size = Number(radios[i].value);
      break;
    }
  }

  //api
  let data = {
    'prompt': prompt,
    'n': count,
    'size': size + "x" + size,
     response_format: 'url',
  }

  //'Bearer api-key'
  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    },
   
    body: JSON.stringify(data) //不太懂一定要有這行才能有res.json()
  }
  


let URL = "https://api.openai.com/v1/images/generations" 

fetch(URL, config)
  .then(res => res.json())   //不太懂res.json()
  .then(res =>console.log(res))
  // .then(json =>console.log(json))
  .then(json => addImages(json,prompt)) //不太懂json,prompt哪來得他又不知道vaule為多少
  .catch(error => {   //關於 try catch 他產生例外但為什麼上面的有些會運作有些不會
    // reqStatus.innerHTML = error+ json.error.message;
    reqStatus.innerHTML = error;
    reqButton.disabled = false;

})

//.then((res)=>{console.log(res)})

}

//將產出的網址變為IMAGE顯示在畫面中
function addImages(jsonData, prompt) {
    
  console.log(jsonData);
  reqButton.disabled = false;
  console.log(reqButton.disabled);


  // 
  if (jsonData.error)
  {
    reqStatus.innerHTML = 'ERROR: ' + jsonData.error.message;
    return;
  }
  
  //偵測他需要畫有幾張圖(jsonData.data.length)
  //prepend按先後順序持續顯示，後面製造的圖放最前面
  const container = document.getElementById('image-container');
  for (let i = 0; i < jsonData.data.length; i++) {
    let imgData = jsonData.data[i];
    let img = document.createElement('img');
    img.src = imgData.url;
    img.alt = prompt;
    container.prepend(img);
  }

  reqStatus.innerHTML = jsonData.data.length +' images received for "' + prompt + '"';
}


