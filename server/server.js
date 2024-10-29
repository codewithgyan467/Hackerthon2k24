const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const providerRoutes = require('./routes/providerRoutes');
const userRoutes = require('./routes/userRoutes'); // Ensure this route is defined
const serviceRoutes = require('./routes/serviceRoutes'); // Ensure this route is defined
const emergencyRoutes = require('./routes/emergencyRoutes'); // Ensure this route is defined
const forumRoutes = require('./routes/forumRoutes'); // Ensure this route is defined
const { errorHandler } = require('./middleware/error');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/admin', adminRoutes);
app.use('/api/provider', providerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/forum', forumRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://duwarahgyandeep248:gyan@7577@gyancluster0.3uwgi.mongodb.net/smartserve?retryWrites=true&w=majority&appName=GyanCluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err => console.error(err));
