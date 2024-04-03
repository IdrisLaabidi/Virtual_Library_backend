const express = require('express')
const router = express.Router()
const {addCollection,getAllCollections,updateCollection,deleteCollection,getCollection} = require('../controllers/collectionController')
const {protect} = require('../middleware/authMiddleware')

router.get('/',protect,getAllCollections)

router.get('/:id',protect,getCollection)

router.post('/',protect,addCollection)

router.delete('/:id',protect,deleteCollection)

router.put('/:id',protect,updateCollection)

module.exports = router