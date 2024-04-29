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
      if(req.body.pdfFile){
        const pdf = req.body.pdfFile
        const pdfRef = ref(storage, `pdfs/${pdfFile.name}`);
        const pdfBuffer = req.files.pdf[0].buffer
        await uploadBytes(pdfRef, pdfBuffer)
        const pdfURL = await getDownloadURL(pdfRef);
        newItem.pdfURL = pdfURL; 
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
        res.status(200).json(item);
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
        //get the item to be updated
        const item = await Item.findById(req.params.id)
        //get the old collection
        const oldCollection = await Collection.findById(item.group)
        //remove the item's id from the old collection's array
        oldCollection.items.pull(item._id)
        await oldCollection.save();
        //update the item
        const updatedItem = await Item.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        //get the new collection
        const newCollection = await Collection.findById(updatedItem.group)
        //add the item's id to he array of the newly selected collection
        newCollection.items.push(updatedItem._id)
        await newCollection.save();
        res.status(200).json({ updatedItem });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

const deleteItem = expressAsyncHandler(async (req,res) =>{
    try {
        // Get the item to be deleted
        const item = await Item.findById(req.params.id);
        // Get the collection
        const collection = await Collection.findById(item.group);
        // Remove the item's id from the collection's array
        collection.items.pull(item._id);
        await collection.save();
        // Delete the item
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