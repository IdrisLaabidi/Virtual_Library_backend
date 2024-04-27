const expressAsyncHandler = require('express-async-handler');
const Feedback = require('../models/feedbackModel');

const addFeedback = expressAsyncHandler(async (req, res) => {
  try {
    const newFeedback = await Feedback.create(req.body);
    res.status(200).json({ newFeedback });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getAllFeedback = expressAsyncHandler(async (req, res) => {
  try {
    const allFeedback = await Feedback.find();
    res.status(200).json(allFeedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getFeedback = expressAsyncHandler(async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateFeedback = expressAsyncHandler(async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({ message: 'Feedback updated', updatedFeedback });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteFeedback = expressAsyncHandler(async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: 'Feedback deleted', deletedFeedback });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  addFeedback,
  getAllFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedback,
};
