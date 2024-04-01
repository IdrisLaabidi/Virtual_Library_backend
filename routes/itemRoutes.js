const express = require('express')
const router = express.Router()
const {addItem,getAllItems,updateItem,deleteItem,getItemsinCollection,getItem} = require('../controllers/itemController')
const { protect } = require('../middleware/authMiddleware');

router.post('/',protect,addItem)

router.get('/',protect,getAllItems)

router.get('/:id',protect,getItem)

router.get('/collection/:collectionId',protect,getItemsinCollection)

router.put('/:id',protect,updateItem)

router.delete('/:id',protect,deleteItem)

module.exports = router