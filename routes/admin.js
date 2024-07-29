var express = require("express")
var exe = require("./connection")
var route = express.Router()

route.get("/",function(req,res){
    res.render("admin/home.ejs")
})

route.get("/dashboard",function(req,res){
    res.render("admin/dashboard.ejs")
})

// BASIC INFO
route.get("/basic_information",async function(req,res){
    var data = await exe("SELECT * FROM basic_information")
    res.render("admin/basic_information.ejs",{"basic_info":data[0]})
})
route.post("/save_basic_information",async function(req,res){
    var d = req.body
    // var sql = `INSERT INTO basic_information (mobile_no,email_id,adress,twitter_link,facebook_link,
    //     linkedin_link,instagram_link,google_map_link,heading) VALUES ('${d.mobile_no}','${d.email_id}',
    //     '${d.adress}','${d.twitter_link}','${d.facebook_link}','${d.linkedin_link}','${d.instagram_link}',
    //     '${d.google_map_link}','${d.heading}')`

    var sql = `UPDATE basic_information SET mobile_no='${d.mobile_no}',email_id='${d.email_id}',
        adress='${d.adress}',twitter_link='${d.twitter_link}',facebook_link='${d.facebook_link}',
        linkedin_link='${d.linkedin_link}',instagram_link='${d.instagram_link}',
        google_map_link='${d.google_map_link}',heading='${d.heading}'`
        await exe(sql)
        res.redirect('/admin/basic_information')
})

//slider
route.get("/slider",async function(req,res){
    var slides = await exe("SELECT * FROM slider")
    res.render("admin/slider.ejs",{"slides":slides})
})
route.post("/save_slider",async function(req,res){
    var slider_image = new Date().getTime()+req.files.slider_image.name;
    req.files.slider_image.mv("public/img/"+slider_image)
    var d = req.body
    var sql = `INSERT INTO slider(slider_image,slider_short_title,slider_title) VALUES ('${slider_image}','${d.slider_short_title}','${d.slider_title}')`
    var data = await exe(sql)
    res.redirect("/admin/slider")
})
route.get("/delete_slider/:slider_id",async function(req,res){
    var id = req.params.slider_id;
    var sql = `DELETE FROM slider WHERE slider_id = '${id}'`;
    await exe(sql)
    res.redirect("/admin/slider")
})
route.get("/edit_slider/:slider_id",async function(req,res){
    var id = req.params.slider_id;
    var data = await exe (`SELECT * FROM slider WHERE slider_id = '${id}'`)
    res.render("admin/edit_slider.ejs",{"slider":data})
})
route.post("/update_slider",async function(req,res){
    var d = req.body
    if(req.files !=null){
        var slider_image = new Date().getTime()+req.files.slider_image.name
        req.files.slider_image.mv("public/img/"+slider_image)
        var sql = `UPDATE slider SET slider_image='${slider_image}' WHERE slider_id='${d.slider_id}'`
        await exe(sql)
    }
    var sql = `UPDATE slider SET slider_short_title='${d.slider_short_title}',slider_title='${d.slider_title}' WHERE slider_id='${d.slider_id}'`
    await exe(sql)
    res.redirect("/admin/slider")
})

//OPENING HOURS
route.get("/opening_hours",async function(req,res){
    var data = await exe("SELECT * FROM opening_hours")
    res.render("admin/opening_hours.ejs",{"open_hours":data})
})
route.post("/save_opening_hours",async function(req,res){
    var d = req.body
    var sql = `INSERT INTO opening_hours(day,open_time,close_time) VALUES ('${d.day}','${d.open_time}','${d.close_time}')`
    var data = await exe(sql)
    res.redirect("/admin/opening_hours")
})
route.get("/delete_open_hours/:id",async function(req,res){
    var id = req.params.id;
    var sql = `DELETE from opening_hours WHERE opening_hours_id = '${id}'`
    await exe(sql)
    res.redirect("/admin/opening_hours")
})
route.get("/edit_open_hours/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM opening_hours WHERE opening_hours_id='${id}'`)
    res.render("admin/edit_opening_hours.ejs",{"open_hours":data})
})
route.post("/update_opening_hours",async function(req,res){
    var d = req.body;
    var sql = `UPDATE opening_hours SET day='${d.day}',open_time='${d.open_time}',close_time='${d.close_time}'
    WHERE opening_hours_id = '${d.opening_hours_id}'`
    await exe(sql)
    res.redirect("/admin/opening_hours")
})

