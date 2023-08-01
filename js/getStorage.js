const cover_image = document.getElementById('cover_image');
const CoverText = document.getElementById('CoverText');
const cover_text = document.getElementById('cover_text');
const StorageLength = localStorage.length;
console.log(StorageLength);

function getItem() {

    //取出封面資料，

    //從資料中取出圖片網址，使FINISG網頁中的COVER獲得網址
    const imageScr = localStorage.getItem('Cover_Image');
    console.log(imageScr);
    cover_image.src = imageScr;

    //從資料中提取文字以及背景顏色
    const textBgColor = localStorage.getItem('Cover_Background_color');
    const textColor = localStorage.getItem('Cover_Text_color');
    const text = localStorage.getItem('Cover_Text');

    console.log(textBgColor);
    console.log(textColor);

    CoverText.style.background = textBgColor;
    cover_text.style.color = textColor;
    cover_text.innerText = text;

    // ---------------------------------------------
    // 取出內頁資料

    // 計算有幾頁內頁
    const pageNum = (StorageLength / 4) - 1;
    console.log(pageNum);

    //依序新增每一頁並將每一頁的資料放入
    for (let i = 1; i <= pageNum; i++) {


        // ------------------------------
        //產生該頁的HTML
        const innerPageAll = document.getElementById('innerPageAll');
        const innerPage = document.createElement('div');
        const PageImage = document.createElement('div');
        const page_image = document.createElement('img');
        const PageText = document.createElement('div');
        const page_text = document.createElement('p');


        //將innerPage加上class並歸在innerPageAll父物件之下的子物件
        innerPage.setAttribute('class', 'innerPage');
        innerPageAll.appendChild(innerPage);

        PageImage.setAttribute('class', 'PageImage');
        innerPage.appendChild(PageImage);

        PageText.setAttribute('class', 'PageText');
        PageText.setAttribute('id', `page${i}Text`);
        innerPage.appendChild(PageText);

        page_image.setAttribute('class', 'page_image');
        page_image.setAttribute('id', `page${i}_image`);
        PageImage.appendChild(page_image);

        page_text.setAttribute('class', 'page_text');
        page_text.setAttribute('id', `page${i}_text`);
        PageText.appendChild(page_text);

        // ------------------------------
        // 取出該頁的資料
        const PageImageKey = localStorage.getItem(`Page ${i}_Image`);
        const PageTextKey = localStorage.getItem(`Page ${i}_Text`);
        const PageTextColorKey = localStorage.getItem(`Page ${i}_Text_color`);
        const PageBgColorKey = localStorage.getItem(`Page ${i}_Background_color`);

        //從資料中取出圖片網址，使FINISH網頁中的page獲得網址
        const imageScr = PageImageKey;
        console.log(imageScr);

        document.getElementById(`page${i}_image`).src = imageScr;

        //從資料中提取文字以及背景顏色
        const textBgColor = PageBgColorKey;
        const textColor = PageTextColorKey;
        const text = PageTextKey;

        console.log(textBgColor);
        console.log(textColor);

        document.getElementById(`page${i}Text`).style.background = textBgColor;
        document.getElementById(`page${i}_text`).style.color = textColor;
        document.getElementById(`page${i}_text`).innerText = text;

    }

}

getItem();
