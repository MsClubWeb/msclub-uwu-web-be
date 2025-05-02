const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', eventController.getAllEvents);

router.post('/', auth,upload('events').single('eventImage') ,eventController.createEvent);
router.put('/:id', auth,upload('events').single('eventImage'), eventController.updateEvent);
router.delete('/:id', auth, eventController.deleteEvent);

module.exports = router;