const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');
const { log } = require('console');
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'Public')))
app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        // console.log(files);
        //when i have to send some data to index.ejs
        res.render('index.ejs',{files:files});
    })
    
})
app.post('/create',(req,res)=>{
    // create a file
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
        res.redirect('/');
    })
    
})
app.get('/files/:filename',(req,res)=>{
    console.log(req.params);
    fs.readFile(`./files/${req.params.filename}`,'utf-8', function(err,filedata){
        console.log(filedata);
        res.render('show',{data:filedata,filename:req.params.filename});
    })
   
})
app.get('/edit/:filename',(req,res)=>{
    res.render('Edit',{old_name:req.params.filename});
})
app.post('/edit',(req,res)=>{
    console.log(req.body);
    fs.rename(`./files/${req.body.old_name}`,`./files/${req.body.new_name.split(' ').join('')}`,(err)=>{
        res.render('Edit',{old_name:req.body.new_name.split(' ').join('')});
    });
})
app.listen(3001,()=>{
    console.log('sever is working......');
})