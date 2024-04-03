const expressAsyncHandler = require('express-async-handler');
const Collection = require('../models/collectionModel')

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
        const toutesLesCollections = await Collection.find();
        res.status(200).json({ toutesLesCollections });
    } catch (erreur) {
        res.status(400).json({ message: erreur.message });
    }
});

const getCollection = expressAsyncHandler(async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({ message: 'Collection non trouvée' });
        }
        res.status(200).json({ collection });
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
        res.status(200).json({ collectionModifiee });
    } catch (erreur) {
        res.status(400).json({ message: erreur.message });
    }
});

const deleteCollection = expressAsyncHandler(async (req, res) => {
    try {
        const collectionSupprimee = await Collection.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({ collectionSupprimee });
    } catch (erreur) {
        res.status(400).json({ message: erreur.message });
    }
});

module.exports = {addCollection,getAllCollections,updateCollection,deleteCollection,getCollection}



