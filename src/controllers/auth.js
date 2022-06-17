// import model here
const {user} = require("../../models")

//  import Happy Joi
const joi = require('joi')

exports.register = async (req, res) =>{
    const schema = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().email().required(),
        password: joi.number().min(6).required()
      })
    
      const { error } = schema.validate(req.body);
    
      if(error){
        return res.send({
          error: error.details[0].message
        })
      }
    
      try {
      const data = await user.create(req.body)
    
      res.send({
        message: 'Register berhasil!',
        data
      })
      } catch (error) {
        console.log(error);
        res.send({
          status: 'Failed',
          message: 'Server Error'
        })
      }
    
    };