const express = require('express');
const {createContact,updateContact,sortContact,getSingleContact,deleteContact,getContact,searchContacts} = require('../controller/contactController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const validationResults = require('../middleware/validate');

const contactRouter = express.Router();

contactRouter.post("/",auth,validationResults,upload.single('imageURL'),createContact);   
contactRouter.put("/:id",auth,validationResults,upload.single('imageURL'),updateContact);      
contactRouter.get("/sort",auth,sortContact)
contactRouter.delete("/:id",auth,deleteContact)
contactRouter.get("/:id",auth,getSingleContact)
contactRouter.get("/",auth,getContact)
contactRouter.get("/search",auth,searchContacts)

module.exports = contactRouter;
