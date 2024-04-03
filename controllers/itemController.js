const expressAsyncHandler = require('express-async-handler');
const Item = require('../models/itemModel')


const addItem = expressAsyncHandler(async (req,res) => {
    try {
        const newItem = await Item.create(req.body)
        res.status(200).json({newItem})
    } catch (error) {
        res.status(400).json({message : error.message})
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
        const itemsInCollection = await Item.find({ collection: req.params.collectionId });
        res.status(200).json({ itemsInCollection });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = {addItem,getAllItems,updateItem,deleteItem,getItemsinCollection,getItem}