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
// 新增角色
const rollBtn = document.getElementById("rollBtn");
// 故事書名稱
const bookName = document.getElementById("bookName");
//抓取現在頁面位置用來了解要抓取哪個文字value是封底的還是文字內頁
const pageName = document.getElementById("pageName");

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

  alert("插圖需再幾秒後才會生成，請勿離開此頁，謝謝您");

  //抓取故事書名稱
  // 填入故事書名稱

  bookTitle.innerText = bookName.value;

  //抓取使用者所填寫資料
  //抓取故事文字

  const PromptValue = TextPrompt.value;
  const textValue = text.value;

  if (pageName.innerText == "封面封底") {
    //所填入的書背文產生在故事書旁
    Image_text.innerText = textValue;
    // 並顯示書名
    bookTitle.hidden = false;
  } else {
    //所填入的內文產生在故事書旁
    Image_text.innerText = PromptValue;
  }

  //Get picture style
  const picSty = document.getElementsByName("picture-style");
  let picture_style = "";
  for (let i = 0; i < picSty.length; i++) {
    if (picSty[i].checked) {
      picture_style += picSty[i].value;
    }
  }
  console.log(picture_style);

  // 其他style
  const elseStyle = document.getElementById("elseStyle").value;

  //-------------------------------//
  //Get picture role
  const roll = document.querySelectorAll(".roll");

  let roleStyle = "";
  let roleValue;
  for (i = 1; i <= roll.length; i++) {
    roleValue = document.getElementById(`roll${i}`).value;
    roleStyle += `角色${i}:\n${roleValue}\n`;
  }
  console.log(roleStyle);
  //-------------------------------//
  //Get roleAction
  // 先獲取ID為"rollAction"的div元素
  const rollActionDiv = document.getElementById("rollAction");

  // 然後從該div元素中查找textarea
  const rollActionText = rollActionDiv.querySelector("textarea").value;

  //-------------------------------//
  //Get scene

  const sceneDiv = document.getElementById("scene");

  const sceneText = sceneDiv.querySelector("textarea").value;

  //-------------------------------//

  //-------------------------------//
  //Della3 api
  // const Prompt = `character design,highly detailed,high quality,illustration,${picture_style} , a  ${Personality} ${role_sex} ${Role_type} is  ${Age} years old ,wear ${Wear}, ${Action} ${Mode} in ${rolePlace},a ${Object_color} ${Object_name} ${Object_place}`;
  const Prompt = `幫我產出一張圖片並且符合以下要求:\n圖片風格:\n${picture_style}${elseStyle}\n角色們的樣貌與穿著:\n${roleStyle}\n角色們在做什麼:\n${rollActionText}\n圖片場景:\n${sceneText}`;
  //
  console.log(Prompt);

  const data = {
    model: "dall-e-3",
    prompt: Prompt,
    n: 1,
    size: "1024x1024",
    response_format: "url",
    // response_format: "b64_json",
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
      // console.log(data.b64_json);
      console.log(data.url);

      console.log(data.revised_prompt);
      // addImages(data.b64_json, data.revised_prompt);
      addImages(data.url, data.revised_prompt);
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

  // imgAI.src = `data:image/jpeg;base64,${jsonData}`;
  imgAI.src = jsonData;

  // imgAI.alt = prompt;

  // 圖片產出後即可再次製作圖片
  startButton.disabled = false;
  // 圖片產出顯示故事書的title
}

//-------------------------------//
//左側按鈕功能
//-------
//按下假的更換頁面
let pageContain = document.querySelector("#page_container");

