const express = require('express')
const router = express.Router()
const {addCollection,getAllCollections,updateCollection,deleteCollection,getCollection,handleShare} = require('../controllers/collectionController')
const {protect} = require('../middleware/authMiddleware')

router.get('/:userid',protect,getAllCollections)

router.get('/:id',protect,getCollection)

router.post('/',protect,addCollection)

router.delete('/:id',protect,deleteCollection)

router.put('/:id',protect,updateCollection)

router.post('/share/:id',protect,handleShare)

module.exports = router