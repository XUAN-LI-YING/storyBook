

let imageIntervalid;

startButton.addEventListener('click', function (e) {


  //先取得原始的圖片網址
  const Image = document.getElementById('image');

  //獲得該頁是哪一頁
  const pageName = document.getElementById('pageName');


  //原本圖片照片網址
  originSrc = Image.src;
  // console.log(`照片網址${Image.src}`);

  // 測試區域
  // console.log(`originSrc.src${originSrc}`);

  // imageToBase64(originSrc);


  // 測試區域

  // 儲存書名
  if (pageName.innerText == "Cover") {
    localStorage.setItem("Book_Title", bookTitle.innerText);
  }


  //儲存文字內容
  const text = `${pageName.innerText}_Text`;
  localStorage.setItem(text, Image_text.innerText);


  //儲存內容區域背景顏色
  //讀取CSS中的值而不是HTML裡的style
  const background_color = `${pageName.innerText}_Background_color`;
  localStorage.setItem(background_color, window.getComputedStyle(text_container, null).getPropertyValue("background-color"));


  //儲存內容區域文字顏色
  const text_color = `${pageName.innerText}_Text_color`;
  localStorage.setItem(text_color, window.getComputedStyle(image_text, null).getPropertyValue("color"));

  //計時器，每一秒跑一次storageImage
  imageIntervalid = setInterval(storageImage, 1000);

});


function storageImage() {
  //重新冒泡檢查圖片使否已經產出
  const Image = document.getElementById('image');
  // console.log(`照片網址${Image.src}`);
  // console.log(` originSrc${originSrc}`);
  //如果圖片產出了，也就是說和原本一開始偵測到的圖片不一樣，則將後來產出的圖片儲存
  if (Image.src != originSrc) {

    console.log(`originSrc.src : ${originSrc}`);
    console.log(`Image.src : ${Image.src}`);

    localStorage.setItem(`${pageName.innerText}_Image`, Image.src);
    imageToBase64(Image.src);
    // console.log(`base64_src : ${base64_src}`);
    // localStorage.setItem(`${pageName.innerText}_Image`, base64_src);

    //停止冒泡
    stopInterval();
  }

}

//停止冒泡
function stopInterval() {
  clearInterval(imageIntervalid);
}

//將圖片網址轉換成base64，讓列印可以偵測到

// function getBase64Image(src, callback, outputFormat) {

// function getBase64Image(src, callback) {
//   var img = new Image();
//   img.crossOrigin = 'Anonymous';
//   img.onload = function () {
//     var canvas = document.createElement('CANVAS');
//     var ctx = canvas.getContext('2d');
//     // var dataURL;
//     canvas.height = img.naturalHeight;
//     canvas.width = img.naturalWidth;
//     ctx.drawImage(img, 0, 0);
//     // dataURL = canvas.toDataURL(outputFormat);
//     var dataURL = canvas.toDataURL("image/png");

//     console.log(dataURL);
//     console.log("我會跑");
//     submit_btn.appendChild(canvas);

//     callback(dataURL);
//     var base64URL = dataURL.replace(/^data:image\/?[A-z]*;base64,/);
//     console.log(base64URL);
//     return base64URL;

//   };
//   img.src = src;
//   // if (img.complete || img.complete === undefined) {
//   //   img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
//   //   img.src = src;
//   // }
// }

imageToBase64 = (URL) => {
  let image;
  image = new Image();
  image.crossOrigin = 'Anonymous';
  image.addEventListener('load', function () {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
    try {
      const base64URL = canvas.toDataURL("image/jpeg", 0.5);

      console.log(base64URL.length);
      console.log(localStorage.length);

      localStorage.setItem(`${pageName.innerText}_base64Image`, base64URL);
      console.log(canvas.toDataURL("image/jpeg", 0.5));


    } catch (err) {
      console.error(err)
      alert('Web have some trouble... \n Please make again. SORRY!');


    }
  });
  image.src = URL;
};