// ABOUT US
route.get("/about_us",async function(req,res){
    var data =await exe("SELECT * FROM about_us")
    res.render("admin/about_us.ejs",{"about_det":data[0]})
})
route.post("/save_about_info",async function(req,res){
    if(req.files){
        var about_image = new Date().getTime()+req.files.about_image.name
        req.files.about_image.mv("public/img/"+about_image)
        var sql = `UPDATE about_us SET about_image='${about_image}'`
        await exe(sql)
    }
    var d = req.body
    var sql = `UPDATE about_us SET heading = '${d.heading}',sub_heading='${d.sub_heading}',details='${d.details}
    ',key_points1='${d.key_points1}',key_points2='${d.key_points2}',key_points3='${d.key_points3}',
    key_points4='${d.key_points4}'`

    var data = await exe(sql)
    // var data = await exe("INSERT INTO about_us(heading) VALUES ('')")
    res.redirect("/admin/about_us")
})


// SERVICES HEADING
route.get("/services_heading",async function(req,res){
    var data = await exe("SELECT * FROM service_heading")
    res.render("admin/services_heading.ejs",{"service_det":data})
})  
route.post("/save_service_heading",async function(req,res){
    if(req.files){
        if(req.files.before_image){
            var before_image = new Date().getTime()+req.files.before_image.name
            req.files.before_image.mv("public/img/"+before_image)
            var sql = `UPDATE service_heading SET before_image = '${before_image}'`
            await exe(sql)
        }
        if(req.files.after_image){
            var after_image = new Date().getTime()+req.files.after_image.name
            req.files.after_image.mv("public/img/"+after_image)
            var sql = `UPDATE service_heading SET after_image = '${after_image}'`
            await exe(sql)
        }
    }
     // heading
     var d = req.body
    //  var sql = `INSERT INTO service_heading (heading) VALUES ('')`
    var sql = `UPDATE service_heading SET heading = '${d.heading}'`
    await exe(sql)
    res.redirect("/admin/services_heading")
})

// SERVICES
route.get("/manage_services",async function(req,res){
    var data = await exe("SELECT * FROM service")
    res.render("admin/manage_services.ejs",{"services":data})
})
route.post("/save_service",async function(req,res){
    var service_image = new Date().getTime()+req.files.service_image.name
    req.files.service_image.mv("public/img/"+service_image)
    var d = req.body
    var sql = `INSERT INTO service(service_name,service_image,service_price,
        key_point1,key_point2,key_point3) VALUES ('${d.service_name}','${service_image}','${d.service_price}'
        ,'${d.key_point1}','${d.key_point2}','${d.key_point3}')`
    var data = await exe(sql)
    res.redirect("/admin/manage_services")
})
route.get("/delete_services/:id",async function(req,res){
    var id = req.params.id;
    var sql = `DELETE from service WHERE service_id='${id}'`
    await exe(sql)
    res.redirect("admin/manage_services")
})
route.get("/edit_services/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM service WHERE service_id='${id}'`)
    res.render("admin/edit_services.ejs",{"services":data})
})
route.post("/update_service",async function(req,res){
    var d = req.body;
    if(req.files != null){
        var service_image = new Date().getTime()+req.files.service_image.name
        req.files.service_image.mv("public/img/"+service_image)
        var sql =`UPDATE service SET service_image='${service_image}' WHERE service_id='${d.service_id}'`
        await exe(sql)
    }
    var sql = `UPDATE service SET service_name='${d.service_name}',service_price='${d.service_price}',
    key_point1='${d.key_point1}',key_point2='${d.key_point2}',key_point3='${d.key_point3}' 
    WHERE service_id='${d.service_id}'`
    await exe(sql)
    res.redirect("/admin/manage_services")
})


// USER INFO
route.get("/user_info",async function(req,res){
    var data = await exe("SELECT * FROM save_contact")
    res.render("admin/user_info.ejs",{"save_contact":data})
})

