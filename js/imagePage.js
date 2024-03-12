const startButton = document.getElementById("start-btn");
//----控制故事書文字產生內容----//
const Image_text = document.getElementById("image_text");
//----控制故事書AI圖片產生內容----//
const imgAI = document.getElementById("image");
//抓取故事內文文字的輸入框
const TextPrompt = document.getElementById("text-prompt");
//抓住故事封底文字
const text = document.getElementById("backCoverText");
//偵測左測按鈕
const leftPageBtn = document.getElementsByClassName("page-btn");
//左側加頁按鈕
const addPageButton = document.getElementById("addPage-btn");
//偵測書名
const bookTitle = document.getElementById("bookTitle");
// 書名一開始影藏，產出圖片後才顯示title

bookTitle.hidden = true;

startButton.onclick = function () {
  //按鈕無法讓使用者按，避免使用者重複送出、或送出中斷
  console.log(leftPageBtn);
  startButton.disabled = true;
  // addPageButton.disabled = true;

  // for(let i=0;i<leftPageBtn.length;i++)
  // {
  //     leftPageBtn[i].disabled = true;
  // }

  alert("Creating picture now \n Please wait...");

  //抓取故事書名稱
  // 填入故事書名稱
  const bookNameValue = document.getElementById("bookName").value;
  bookTitle.innerText = bookNameValue;

  //抓取使用者所填寫資料
  //抓取故事文字
  //抓取現在頁面位置用來了解要抓取哪個文字value是封底的還是文字內頁
  const pageName = document.getElementById("pageName");
  const PromptValue = TextPrompt.value;
  const textValue = text.value;

  if (pageName.innerText == "Cover") {
    //所填入的書背文產生在故事書旁
    Image_text.innerText = textValue;
  } else {
    //所填入的內文產生在故事書旁
    Image_text.innerText = PromptValue;
  }

  //Get picture style
  const picSty = document.getElementsByName("picture-style");
  let picture_style;
  for (let i = 0; i < picSty.length; i++) {
    if (picSty[i].checked) {
      picture_style = picSty[i].value;
      break;
    }
  }
  console.log(picture_style);

  //角色位置
  const rolePlace = document.getElementById("place").value;
  console.log(rolePlace);
  //-------------------------------//

  //增加Role

  //What kind of role
  const rolTyp = document.getElementsByName("role-type");
  let Role_type;
  for (let i = 0; i < rolTyp.length; i++) {
    if (rolTyp[i].checked) {
      switch (i) {
        case 0:
          Role_type = "";
          break;
        case 1:
          Role_type = document.getElementById("animal-type").value;
          break;
        case 2:
          Role_type = document.getElementById("other-type").value;
          break;
      }
    }
    console.log(Role_type);
  }

  //sex
  const roleSex = document.getElementsByName("sex");
  let role_sex;
  for (let i = 0; i < roleSex.length; i++) {
    if (roleSex[i].checked) {
      role_sex = roleSex[i].value;
      break;
    }
  }

  //如果腳色是能類則是用女孩男孩去形容
  if (Role_type == "" && role_sex == "female") {
    role_sex = "girl";
  } else if (Role_type == "" && role_sex == "male") {
    role_sex = "boy";
  }

  console.log(role_sex);

  // 在哪一頁出現相同的角色
  const samePicPage = document.getElementById("samePicPage").value;
  // 提取該頁的原始discord url
  const samePicUrl = localStorage.getItem(`${samePicPage}_Image`);

  //年齡
  const Age = document.getElementById("age").value;

  //心情
  const Mode = document.getElementById("mode").value;

  //動作
  const Action = document.getElementById("action").value;

  //穿著
  const Wear = document.getElementById("wear").value;

  //個性
  const Personality = document.getElementById("personality").value;

  console.log(Age + Mode + Action + Wear + Personality);
  //-------------------------------//

  //-------------------------------//
  //增加Scene Object

  //物件名稱
  const Object_name = document.getElementById("object-name").value;

  //物件顏色
  const Object_color = document.getElementById("object-color").value;

  //物件位置
  const Object_place = document.getElementById("object-place").value;

  console.log(Object_name + Object_color + Object_place);

  //-------------------------------//

  //-------------------------------//
  //Della3 api
  // const Prompt = `character design,highly detailed,high quality,illustration,${picture_style} , a  ${Personality} ${role_sex} ${Role_type} is  ${Age} years old ,wear ${Wear}, ${Action} ${Mode} in ${rolePlace},a ${Object_color} ${Object_name} ${Object_place}`;
  // const Prompt = `character design,highly detailed,high quality,illustration,a cat`;
  //
  // console.log(Prompt);

  const data = {
    model: "dall-e-3",
    prompt:
      "這一張繪本裡的圖片，色鉛筆風格的插圖，圖片中總共有2個角色，角色1名字叫做阿熊，他是一隻小熊，棕色、毛茸茸、穿著吊帶褲、眼睛和眉毛都是黑色。角色二叫做阿宗，黑色頭髮、棕色大眼睛、小小的鼻子、5歲、穿著制服、背著書包。圖片中呈現天氣晴朗，並且阿宗與阿熊兩個人開心的跑跳在森林裡。",
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  };

  //'Bearer api-key'
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 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`,
      // 'Authorization': ``,
    },

    body: JSON.stringify(data),
  };

  const URL = "https://api.openai.com/v1/images/generations";

  fetch(URL, config)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json);
      console.log(json.data[0]);
      return json.data[0];
    })
    .then((data) => {
      console.log(data.b64_json);
      // console.log(data.url);

      console.log(data.revised_prompt);
      addImages(data.b64_json, data.revised_prompt);
    })
    .catch((error) => {
      alert("Web have some trouble... \n Engineer is doing maintenance");
      startButton.disabled = false;
      console.log(error);
    });
};
// -----------------------------------
//Midjourney Api axuios

//     let Prompt;
//     if (samePicUrl == null) {
//         Prompt = `a  ${Personality} ${role_sex} ${Role_type} is  ${Age} years old ,wear ${Wear}, ${Action} ${Mode}  ${rolePlace},a ${Object_color} ${Object_name} ${Object_place},${picture_style},highly detailed,high quality,children's storybook illustration style,illustration,8k,--ar 1:1`

//     }
//     else {
//         Prompt = `${samePicUrl}, a  ${Personality} ${role_sex} ${Role_type} is  ${Age} years old ,wear ${Wear}, ${Action} ${Mode}  ${rolePlace},a ${Object_color} ${Object_name} ${Object_place},${picture_style},highly detailed,high quality,children's storybook illustration style,illustration,8k,--ar 1:1`
//     }

//     console.log(Prompt);
//     const data = JSON.stringify({
//         //   "callbackURL": "https://....", // Optional

//         "prompt": Prompt

//     });

//     const config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: 'https://api.midjourneyapi.io/v2/imagine',
//         headers: {
//             'Authorization': '202b12a2-f357-409b-885e-0a233f9bf779',
//             'Content-Type': 'application/json'
//         },
//         data: data
//     };

//     axios.request(config)
//         .then((response) => {
//             console.log(JSON.stringify(response.data));
//             result(response.data.taskId);
//         })
//         .catch((error) => {
//             console.log(error);
//             startButton.disabled = false;

//         });

// }

// var imageIntervalid2;
// function result(id) {
//     console.log(id);
//     const data = JSON.stringify({
//         //   "callbackURL": "https://....", // Optional
//         "taskId": id,
//         "position": "2"
//     });

//     const config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: 'https://api.midjourneyapi.io/v2/result',
//         headers: {
//             'Authorization': '202b12a2-f357-409b-885e-0a233f9bf779',
//             'Content-Type': 'application/json'
//         },
//         data: data
//     };

//     imageIntervalid2 = setInterval(() => {
//         console.log("我正在跑RES");
//         axios.request(config)
//             .then((response) => {
//                 console.log(JSON.stringify(response.data));
//                 if (response.data.imageURL != undefined) {
//                     console.log(response.data.imageURL);
//                     addImages(response.data.imageURL);
//                     stopInterval2();
//                 }
//             })

//             .catch((error) => {
//                 console.log(error);
//                 startButton.disabled = false;

//             });

//     }, 5000);

// }

// function stopInterval2() {
//     console.log("stopInterval");
//     clearInterval(imageIntervalid2);
// }

//-------------------------------//
//將產出的網址變為IMAGE顯示在畫面中
function addImages(jsonData) {
  if (jsonData.error) {
    reqStatus.innerHTML = "ERROR: " + jsonData.error.message;
    return;
  }

  imgAI.src = `data:image/jpeg;base64,${jsonData}`;
  // imgAI.alt = prompt;

  // 圖片產出後即可再次製作圖片
  startButton.disabled = false;
  // 圖片產出顯示故事書的title
  bookTitle.hidden = false;
}

//-------------------------------//
//左側按鈕功能
//-------
//按下假的更換頁面
let pageContain = document.querySelector("#page_container");

const bookName_contain = document.getElementById("bookName_contain");
const backCover_contain = document.getElementById("backCover_contain");
const textPrompt_contain = document.getElementById("textPrompt_contain");
const coverColor = document.getElementById("coverColor");
const textBgColor = document.getElementById("textBgColor");
const text_container = document.getElementById("text-container");

//當按相同CLASS按鈕
//冒泡機制，讓新增的物件也被監聽，父級別被監聽子級別也會
pageContain.addEventListener("click", (e) => {
  //並不是父級別裡的所有CSS感應到，而是僅限於class="page-btn"
  if (e.target.classList.contains("page-btn")) {
    //更改該頁面title
    const page_Txt = e.target.innerText;
    pageName.innerText = page_Txt;
    //將所有input歸零
    document.getElementById("allForm").reset();
    //將故事書文字歸零#但之後須加後端抓取資料
    //這裡reset有bug，什麼時要取後端資料，什麼時候reset
    Image_text.innerText = "Showing story picture and content soon.";

    //將故事書圖片歸零#但之後須加後端抓取資料
    //這裡reset有bug，什麼時要取後端資料，什麼時候reset

    if (
      localStorage.getItem(`${pageName.innerText}_Image`) == null ||
      localStorage.getItem(`${pageName.innerText}_Image`) == undefined
    ) {
      imgAI.src = "../picture/storyPicContainer3.png";
    } else imgAI.src = localStorage.getItem(`${pageName.innerText}_Image`);

    if (
      localStorage.getItem(`${pageName.innerText}_Text`) == null ||
      localStorage.getItem(`${pageName.innerText}_Text`) == undefined
    ) {
      Image_text.innerText = "Showing story picture and content soon.";
    } else
      Image_text.innerText = localStorage.getItem(`${pageName.innerText}_Text`);

    imgAI.alt = "";
    changePageInner();
    //---console.log--//
    console.log(e.target);
    console.log(e.target.nodeName);
    console.log(page_Txt);
    console.log(e.target.innerText);
  }
});

//更換頁面部分內容不同要隱藏以及顯示(在沒有切換btn的情況)

const changePageInner = function () {
  console.log(`pagename==${pageName.innerText}`);
  if (pageName.innerText == "Cover") {
    textPrompt_contain.style.display = "none";
    textBgColor.style.display = "none";
    coverColor.style.display = "block";
    bookName_contain.style.display = "block";
    backCover_contain.style.display = "block";
    text_container.style.alignItems = "end";
    Image_text.style.paddingBottom = "20px";
    console.log("cover");
  } else {
    textPrompt_contain.style.display = "block";
    textBgColor.style.display = "block";
    bookName_contain.style.display = "none";
    backCover_contain.style.display = "none";
    coverColor.style.display = "none";
    text_container.style.alignItems = "center";
    Image_text.style.paddingBottom = "0px";
    console.log("any");
  }
};
changePageInner();

//-------新增Page
//..增加PAGE按鈕onclick...

addPageButton.onclick = function () {
  //新增button
  const creat_Pagebtn = document.createElement("button");

  //看目前有幾個button，根據button數量來命名現在第幾頁
  const pageBtn = document.querySelectorAll(".page-btn");
  console.log(pageBtn);
  creat_Pagebtn.innerText = `Page ${pageBtn.length}`;
  creat_Pagebtn.className = "page-btn";

  //將新增的東西放入父級別
  pageContain.appendChild(creat_Pagebtn);
};

//更換背景顏色

const bg_color = document.getElementsByClassName("bg_color");
const colorSelect = document.getElementById("colorSelect");
const image_text = document.getElementById("image_text");

colorSelect.addEventListener("click", (e) => {
  //並不是父級別裡的所有CSS感應到，而是僅限於class="bg_color"
  if (e.target.classList.contains("bg_color")) {
    const container_color = e.target.getAttribute("data-background");
    const container_text = e.target.getAttribute("data-text");

    text_container.style.background = container_color;
    image_text.style.color = container_text;
  }
});

//更換背景顏色之選項btn顏色
console.log(bg_color);
for (i = 0; i < bg_color.length; i++) {
  bg_color[i].style.backgroundColor =
    bg_color[i].getAttribute("data-background");
  bg_color[i].style.color = bg_color[i].getAttribute("data-text");
}

//reset 按鈕

const reset_btn = document.getElementById("reset-btn");

reset_btn.addEventListener("click", () => {
  document.getElementById("allForm").reset();
});

//finish 按鈕
const finish_btn = document.getElementById("finish-btn");
