const {body, validationResult} = require('express-validator')

const validateContact = [
    body('fName').notEmpty().withMessage('First Name is required..!!'),
    body('email').isEmail().withMessage('Invalid email, please provide proper Email..!!'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number..!!'),

  ];

  const validationResults = (validateContact,req,res,next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        next();
    }catch(error){
        console.log(error)
    }
   
};
  module.exports = validationResults;