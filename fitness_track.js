const express = require('express');
const app = express();
const port = 3000;

let activities = [];

app.use(express.json());

app.post('/activities', (req, res) => {
    const newActivity = req.body;
    activities.push(newActivity);
    res.json(newActivity);
});

app.get('/activities', (req, res) => {
    res.json(activities);
});

app.get('/activities/:id', (req, res) => {
    const activityId = req.params.id;
    const activity = activities.find(activity => activity.id === activityId);
    if (!activity) {
        res.status(404).json({ error: 'Activity not found' });
    } else {
        res.json(activity);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
