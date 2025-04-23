const {Event} = require('../models');
require('dotenv').config();

exports.getAllEvents = async (req, res) => {
    try{
        const events = await Event.findAll();
        res.json(events);
    }catch(err){
        console.error('Error fetching events:', err);
        res.status(500).json({message: 'Server error'});
    }
};

exports.createEvent = async (req, res) => {
    const { eventTitle, eventDescription, eventDate,eventTime, eventLocation,eventLink } = req.body;
    if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
    }

    try {
        const event = await Event.create({
            eventTitle,
            eventDescription,
            eventDate,
            eventTime,
            eventLocation,
            eventImage: req.file.path,
            eventLink
        });
        res.status(201).json(event);
    } catch (err) {
        console.error('Error creating event:', err);
        res.status(500).json({ message: 'Error creating event' });
    }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { eventTitle, eventDescription, eventDate,eventTime, eventLocation,eventLink } = req.body;

    try {
        const event = await Event.findByPk(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        event.eventTitle = eventTitle;
        event.eventDescription = eventDescription;
        event.eventDate = eventDate;
        event.eventTime = eventTime;
        event.eventLocation = eventLocation;
        if (req.file) {
            event.eventImage = req.file.path;
        }
        event.eventLink = eventLink;
        await event.save();

        res.json(event);
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(500).json({ message: 'Error updating event' });
    }
};

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByPk(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        await event.destroy();
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ message: 'Error deleting event' });
    }
};

exports.getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByPk(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        res.json(event);
    } catch (err) {
        console.error('Error fetching event:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


