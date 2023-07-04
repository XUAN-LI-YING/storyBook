//引入module
const express=require('express');
const mysql=require("mysql");

const sever=express();

sever.listen('3000',()=>{
    console.log('Sever started on port 3000');
    
})