const axios = require('axios');

exports.homeRoutes = (req,res)=>{
    
    // make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            console.log(`response.data:`,response.data)
            res.render('index', {users:response.data});
        })
        .catch(err=>{
            res.send(err);
        })
}

exports.add_user = (req,res)=>{
    res.render('add_user');
}

exports.update_user = (req,res)=>{
    // let id = req.query.id;
    // axios.get(`http://localhost:3000/api/users?id=${id}`)
    axios.get('http://localhost:3000/api/users', {params:{id:req.query.id}})
        .then(function(user_data){
            console.log(`user_data.data=`, user_data.data)
            res.render('update_user', {user:user_data.data})
        })
        .catch(err=>{
            res.send(err);
        })
} 