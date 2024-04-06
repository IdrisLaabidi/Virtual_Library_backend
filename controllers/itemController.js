const expressAsyncHandler = require('express-async-handler');
const Item = require('../models/itemModel')
const Collection = require('../models/collectionModel')


const addItem = expressAsyncHandler(async (req,res) => {
    try {
        console.log(req.body)
        const newItem = await Item.create(req.body)
        const collection = await Collection.findById(req.body.collection)
        collection.items.push(newItem._id)
        await collection.save()
        res.status(200).json({newItem})
    } catch (error) {
        res.status(400).json({message : error.message})
        console.log(error)
    }
})

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
        //get the item to be updated
        const item = await Item.findById(req.params.id)
        //get the old collection
        const oldCollection = await Collection.findById(item.collection)
        //remove the item's id from the old collection's array
        oldCollection.items.pull(item.id)
        await oldCollection.save();
        //update the item
        const updatedItem = await Item.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        //get the new collection
        const newCollection = await Collection.findById(updatedItem.collection)
        //add the item's id to he array of the newly selected collection
        newCollection.items.push(updatedItem.id)
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
        const collection = await Collection.findById(item.collection);
        // Remove the item's id from the collection's array
        collection.items.pull(item.id);
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
        const itemsInCollection = await Item.find({ collection: req.params.collectionId });
        res.status(200).json({ itemsInCollection });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = {addItem,getAllItems,updateItem,deleteItem,getItemsinCollection,getItem}