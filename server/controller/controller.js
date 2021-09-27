let Userdb = require('../model/model');

// create and save new user 
exports.create = (req,res)=>{
    //validate request / body에 아무것도 없는 경우 예외처리 
    if(!req.body){
        res.status(400).send({message:'Content can not be empty!'});
        return;
    }
    
    // new user / create an instance 
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    // save user(the instance made above) in the DB 
    user
      .save(user)
      .then(data=>{
          res.send(data)
      })
      .catch(err=>{
          res.status(500).send({
              message:err.message || "Some error occurred while creating a create operation"
          })
      })
}

// retrieve and return all users / retreive and return a single user
exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({
                        message:`Not found user with ${id}`
                    })
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({
                    message:`error retrieving user with ${id}`
                })
            })
    }else{
        Userdb.find()
        .then(user =>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Error Occurred while retrieving user information"
            })
        })
    }
}

// update a new identified user by userid 
exports.update = (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({
                message:"Data to update can not be empty"
            })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({
                    message : `Cannot update user with ${id}. Maybe user not found`
                })
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:'Error update user information'
            })
        })
}

// delete a user with specified userid in the request 
exports.delete = (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    message: `Cannot delete with id ${id}.`
                })
            }else{
                res.send({
                    message:`User was deleted successfully!`
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:`Coule not delete User with id = ${id}`
            });
        });
}


