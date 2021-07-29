const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const id = require('shortid');

const { Authentications } = require('../models');




const index = async(req, res) => {
  try {
      const users = await Authentications.findAll();
    if (users) {
        return await res.status(200).json({
            users
        });
    }
  }
  catch (error) {
    return res.status(500).json({
        message: 'Server Error',
        status: 500
    })
  }
  
}

const auth = async (req, res, next) => {
    const { email, password } = req.body
    const auth = await Authentications.findAll({ where: { email: email } })
    try{
        
        if (!auth) {
            return res.status(401).json({
               
                    message: 'Invalid username or Password',
                    status: 401
           
            })
        }
           await  bcrypt.compare (password, auth[0].password, (err, result) => {

                if (err) {
                    return  res.status(401).json({
                     
                            message: 'Invalid username or Password',
                            status: 401
                       
                    })
                }
                if (result) {
                const token = jwt.sign({
                                email: auth[0].email, 
                                password: auth[0].password
                            }, 'secrete',
                            {
                                expiresIn: 3600
                            }
                    );  
                    return   res.status(200).json({
                        message: 'Auth Successfully',
                        auth,
                    status: 200,
                    token: token
                })
               }
               return res.status(401).json({
               
                    message: 'Invalid username or Password',
                    status: 401
                
            })
                
            })
        }
        catch(err){
            if(err){
                return  res.status(500).json({
                  
                            message: 'Server Error',
                            status: 500
                })
            }
        }
}




const create = async (req, res, next) => {
  const { name, email, password, role } = req.body
    const auth = await Authentications.findAll({ where: { email: email } })

    
    try {

        if (auth.length >= 1) {
            return await res.status(409).json({
              
                            message: 'user exist',
                            status: 409
                 
            })
        }
     else  await bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return  res.status(500).json({
               
                            message: 'Server Error',
                            status: 500
            })  
            } else {
               Authentications.create({userId: id(), name: name,email: email,password: hash, role: role})
                    return res.status(201).json({
                        message: 'success',
                        status: 201
                   })
            }
         })
  }
    catch (error) {
        if (error) {
            return res.status(500).json({
    
                message: 'Server Error',
                status: 500
            });
        }
    
  }
  
}


const update = async(req, res) => {
    const { userId } = req.params;
    const { name, email, password } = req.body;
  const user = await Authentications.findByPk(userId);
  const userData = await Authentications.update({
      name: name,
      email: email,
      password: password
        },{ where: {userId: userId } })
  try {
    if (!user) {
     return await res.status(404).json({
        message: 'No User Found',
        status: 404
      })
    } 
    else {
      if (!userData) {
      return await res.status(400).json({
        message: 'bad request',
        status: 400
      })
      } else {
        return await res.status(201).json({
        message: 'success',
        status: 201
      })
      }
    }
  }
  catch (error) {
      return res.status(500).json({
          message: 'server Error',
          status: 500
      });
  }
  
}

const destroy = async(req, res) => {
  const { userId } = req.params
  const user = await Authentications.findByPk(userId);
  const userData = await Authentications.destroy({
    where: {userId: userId}
  })
  try {
    if (!user) {
      return await res.status(404).json({
        message: 'No User Found',
        status: 404
      })
    } else {
      if (!userData) {
        return await res.status(404).json({
        message: 'Bad Request',
        status: 404
      })
      }
      return await res.status(201).json({
        message: 'success',
        status: 201
      })
    }
     
  }
  catch (error) {
    return res.status(500).json({
        message: 'server Error',
        status: 500
      })
  }
}


const show = async (req, res, next) => {
  const { userId } = req.params;
  const user = await Authentications.findByPk(userId)
  try {
    if (user) {
      return await res.status(200).json({
        user,
        status: 200
      })
    }
    return await res.status(404).json({
        message: 'No User Found',
        status: 404
      })
  }
  catch (err) {
    return await res.status(500).json({
        message: 'Server Error',
        status: 500
      })
  }
  
}



module.exports = { index, create, auth, destroy, update, show};