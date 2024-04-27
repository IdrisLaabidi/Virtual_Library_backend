const expressAsyncHandler = require('express-async-handler');
const Collection = require('../models/collectionModel')
const Item = require('../models/itemModel')
const User = require('../models/userModel')
const mongoose = require('mongoose');
const { collection } = require('firebase/firestore');

const addCollection = expressAsyncHandler(async (req, res) => {
    try {
        const nouvelleCollection = await Collection.create(req.body);
        res.status(200).json({ nouvelleCollection });
    } catch (erreur) {
        res.status(400).json({ message: erreur.message });
    }
}) 

const getAllCollections = expressAsyncHandler(async (req, res) => {
    try {
        const userId = req.params.userid; 
        console.log(userId);
        let toutesLesCollections = await Collection.find({ 'user': userId });
        const user = await User.findById(userId);
        let collections = [...toutesLesCollections]; // Initialize with toutesLesCollections
        let shared
        if (user.sharedCollections?.length !== 0) {
            shared = await Collection.find({ _id: { $in: user.sharedCollections } });
            collections = collections.concat(shared); // Combine toutesLesCollections and shared
        }
        res.status(200).json(collections); // Return the combined collections
    } catch (error) {
        console.error('Error fetching collections:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


const getCollection = expressAsyncHandler(async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({ message: 'Collection non trouvée' });
        }
        console.log(collection)
        res.status(200).json(collection);
    } catch (erreur) {
        res.status(400).json({ message: erreur.message });
    }
});

const updateCollection = expressAsyncHandler( async (req, res) => {
    try {
        const collectionModifiee = await Collection.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        res.status(200).json({ message : 'collectionModifiee' });
    } catch (erreur) {
        res.status(400).json({ message: erreur.message });
    }
});

const deleteCollection = expressAsyncHandler(async (req, res) => {
    try {
        // Find the collection first
        const collection = await Collection.findOne({ _id: req.params.id });

        // Delete all items in the collection
            await Item.deleteMany({ _id: { $in: collection.items } });

        // Delete the collection
        const collectionSupprimee = await Collection.findOneAndDelete({ _id: req.params.id });

        res.status(200).json({ collectionSupprimee });
    } catch (erreur) {
        res.status(400).json({ message: erreur.message });
    }
});

const handleShare = expressAsyncHandler( async (req,res) => {
    try{
        const modifiedUsers = await User.updateMany(
            { _id: { $in: req.body } },
            { $push: { sharedCollections: req.params.id } },
            { new: true }
        );
        res.status(200).json({message : 'ok'})
    }catch(error){
        console.log(error)
    }
})

module.exports = {addCollection,getAllCollections,updateCollection,deleteCollection,getCollection,handleShare}



