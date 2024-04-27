const express = require('express')
const router = express.Router()
const {addFeedback,getAllFeedback,updateFeedback,deleteFeedback,getFeedback} = require('../controllers/feedbackController')
const {protect} = require('../middleware/authMiddleware')

router.get('/getall',protect,getAllFeedback)

router.get('/:id',protect,getFeedback)

router.post('/',protect,addFeedback)

router.delete('/:id',protect,deleteFeedback)

router.put('/:id',protect,updateFeedback)

module.exports = router