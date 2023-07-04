const http = require("http");
const fs = require("fs");

const sendResponse = (filename, statusCode, response) => {
    fs.readFile(`../html/${filename}`, (error, data) => {
        if (error) {
            response.statusCode = 500;
            response.setHeader("Content-Type", "text/plain");
            response.end("sorry,Internal error");
        } else {
            response.statusCode = statusCode;
            response.setHeader("Content-Type", "text/html");
            response.end(data);
        }
    });
};
const server = http.createServer((request, response) => {
    const method = request.method;
    const url = request.url;
    if (method === "GET") {
        if (url === "/") {
            sendResponse("makePage.html", 200, response);
            
        }   
        else if (url === "/test.html") {
            sendResponse("test.html", 200, response);

        }
        else {
            sendResponse("error.html", 404, response);

        }
    }
    else{
        if(url==="/data_store"){
            let body=[];
            //將數據提交進緩衝區
            request.on("data",(chunk)=>{
                body.push(chunk);
            })
            //將緩衝區的數據打包成一個
            request.on("end",()=>{
                body=Buffer.concat().toString();
                console.log(body);
            })
        }
    }
    console.log(request.url, request.method);
         
});
const port = 3000;
const ip = "192.168.0.194";
server.listen(port, ip, () => {
    console.log(`Server is running at http://${ip}:${port}`);
});