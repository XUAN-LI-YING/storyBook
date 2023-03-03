const startButton = document.getElementById('finish-btn');

startButton.onclick = function () {

    //按鈕無法讓使用者按，避免使用者重複送出
    startButton.disabled = true;
    alert('Creating picture now \n Please wait...');

    //抓取使用者所填寫資料
    //抓取故事文字
    const TextPrompt = document.getElementById('text-prompt').value;

    console.log(TextPrompt);


    //產生文字在故事書旁
    const Image_text = document.getElementById('image_text');
    Image_text.innerText = TextPrompt;


    //Get picture style
    const picSty = document.getElementsByName('picture-style');
    let picture_style;
    for (let i = 0; i < picSty.length; i++) {
        if (picSty[i].checked) {
            picture_style = picSty[i].value;
            break;
        }
    }
    console.log(picture_style);


    //角色位置
    const rolePlace = document.getElementById('place').value;
    console.log(rolePlace);
    //-------------------------------//

    //增加Role

    //What kind of role
    const rolTyp = document.getElementsByName('role-type');
    let Role_type;
    for (let i = 0; i < rolTyp.length; i++) {
        if (rolTyp[i].checked) {
            switch (i) {
                case 0:
                    Role_type = "";
                    break;
                case 1:
                    Role_type = document.getElementById('animal-type').value;
                    break;
                case 2:
                    Role_type = document.getElementById('other-type').value;
                    break;

            }
        }
        console.log(Role_type);
    }


    //sex
    const roleSex = document.getElementsByName('sex');
    let role_sex;
    for (let i = 0; i < roleSex.length; i++) {
        if (roleSex[i].checked) {
            role_sex = roleSex[i].value;
            break;
        }
    }

    //如果腳色是能類則是用女孩男孩去形容
    if( Role_type == ""&&role_sex=="female")
    {
        role_sex="girl";
    }
    else if(Role_type == ""&&role_sex=="male")
    {
        role_sex="boy";

    }

    console.log(role_sex);


    //年齡
    const Age = document.getElementById('age').value;

    //心情
    const Mode = document.getElementById('mode').value;

    //動作
    const Action = document.getElementById('action').value;

    //穿著
    const Wear = document.getElementById('wear').value;

    //個性
    const Personality = document.getElementById('personality').value;

    console.log(Age + Mode + Action + Wear + Personality);
    //-------------------------------//

    //-------------------------------//
    //增加Scene Object

    //物件名稱
    const Object_name = document.getElementById('object-name').value;

    //物件顏色
    const Object_color = document.getElementById('object-color').value;

    //物件位置
    const Object_place = document.getElementById('object-place').value;

    console.log(Object_name + Object_color + Object_place);

    //-------------------------------//

    //-------------------------------//
    //api
    const Prompt = `${picture_style} , a  ${Personality} ${role_sex} ${Role_type} is  ${Age} years old ,wear ${Wear}, ${Action} ${Mode} in ${rolePlace},a ${Object_color} ${Object_name} ${Object_place}`
    console.log(Prompt);

    const data = {
        'prompt': Prompt,
        'n': 1,
        'size': "256x256",
        response_format: 'url',
    };

    //'Bearer api-key'
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`,
        },

        body: JSON.stringify(data) //不太懂一定要有這行才能有res.json()
    }

    const URL = "https://api.openai.com/v1/images/generations"

    fetch(URL, config)
        .then(res => res.json())   //不太懂res.json()
        .then(json => addImages(json, prompt)) //不太懂json,prompt哪來得他又不知道vaule為多少
        .catch(error => {   //關於 try catch 他產生例外但為什麼上面的有些會運作有些不會

            alert('Web have some trouble... \n Engineer is doing maintenance');
            startButton.disabled = false;
            console.log(json.error.message);

        })

}

//-------------------------------//
//將產出的網址變為IMAGE顯示在畫面中
function addImages(jsonData, prompt) {

    console.log("我會跑?");
    startButton.disabled = false;
    console.log(jsonData);

    if (jsonData.error) {
        reqStatus.innerHTML = 'ERROR: ' + jsonData.error.message;
        return;
    }

    // Parse the response object, deserialize the image data, 
    // and attach new images to the page.
    const container = document.getElementById('image-container');
    for (let i = 0; i < jsonData.data.length; i++) {
        let imgData = jsonData.data[i];
        const imgAI = document.getElementById('image');
        imgAI.src = imgData.url;
        imgAI.alt = prompt;
    }

}

//-------------------------------//

