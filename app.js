const express=require('express');
const app=express();
const path=require('path');
const cookieParser=require('cookie-parser'); 
const stripe=require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const storeItems= new Map([1,{priceInRs:5000,name:'Sign Language'}])
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cookieParser());

const users=require('./routes/userRoute');
app.use('/api/v1',users);

module.exports=app;