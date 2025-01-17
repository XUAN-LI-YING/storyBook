const cover_image = document.getElementById("cover_image");
const CoverText = document.getElementById("CoverText");
const cover_text = document.getElementById("cover_text");
const bookTitle = document.getElementById("bookTitle");
const StorageLength = localStorage.length;
console.log(StorageLength);

//下在此頁PDF檔
// const download_element = document.getElementById("storyContainer");

// var opt = {
//   margin: 1,
//   filename: "mystory.pdf",
//   image: { type: "PNG", quality: 0.98 },
//   html2canvas: { scale: 4 },
//   jsPDF: { unit: "mm", format: [210, 297], orientation: "landscape" },
// };

// html2pdf(download_element, opt);

//取出故事書資料
function getItem() {
  //取出封面資料，

  //從資料中取出圖片網址，使FINISH網頁中的COVER獲得網址
  const imageScr = localStorage.getItem("封面封底_Image");
  console.log(imageScr);
  cover_image.src = imageScr;

  //從資料中提取文字以及背景顏色
  const textBgColor = localStorage.getItem("封面封底_Background_color");
  const textColor = localStorage.getItem("封面封底_Text_color");
  const text = localStorage.getItem("封面封底_Text");
  // 提取書名
  const bookName = localStorage.getItem("Book_Title");
  // 提取書名樣式
  const bookName_top = localStorage.getItem("Book_Title_top");
  const bookName_left = localStorage.getItem("Book_Title_left");
  const bookName_color = localStorage.getItem("Book_Title_color");
  const bookName_size = localStorage.getItem("Book_Title_size");

  console.log(textBgColor);
  console.log(textColor);

  CoverText.style.background = textBgColor;
  cover_text.style.color = textColor;
  cover_text.innerText = text;
  bookTitle.innerText = bookName;
  bookTitle.style.color = bookName_color;
  bookTitle.style.fontSize = bookName_size;
  bookTitle.style.left = bookName_left;
  bookTitle.style.top = bookName_top;

  // ---------------------------------------------
  // 取出內頁資料

  // 計算有幾頁內頁
  const pageNum = localStorage.getItem("目前頁數");
  console.log(pageNum);

  //依序新增每一頁並將每一頁的資料放入
  for (let i = 1; i <= pageNum; i++) {
    // ------------------------------
    //產生該頁的HTML

    //列印分割頁面語法
    const pageBreak = document.createElement("div");

    const innerPageAll = document.getElementById("innerPageAll");
    const innerPage = document.createElement("div");
    const PageImage = document.createElement("div");
    const page_image = document.createElement("img");
    const PageText = document.createElement("div");
    const page_text = document.createElement("p");

    //將innerPage加上class並歸在innerPageAll父物件之下的子物件
    innerPage.setAttribute("class", "innerPage");
    innerPageAll.appendChild(innerPage);

    PageImage.setAttribute("class", "PageImage");
    innerPage.appendChild(PageImage);

    PageText.setAttribute("class", "PageText");
    PageText.setAttribute("id", `page${i}Text`);
    innerPage.appendChild(PageText);

    page_image.setAttribute("class", "page_image");
    page_image.setAttribute("id", `page${i}_image`);
    PageImage.appendChild(page_image);

    page_text.setAttribute("class", "page_text");
    page_text.setAttribute("id", `page${i}_text`);
    PageText.appendChild(page_text);

    //頁面分割html
    pageBreak.setAttribute("class", "html2pdf__page-break");
    innerPageAll.appendChild(pageBreak);

    // ------------------------------
    // 取出該頁的資料
    const PageImageKey = localStorage.getItem(`第${i}頁_Image`);
    const PageTextKey = localStorage.getItem(`第${i}頁_Text`);
    const PageTextColorKey = localStorage.getItem(`第${i}頁_Text_color`);
    const PageBgColorKey = localStorage.getItem(`第${i}頁_Background_color`);

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
