const cover = document.getElementById('cover');
const textContainer = document.getElementById('textContainer');
const cover_text = document.getElementById('cover_text');

function getItem() {
    //從資料中取出圖片網址，使FINISG網頁中的COVER獲得網址
    const imageScr = localStorage.getItem('image');
    console.log(imageScr);
    cover.src = imageScr;

    //從資料中提取文字以及背景顏色
    const textBgColor = localStorage.getItem('background_color');
    const textColor = localStorage.getItem('text_color');
    const text = localStorage.getItem('Image_text');

    console.log(textBgColor);
    console.log(textColor);

    textContainer.style.background = textBgColor;
    cover_text.style.color = textColor;
    cover_text.innerText = text;

}

getItem();
