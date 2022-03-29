const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/LeaveManagement', {
    useNewUrlParser: true,
    useUnifiedTopology:true
 
},()=>{
    console.log("db connected");
})


const Employee=mongoose.model("Employee",{
username:String,
date_of_birth:Date,
age:Number,
email:String,
emp_id:Number,
password:String,
category:String,
designation:String,
mobile_number:Number,
deleted:{
    type:Boolean,
    default:false
}


})


 const User = mongoose.model("User", {
    
    username: String,
    password: String,
    emp_id:Number,
    category: String
    
})

const Department=mongoose.model("Department",{
    department_name:String,
    department_id:Number
})

module.exports = {
    User,
    Employee,
    Department
}