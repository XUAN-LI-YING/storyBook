const creatBtn = document.getElementById("creatBtn");
const storyResult = document.getElementById("storyResult");

function create() {
  creatBtn.disabled = true;
  alert("故事將在幾秒後產生於下方");
  // 抓取故事書頁數
  const pageNum = document.getElementById("pageNum").value;
  //   故事語言
  const language = document.getElementById("language").value;
  // 年齡
  const suitableAge = document.getElementById("suitableAge").value;
  // 故事大綱
  const contentInput = document.getElementById("contentInput").value;

  console.log(pageNum, language, suitableAge, contentInput);

  //   生成故事
  const data = {
    model: "gpt-4-0125-preview",
    messages: [
      {
        role: "system",
        content: "You are a writer of children's stories.",
      },
      {
        role: "user",
        content: `幫我撰寫一本適合${suitableAge}歲兒童的童書，需要${pageNum}個段落，並使用${language}撰寫。故事大綱為:${contentInput}。最重要的是回傳時請用以下格式回傳給我，不需要有多餘的解說: 書名:
        第一段:
        第二段:
        第三段:
        .....`,
      },
    ],
  };

  console.log(data.messages);
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

  const URL = " https://api.openai.com/v1/chat/completions";

  fetch(URL, config)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json);
      console.log(json.choices[0]);
      return json.choices[0];
    })
    .then((data) => {
      // console.log(data.b64_json);
      console.log(data.message.content);
      creatBtn.disabled = false;
      storyResult.value = data.message.content;
    })
    .catch((error) => {
      alert("Web have some trouble... \n Engineer is doing maintenance");
      creatBtn.disabled = false;
      console.log(error);
    });
}

// 重新生成按鈕跳轉
document.getElementById("oneMore").addEventListener("click", function () {
  location.href = "#storyForm";
});

// 下一步按鈕跳轉
document.getElementById("submitBtn").addEventListener("click", function () {
  nextPage();
});

async function nextPage() {
  await store(storyResult.value);
  location.href = "../html/imagePage.html";
}

// 修改按鈕按下可以修改
document.getElementById("revise").addEventListener("click", function () {
  storyResult.readOnly = false;
  console.log(storyResult);
});

// 儲存故事
function store(storyText) {
  console.log("我有跑");
  // 使用换行符分割故事文本为段落数组
  const paragraphs = storyText.split("\n\n");

  // 提取每个段落的内容
  const contentArray = paragraphs.map((paragraph) => {
    const colonIndex = paragraph.indexOf(":");
    // 提取冒号后面的所有文本，如果找到冒号，则提取，否则返回整个段落
    return colonIndex !== -1
      ? paragraph.slice(colonIndex + 1).trim()
      : paragraph.trim();
  });

  console.log(contentArray);

  for (let i = 0; i < contentArray.length; i++) {
    if (i == 0) {
      localStorage.setItem("Book_Title", contentArray[i]);
      console.log(contentArray[i]);
    } else {
      localStorage.setItem(`第${i}頁_Text`, contentArray[i]);
      console.log(contentArray[i]);
    }
  }
}
localStorage.setItem("Book_Title", 123);