// DOCTORS
route.get("/doctors",async function(req,res){
    var service_list = await exe("SELECT * FROM service")
    var doctors = await exe("SELECT * FROM doctor")
    res.render("admin/doctors.ejs",{"service_list":service_list,"doctors":doctors})
})
route.post("/save_doctor",async function(req,res){
    var doctor_image = new Date().getTime()+req.files.doctor_image.name;
    req.files.doctor_image.mv("public/img/"+doctor_image);
    var d = req.body
    var sql = `INSERT INTO doctor(doctor_id,doctor_name,doctor_mobile,doctor_email,specialist
        ,doctor_service_id,twitter_link,facebook_link,linkedin_link,instagram_link,doctor_image) VALUES
        ('${d.doctor_id}','${d.doctor_name}','${d.doctor_mobile}','${d.doctor_email}','${d.specialist}',
        '${d.doctor_service_id}','${d.twitter_link}','${d.facebook_link}','${d.linkedin_link}','${d.instagram_link}',
        '${doctor_image}') `

    var data = await exe(sql)
    res.redirect("/admin/doctors")
})
route.get("/delete_doctors/:id",async function(req,res){
    var id = req.params.id;
    var sql = `DELETE from doctor WHERE doctor_id='${id}'`
    await exe(sql)
    res.redirect("admin/doctors.ejs")
})
route.get("/edit_doctors/:id",async function(req,res){
    var id = req.params.id;
    var service_list = await exe("SELECT * FROM service")
    var data =await exe(`SELECT * FROM doctor WHERE doctor_id='${id}'`)
    res.render("admin/edit_doctors.ejs",{"doctors":data,"service_list":service_list})
})
route.post("/update_doctors",async function(req,res){
    var d = req.body;
    if(req.files != null){
        var doctor_image = new Date().getTime()+req.files.doctor_image.name;
        req.files.doctor_image.mv("public/img/"+doctor_image);
        var sql = `UPDATE doctor SET doctor_image='${doctor_image}' WHERE doctor_id='${d.doctor_id}'`
        await exe(sql)
    }
    var sql = `UPDATE doctor SET doctor_name='${d.doctor_name}',doctor_mobile='${d.doctor_mobile}',doctor_email='${d.doctor_email}',
    specialist='${d.specialist}',doctor_service_id='${d.doctor_service_id}',twitter_link='${d.twitter_link}',facebook_link='${d.facebook_link}',
    linkedin_link='${d.linkedin_link}',instagram_link='${d.instagram_link}' WHERE doctor_id='${d.doctor_id}'`
    await exe(sql)
    res.redirect("/admin/doctors")
})
module.exports = route

// CREATE TABLE basic_information(basic_information_id INT PRIMARY KEY AUTO_INCREMENT,mobile_no VARCHAR(10),email_id VARCHAR(200),adress TEXT, twitter_link TEXT, facebook_link Text, linkedin_link TEXT, instagram_link TEXT, google_map_link TEXT, heading TEXT)
// CREATE TABLE slider (slider_id INT PRIMARY KEY AUTO_INCREMENT, slider_image TEXT,slider_short_title TEXT,slider_title TEXT)
// CREATE TABLE opening_hours(opening_hours_id INT PRIMARY KEY AUTO_INCREMENT,day TEXT, open_time VARCHAR(100),close_time VARCHAR(100))
// CREATE TABLE about_us(about_id INT PRIMARY KEY AUTO_INCREMENT,heading TEXT, sub_heading TEXT,about_image TEXT, details TEXT,key_points1 VARCHAR(10),key_points2 VARCHAR(10),key_points3 VARCHAR(10),key_points4 VARCHAR(10))
// CREATE TABLE service_heading(service_heading_id INT PRIMARY KEY AUTO_INCREMENT,heading TEXT,before_image TEXT,after_image TEXT)
// CREATE TABLE service(service_id INT PRIMARY KEY AUTO_INCREMENT,service_name VARCHAR(40),service_image TEXT)
// CREATE TABLE doctor(doctor_id INT PRIMARY KEY AUTO_INCREMENT, doctor_name Varchar(200),doctor_mobile VARCHAR(13),doctor_email VARCHAR(80),specialist VARCHAR(200),doctor_service_id INT,twitter_link TEXT, facebook_link TEXT,linkedin_link TEXT, instagram_link TEXT)