const page_scroll = document.getElementById("page_scroll");
const bookName_contain = document.getElementById("bookName_contain");
const backCover_contain = document.getElementById("backCover_contain");
const textPrompt_contain = document.getElementById("textPrompt_contain");
// const coverColor = document.getElementById("coverColor");
// const textBgColor = document.getElementById("textBgColor");
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

    // 顯示製作完的圖片
    if (
      localStorage.getItem(`${pageName.innerText}_Image`) == null ||
      localStorage.getItem(`${pageName.innerText}_Image`) == undefined
    ) {
      imgAI.src = "../picture/storyPicContainer3.png";
    } else imgAI.src = localStorage.getItem(`${pageName.innerText}_Image`);

    // 顯示文字以及文字input的value
    if (
      localStorage.getItem(`${pageName.innerText}_Text`) == null ||
      localStorage.getItem(`${pageName.innerText}_Text`) == undefined
    ) {
      Image_text.innerText = "Showing story picture and content soon.";
      TextPrompt.value = "";
    } else {
      Image_text.innerText = localStorage.getItem(`${pageName.innerText}_Text`);
      if (pageName.innerText == "封面封底") {
        //所填入的書背文產生在故事書旁
        text.value = localStorage.getItem(`${pageName.innerText}_Text`);
      } else {
        //所填入的內文產生在故事書旁
        TextPrompt.value = localStorage.getItem(`${pageName.innerText}_Text`);
      }
    }

    //當點擊換頁時的是封面時故事書書名
    if (pageName.innerText == "封面封底") {
      if (
        localStorage.getItem(`Book_Title`) == null ||
        localStorage.getItem(`Book_Title`) == undefined
      ) {
        bookTitle.hidden = true;
      } else {
        bookTitle.hidden = false;
        bookTitle.innerText = localStorage.getItem(`Book_Title`);
      }
    } else {
      bookTitle.hidden = true;
    }

    // 右側文字頁顏色

    if (
      localStorage.getItem(`${pageName.innerText}_Background_color`) == null ||
      localStorage.getItem(`${pageName.innerText}_Background_color`) ==
        undefined
    ) {
      text_container.style.backgroundColor = "#c0a69d";
      Image_text.style.color = "#f8f8f8";
    } else {
      text_container.style.backgroundColor = localStorage.getItem(
        `${pageName.innerText}_Background_color`
      );
      Image_text.style.color = localStorage.getItem(
        `${pageName.innerText}_Text_color`
      );
    }

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
const bookNameCss = document.getElementById("bookNameCss");
const visualEditing = document.getElementById("visualEditing");
const changePageInner = function () {
  console.log(`pagename==${pageName.innerText}`);
  if (pageName.innerText == "封面封底") {
    textPrompt_contain.style.display = "none";
    // textBgColor.style.display = "none";
    // coverColor.style.display = "block";
    bookName_contain.style.display = "block";
    backCover_contain.style.display = "block";
    text_container.style.alignItems = "end";
    Image_text.style.paddingBottom = "20px";
    bookNameCss.style.display = "flex";
    visualEditing.style.justifyContent = "space-between";
    console.log("cover");
  } else {
    textPrompt_contain.style.display = "block";
    // textBgColor.style.display = "block";
    bookName_contain.style.display = "none";
    backCover_contain.style.display = "none";
    bookNameCss.style.display = "none";
    visualEditing.style.justifyContent = "flex-end";

    // coverColor.style.display = "none";
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
  creat_Pagebtn.innerText = `第${pageBtn.length}頁`;
  creat_Pagebtn.className = "page-btn";

  //將新增的東西放入父級別
  pageContain.appendChild(creat_Pagebtn);
};

// //更換背景顏色

// const bg_color = document.getElementsByClassName("bg_color");
// const colorSelect = document.getElementById("colorSelect");
// const image_text = document.getElementById("image_text");

// colorSelect.addEventListener("click", (e) => {
//   //並不是父級別裡的所有CSS感應到，而是僅限於class="bg_color"
//   if (e.target.classList.contains("bg_color")) {
//     const container_color = e.target.getAttribute("data-background");
//     const container_text = e.target.getAttribute("data-text");

//     text_container.style.background = container_color;
//     image_text.style.color = container_text;
//   }
// });

// //更換背景顏色之選項btn顏色
// console.log(bg_color);
// for (i = 0; i < bg_color.length; i++) {
//   bg_color[i].style.backgroundColor =
//     bg_color[i].getAttribute("data-background");
//   bg_color[i].style.color = bg_color[i].getAttribute("data-text");
// }

//reset 按鈕

// const reset_btn = document.getElementById("reset-btn");

// reset_btn.addEventListener("click", () => {
//   document.getElementById("allForm").reset();
// });

// //更換背景顏色、文字顏色、標題位置
const colorWell = document.getElementById("colorWell");
const textSize = document.getElementById("textSize");
const colorWell2 = document.getElementById("colorWell2");
const colorWell3 = document.getElementById("colorWell3");

//當調色盤轉動時即時更新顏色，並且儲存
colorWell.addEventListener("input", function () {
  bookTitle.style.color = colorWell.value;
  localStorage.setItem("Book_Title_color", bookTitle.style.color);
});

colorWell2.addEventListener("input", function () {
  text_container.style.backgroundColor = colorWell2.value;
  localStorage.setItem(
    `${pageName.innerText}_Background_color`,
    text_container.style.backgroundColor
  );
});

colorWell3.addEventListener("input", function () {
  Image_text.style.color = colorWell3.value;
  localStorage.setItem(
    `${pageName.innerText}_Text_color`,
    Image_text.style.color
  );
});

//書名文字大小
textSize.addEventListener("input", function () {
  bookTitle.style.fontSize = textSize.value + "px";
  localStorage.setItem(`Book_Title_size`, bookTitle.style.fontSize);
});

//書名位置移動
function moveText(direction) {
  const step = 5; // 每次移动的像素
  let left = window.getComputedStyle(bookTitle).left.replace("px", "");
  let top = window.getComputedStyle(bookTitle).top.replace("px", "");

  // console.log(bookTitle.style.color);
  console.log(window.getComputedStyle(bookTitle).left);
  switch (direction) {
    case "left":
      console.log(left);
      console.log(step);
      bookTitle.style.left = `${parseInt(left) - step}px`;
      console.log(bookTitle.style.left);
      console.log(`${left - step}%`);
      localStorage.setItem(`Book_Title_left`, left);

      break;
    case "right":
      bookTitle.style.left = `${parseInt(left) + step}px`;
      localStorage.setItem(`Book_Title_left`, left);

      break;
    case "up":
      bookTitle.style.top = `${parseInt(top) - step}px`;
      localStorage.setItem(`Book_Title_top`, top);

      break;
    case "down":
      bookTitle.style.top = `${parseInt(top) + step}px`;
      localStorage.setItem(`Book_Title_top`, top);

      break;
  }
}

// 增加角色樣貌
rollBtn.onclick = function () {
  //新增roll
  const creat_role = document.createElement("div");
  creat_role.setAttribute("class", "roll");

  //看目前有幾個roll，根據roll數量來命名現在第幾頁
  const roll = document.querySelectorAll(".roll");
  console.log(roll);

  // 取label名字;
  const role_label = document.createElement("label");
  role_label.setAttribute("for", `roll${roll.length + 1}`);
  role_label.innerText = `角色${roll.length + 1}`;

  // 新增textarea
  const role_textarea = document.createElement("textarea");
  role_textarea.setAttribute("id", `roll${roll.length + 1}`);

  //將新增的東西放入父級別
  document.getElementById("rollStyle").appendChild(creat_role);
  creat_role.appendChild(role_label);
  creat_role.appendChild(role_textarea);
};

// 打開網站立刻取得儲存資料
function showNow() {
  //input顯示故事書名稱以及封底文字
  bookName.value = localStorage.getItem("Book_Title");
  text.value = localStorage.getItem(" 封面封底_Text");

  // 如果有封面圖片則顯示、如果有封底文字則顯示在圖片上
  if (
    localStorage.getItem(`封面封底_Image`) == null ||
    localStorage.getItem(`封面封底_Image`) == undefined
  ) {
    imgAI.src = "../picture/storyPicContainer3.png";
  } else imgAI.src = localStorage.getItem(`封面封底_Image`);

  if (
    localStorage.getItem(`封面封底_Text`) == null ||
    localStorage.getItem(`封面封底_Text`) == undefined
  ) {
    Image_text.innerText = "開始製作圖片後，故事標語將顯示在此封底";
  } else {
    Image_text.innerText = localStorage.getItem(`封面封底_Text`);
    text.value = localStorage.getItem(`封面封底_Text`);
  }

  if (
    localStorage.getItem(`Book_Title`) == null ||
    localStorage.getItem(`Book_Title`) == undefined
  ) {
    bookTitle.hidden = true;
  } else {
    bookTitle.hidden = false;
    bookTitle.innerText = localStorage.getItem(`Book_Title`);
    bookTitle.style.color = localStorage.getItem(`Book_Title_color`);
    bookTitle.style.fontSize = localStorage.getItem(`Book_Title_size`);
    bookTitle.style.left = localStorage.getItem(`Book_Title_left`);
    bookTitle.style.top = localStorage.getItem(`Book_Title_top`);
  }

  // 右側文字頁

  if (
    localStorage.getItem(`封面封底_Background_color`) == null ||
    localStorage.getItem(`封面封底_Background_color`) == undefined
  ) {
    text_container.style.backgroundColor = "#c0a69d";
    Image_text.style.color = "#f8f8f8";
  } else {
    text_container.style.backgroundColor = localStorage.getItem(
      `封面封底_Background_color`
    );
    Image_text.style.color = localStorage.getItem(`封面封底_Text_color`);
  }

  imgAI.alt = "";
}

showNow();
pageNum();
// 一開始顯示頁數
function pageNum() {
  console.log("pageNumu有跑");
  for (i = 3; i <= 40; i++) {
    if (
      localStorage.getItem(`第${i}頁_Text`) == null ||
      localStorage.getItem(`第${i}頁_Text`) == undefined
    ) {
      break;
    } else {
      //新增button
      const creat_Pagebtn = document.createElement("button");

      //看目前有幾個button，根據button數量來命名現在第幾頁
      const pageBtn = document.querySelectorAll(".page-btn");
      console.log(pageBtn);
      creat_Pagebtn.innerText = `第${pageBtn.length}頁`;
      creat_Pagebtn.className = "page-btn";

      //將新增的東西放入父級別
      pageContain.appendChild(creat_Pagebtn);
    }
  }
}
