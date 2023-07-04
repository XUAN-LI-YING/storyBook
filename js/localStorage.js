

let imageIntervalid;

startButton.addEventListener('click', function (e) {

    //先取得原始的圖片網址
    const Image = document.getElementById('image');

    originSrc = Image.src;
    console.log(`照片網址${Image.src}`);

    //儲存文字內容
    localStorage.setItem('Image_text', Image_text.innerText);
    //儲存內容區域背景顏色
    //讀取CSS中的值而不是HTML裡的style
    localStorage.setItem('background_color', window.getComputedStyle(text_container, null).getPropertyValue("background-color"));
    

    //儲存內容區域文字顏色
    localStorage.setItem('text_color', window.getComputedStyle(image_text, null).getPropertyValue("color"));

    //計時器，每一秒跑一次storageImage
    imageIntervalid = setInterval(storageImage, 1000);

});


function storageImage() {
    //重新冒泡檢查圖片使否已經產出
    const Image = document.getElementById('image');
    console.log(`照片網址${Image.src}`);

    //如果圖片產出了，也就是說和原本一開始偵測到的圖片不一樣，則將後來產出的圖片儲存
    if (Image.src != originSrc) {
        localStorage.setItem('image', Image.src);

        //停止冒泡
        stopInterval();
    }

}

//停止冒泡
function stopInterval() {
    clearInterval(imageIntervalid);
}

