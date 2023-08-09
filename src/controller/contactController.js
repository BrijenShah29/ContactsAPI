const express = require('express');
const upload = require('../middleware/upload')
const Contact = require('../models/Contact');



const createContact = async(req,res) => {
    const {fName,lName,email,phone} = req.body;
    try {
        const newContact = new Contact({
            fName : fName,
            lName : lName,
            email : email,
            phone : phone,
            imageURL : req.file? req.file.path : undefined,
            userId:req.user.userId
        });
        
        await newContact.save();
        res.status(200).json(newContact);
    }catch(error)
    {
        res.status(500).json({error:"Something went wrong..!!!"});
    }
}
const updateContact = async (req,res) => {
    
    const id = req.params.id;
        const {fName,lName,email,phone} = req.body;

        const newContacts = {
            fName : fName,
            lName : lName,
            email : email,
            phone : phone,
            imageURL :  req.file? req.file.path : undefined,
            userId:req.user.userId
        }
    
    try {
        const contact = await Contact.findByIdAndUpdate(id,newContacts,{new : true});
        res.status(200).json(contact);

    }catch(error){
        console.log(error);
        res.status(500).json({error:"Something went wrong..!!!"})
    }
}

const getSingleContact = async(req,res) => 
{
    const id = req.params.id;
    try {
        const contact = await Contact.find(id);
        res.status(200).json(contact);

    }catch(error) {
        console.log(error);
        res.status(500).json({error : "Something went wrong...!!!"})
    }

}

const deleteContact = async(req,res) => {

    const id = req.params.id;
    try {
        const contact = await Contact.findByIdAndRemove(id);
        res.status(200).json(contact);

    }catch(error) {
        console.log(error);
        res.status(500).json({error : "Something went wrong...!!!"})
    }
    
}

const getContact = async (req,res) => {
    try {
    const contacts = await Contact.find({userId : req.user.userId})
    res.status(200).json(contacts);

    }catch(error){
        console.log(error);
        res.status(500).json({error : "something went wrong..!!"})
}
}

const sortContact = async (req, res) => {
    try {
      const user = req.user.userId
      const sortBy = req.query.sortBy || 'fName';
      const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
  
      const contacts = await Contact.find({user}).sort({ [sortBy]: sortOrder });
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
// GET /api/contacts/sort?sortBy=fName&sortOrder=desc

const searchContacts = async (req, res) => {
    try {
        const user = req.user.userId
      const searchQuery = req.query.searchQuery || '';
      const sortBy = req.query.sortBy || 'fName';
      const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
  
      const contacts = await Contact.find({user,
        $or: [
          { fName: { $regex: searchQuery, $options: 'i' } },
          { lName: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
          { phone: { $regex: searchQuery, $options: 'i' } },
        ],
      }).sort({ [sortBy]: sortOrder });
  
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

//GET /contacts/search?searchQuery=john&sortBy=fName&sortOrder=desc

module.exports = {createContact,updateContact,sortContact,getSingleContact,deleteContact,getContact,searchContacts}


