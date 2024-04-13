const expressAsyncHandler = require('express-async-handler');
const Item = require('../models/itemModel')
const Collection = require('../models/collectionModel');
const {ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const {storage } = require('../firebase-client-config')
const asyncHandler = require('express-async-handler')

const addItem = expressAsyncHandler(async (req, res) => {
    try {
      const newItem = await Item.create(req.body);
      const newItemCollection = await Collection.findById(req.body.group);
      newItemCollection.items.push(newItem._id);
      if (req.body.itemPicture) {
        //ta7ayol again
        const image =  req.body.itemPicture 
        const base64Image =  image.split(",")[1];
        const buffer = Buffer.from(base64Image, 'base64');//Node.js takes the base64-encoded string (base64Image) and decodes it into binary data
  
        // Upload the profile picture to Firebase Storage
        const imageRef = ref(storage, `ItemsImages/${newItem._id}/item-picture.jpg`);
        await uploadBytes(imageRef, buffer);
  
        // Get the download URL of the uploaded file
        const itemImgURL = await getDownloadURL(imageRef);
        newItem.itemImgURL = itemImgURL;
        console.log(newItem.itemImgURL)
      }
        await newItemCollection.save();
        await newItem.save()
      res.status(200).json({ newItem,newItemCollection });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

const getItem = expressAsyncHandler(async (req,res) =>{
    try {
        const item = await Item.findById(req.params.id);
        res.status(200).json({ item });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

const getAllItems = expressAsyncHandler(async (req,res) =>{
    try {
        const allItems = await Item.find();
        res.status(200).json({ allItems });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

const updateItem = expressAsyncHandler(async (req,res) =>{
    try {
        const updatedItem = await Item.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        res.status(200).json({ updatedItem });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

const deleteItem = expressAsyncHandler(async (req,res) =>{
    try {
        const deletedItem = await Item.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({ deletedItem });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

const getItemsinCollection = expressAsyncHandler(async (req,res) =>{
    try {
        const itemsInCollection = await Item.find({ group: req.params.collectionId });
        res.status(200).json({ itemsInCollection });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = {addItem,getAllItems,updateItem,deleteItem,getItemsinCollection,getItem}