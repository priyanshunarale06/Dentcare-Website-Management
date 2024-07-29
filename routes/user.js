var express = require("express")
var exe = require("./connection")
var route = express.Router();

route.get("/",async function(req,res){
    basic_info = await exe("SELECT * FROM basic_information")
    slides = await exe("SELECT * FROM slider")
    opening_hours = await exe("SELECT * FROM opening_hours")
    about_us = await exe("SELECT * FROM about_us")
    service_det = await exe("SELECT * FROM service_heading")
    services = await exe("SELECT * FROM service")
    doctors = await exe("SELECT * FROM doctor")
    res.render("user/home.ejs",{"basic_info":basic_info,"slides":slides,"opening_hours":opening_hours,"about_us":about_us,
    "service_det":service_det,"services":services,"doctors":doctors})
})

route.get("/about",async function(req,res){
    basic_info = await exe("SELECT * FROM basic_information")
    about_us = await exe("SELECT * FROM about_us")
    res.render("user/about.ejs",{"basic_info":basic_info,"about_us":about_us})
})

route.get("/service",async function(req,res){
    basic_info = await exe("SELECT * FROM basic_information")
    res.render("user/service.ejs",{"basic_info":basic_info})
})

route.get("/team",async function(req,res){
    basic_info = await exe("SELECT * FROM basic_information")
    services = await exe("SELECT * FROM service")
    doctors = await exe("SELECT * FROM doctor")
    res.render("user/team.ejs",{"basic_info":basic_info,"doctors":doctors,"services":services})
})

route.get("/contact",async function(req,res){
    basic_info = await exe("SELECT * FROM basic_information")
    res.render("user/contact.ejs",{"basic_info":basic_info})
})

route.get("/appointment",async function(req,res){
    basic_info = await exe("SELECT * FROM basic_information")
    var services = await exe("SELECT * FROM service")
    res.render("user/appointment.ejs",{"basic_info":basic_info,"services":services})
})

route.post("/save_contact_details",async function(req,res){
    var d = req.body
    var sql = `INSERT INTO save_contact (user_name,user_email,user_number,user_message) VALUES 
    ('${d.user_name}','${d.user_email}','${d.user_number}','${d.user_message}')`
    await exe(sql)
    res.render("user/contact.ejs")
})
module.exports = route

// CREATE TABLE save_contact(save_contact INT PRIMARY KEY AUTO_INCREMENT,user_name VARCHAR(20),user_email VARCHAR(30), user_number VARCHAR(30),user_message VARCHAR(40))