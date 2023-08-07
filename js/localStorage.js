

let imageIntervalid;

startButton.addEventListener('click', function (e) {


    //先取得原始的圖片網址
    const Image = document.getElementById('image');

    //獲得該頁是哪一頁
    const pageName = document.getElementById('pageName');


    
    originSrc = Image.src;
    // console.log(`照片網址${Image.src}`);

    // 測試區域
    // console.log(`originSrc.src${originSrc}`);

    const base64_src = getBase64Image(originSrc, function(dataUrl) {
        console.log('RESULT:', dataUrl)
      });
   
    console.log(`base64_src:${base64_src}`);
    localStorage.setItem("originSrc", base64_src);
    // 測試區域

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

        // const image = `${pageName.innerText}_Image`;
        // const base64_src = getBase64Image(Image.src);
        // console.log(`base64_src:${base64_src}`);
        // localStorage.setItem(image, base64_src);

        //停止冒泡
        stopInterval();
    }

}

//停止冒泡
function stopInterval() {
    clearInterval(imageIntervalid);
}

//將圖片網址轉換成base64，讓列印可以偵測到


function getBase64Image(src, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      console.log(dataURL);
      console.log("我會跑");
      submit_btn.appendChild(canvas);

      callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
    }
  }


  
  










