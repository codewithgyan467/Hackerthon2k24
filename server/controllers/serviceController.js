const Service = require('../models/Service');

exports.searchServices = async (req, res) => {
    try {
        const { query } = req.query;
        const services = await Service.find({ name: { $regex: query, $options: 'i' } });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getServiceDetails = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
