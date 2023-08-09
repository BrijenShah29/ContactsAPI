const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fName: 
  { type: String, 
    required: true 
},
lName: 
{ type: String,  
},

  email: 
  { type: String, 
    required: true 
},
  phone: 
  { type: String, 
    required: true 
},
  imageURL: 
  { type: String 
},
  userId: 
  { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
});

module.exports = mongoose.model('Contact', contactSchema);