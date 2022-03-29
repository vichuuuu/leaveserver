const express=require('express')
const app =express()
const cors = require('cors')
const db = require('./db_connection')
app.use(express.json())



app.use(cors({
    origin: 'http://localhost:3000'
}))

//admin functions
app.post("/login",(req,res)=>{
    const{username,password}=req.body
    db.User.findOne({username:username}).then(user => {
        if (user) {
            if (password == user.password) {

                res.json({
                    Status: 200,
                    message: "login successfull",
                    
                })
               

            } else {
                // res.status(402).send({ message: "incorrect password" })
                res.json({
                    Status: 404,
                    message: "incorrect password",
                 })
            }

        } else {
            res.send({ message: "user does not exist" })
        }
    })
})


app.post("/adduser",(req,res)=>{
    const{username,date_of_birth, age,email,emp_id,password,category,designation,mobile_number}=req.body
    db.Employee.findOne({emp_id}).then(user=>{
        if(user){
            res.send({ message: "already exist" })
        }else{
            const user = new db.Employee({
                username,
                date_of_birth,
                age,
                email,
                emp_id,
                password,
                category,
                designation,
                mobile_number
                
            })
            const emp=new db.User({
                username,
                emp_id,
                password,
                category
            })
           
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"added successfully"})
                }
            })
            emp.save()
        }
    })
}) 
 

app.post("/viewall",(req,res)=>{
   db.Employee.find().then(user=>{
        res.send(user)
    })
})

app.post("/adddepartment",(req,res)=>{
   const{department_name,department_id}=req.body 
   db.Department.findOne({department_name}).then(department=>{
     if(department){
         res.send({message:"Already exist"})
     } 
     else{
         const department=new db.Department({
            department_name,
            department_id
         })
         department.save()
         res.send({message:"Department added successfully"})
     } 
   })
})

app.post("/delete/:emp_id",(req,res)=>{
    
    try{
        db.Employee.findByIdAndUpdate(req.params.emp_id,{deleted:true})
        res.status(200).json("user deleted")
    }catch(error){
        res.status(500).json(error)
    }
    
})

// // employee functionalities

app.post("/mydetails",(req,res)=>{
    const{emp_id}=req.body
    db.Employee.findOne({emp_id}).then(user=>{
        res.send(user)
    })
})

app.put("/editmydetails/:emp_id",(req,res)=>{
     let query={id:parseInt(req.params.emp_id)}
    
    let employe={
        emp_id :parseInt(req.params.emp_id),

        
        username:req.body.username,
        age:req.body.age,
        email:req.body.email

    }
    let dataSet={
        $set:employe
    }
    db.Employee.updateOne(query,dataSet,(err,result)=>{
        if(err) throw err
        res.send({message:"successfully updated"})
    })

})

// app.put("/editmydetails",(req,res)=>{
//     const{emp_id,email}=req.body
//     db.Employee.updateOne({emp_id:emp_id}).then(user=>{
//         {$set:{email}}
//         res.send(user)
//     })

   
app.listen(4000,()=>{
    console.log("server is up and runs at 4000");
})