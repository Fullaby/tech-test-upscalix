const {userData}= require('../models');

class ControllerData{
   static async createUser(req,res){
    try {
        const {firstName, lastName, birthDate, location, message}= req.body
        let user= await userData.findOne({where:{
            message:message
        }})
        
        if(user){
            res.status(400).json({
                error_message: "message duplicated try other message"
            })
        }else if(!user){
            let data= await userData.create({firstName,lastName,birthDate: new Date(birthDate),location,message})
            res.status(201).json({
                success: "user Created successfuly",
                name: `${data.firstName} ${data.lastName}`
            })
        }
    } catch (error) {
        console.log(error);
    }
   }

   static async userEdit(req,res){
    try {
        const{firstName, lastName, birthDate, location, message }= req.body
        const {nameFirst,secondName, dateUser}= req.params
       
        let user= await userData.findOne({where:{
            message:message
        }})

        let usersData= await userData.findOne({where:{
            firstName: nameFirst,
            lastName: secondName,
            birthDate: dateUser
        }})


        if(usersData == null || user){
            res.status(404).json({
                error_message: "user not valid or not registered"
            })
        }else if(usersData !== null || !user){
            let data= await userData.update({firstName, lastName, birthDate, location, message},{where:{
                firstName: nameFirst,
                lastName: secondName,
                birthDate: dateUser
            }})
            res.status(201).json({
                message: "user edited"
            })
        }
    } catch (error) {
        console.log(error);
    }
   }

   static async deleteUser(req,res){
    try {
        const {firstName,lastName, date}= req.params
        let test= await userData.findOne({where:{
            firstName: firstName,
            lastName: lastName,
            birthDate: new Date(date)
        }})
        let data= await userData.destroy({where: {
            firstName: firstName,
            lastName: lastName,
            birthDate: new Date(date)
        }})
        // if(firstName == test&& lastName == && date == )
        if(test== null){
            res.status(404).json({
                error_message: "user not valid or not registered"
            })
        }
        res.status(201).json({
            success: "delete user success",
        })
    } catch (error) {
        console.log(error);
    }
   }
   static async sendMessage(req,res){
    try {
        let firstName;
        let lastName;
        let birthDate;
        let data= await userData.findAll()
        data.forEach(el=>{
            firstName= el.firstName
            lastName= el.lastName
            birthDate= el.birthDate
         })
       
        let user= await userData.findOne({where:{
            firstName:firstName,
            lastName:lastName,
            birthDate:birthDate,
        }})
    let exactDate= user.birthDate.toLocaleString().split('/')
    let test= `${exactDate[0]}/${exactDate[1]}`

       let nowDate= new Date().toLocaleString().split('/')
       let testNow= `${nowDate[0]}/${nowDate[1]}`
       let nowTime= nowDate[2].split(',')
       let getTime= nowTime[1].split(':')
       let getDayOrNight= nowTime[1].split(' ')

       let timesNow=`${getTime[0]} ${getDayOrNight[2]}`

    if(test == testNow && `${timesNow}` == ` 9 AM` ){
        res.status(200).json({
            name: `${user.firstName} ${user.lastName}`,
            message: user.message,
            status: "sent",
            sentTime: new Date(),
            sentTimeSimplified: new Date().toLocaleString()
           })
    }
       
    } catch (error) {
        console.log(error);
    }
   }
   
    }
    
    module.exports= ControllerData