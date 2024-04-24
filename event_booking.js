const express = require('express');
const app = express();
const port = 3000;

let events = [];

app.use(express.json());

app.post('/events', (req, res) => {
    const newEvent = req.body;
    events.push(newEvent);
    res.json(newEvent);
});

app.get('/events', (req, res) => {
    res.json(events);
});

app.get('/events/:id', (req, res) => {
    const eventId = req.params.id;
    const event = events.find(event => event.id === eventId);
    if (!event) {
        res.status(404).json({ error: 'Event not found' });
    } else {
        res.json(event);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
