const {body,validationResult} = require('express-validator')

function validResult(req,res,next){
  const error = validationResult(req)

  if(!error.isEmpty()){
    return res.status(400).json({error:error.array()})
  }

  next()
}


const registerValidationRule = [
  body('username')
  .isString()
  .withMessage('userName must be string')
  .isLength({min:5,max:8})
  .withMessage('username must be between 5 and 8 charaters'),

  body('phone')
  .isNumeric()
  .withMessage('phone must contain only numbers')
  .isLength({ min: 10, max: 10 })
  .withMessage('phone must be exactly 10 digits'),

  body('email')
  .isEmail()
  .withMessage('must be a email'),

  body('password')
  .isLength({ min: 8, max: 8 })
  .withMessage('password must be 8 character long'),

  body('address')
  .isString()
  .withMessage('address must be string'),

    validResult

]

module.exports = {registerValidationRule}