const { Car, validate } = require('../modals/car');
const auth = require('../middleware/auth');
const { Modal } = require('../modals/modal');
const express = require('express');
const router = express.Router();

router.post('/', auth, async (req, res) => {
    const error = validate(req.body);
    if (error.length) return res.status(400).send({ message: "Invalid Request", errors: error });

    try {
        const modal = await Modal.findById(req.body.modalId);
        if (!modal) return res.status(400).send({ message: 'Invalid modal ID.' });
        const car = new Car({
            ...req.body,
            modal: req.body.modalId
        });
        await car.save();
        res.send({
            message: "Car added successfully.",
            car: car
        });
    } catch (error) {
        res.status(500).send({ message: "Failed to create Car." });
    }
});

router.put('/:id', auth, async (req, res) => {
    const error = validate(req.body);
    if (error.length) return res.status(400).send({ message: "Invalid Request", errors: error});

    try {
        const modal = await Modal.findById(req.body.modalId);
        if (!modal) return res.status(400).send({ message: 'Invalid modal ID.' });

        const car = await Car
            .findByIdAndUpdate(
                req.params.id, 
                {
                    ...req.body,
                    modal: req.body.modalId
                },
                { new: true }
            );

        if (!car) return res.status(404).send({ message: "Car with the given ID not found." });

        res.send({
            message: "Car updated successfully.",
            car: car
        });
    } catch (error) {
        res.status(500).send({ message: "Failed to update Car." });
    }
});

router.get('/', async (req, res) => {
    let query = Car.find();
    let countQuery = Car.countDocuments();
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.pageno;
    const modalName = req.query.modal;

    if (modalName) {
        const modal = await Modal.findOne({ name: new RegExp(modalName, 'i'), deleted: false });
        if (!modal) return res.status(400).send({ message: 'Modal name does not exist.' });
        
        query = Car.find({ modal: modal._id });
        countQuery = Car.countDocuments({ modal: modal._id });
    }
    query.select({ name: 1, modal: 1, price: 1, imagePath: 1 }).populate({ path: 'modal', select: 'name' });

    if (pageSize && currentPage) {
        query.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }

    try {
        const cars = await query.sort({ name: 1 });
        const count = await countQuery;

        res.status(200).send({
            message: "Success",
            cars: cars,
            totalCount: count
        });
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch Cars." });
    }
});

router.get('/:id', async (req, res) => {
    const car = await Car.findById(req.params.id).populate({ path: 'modal', select: 'name' });
    if (!car) return res.status(404).send({ message: "Car with the given ID not found." });

    res.send({
        message: "Success",
        car: car
    });
});


router.delete('/:id', auth, async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id, { useFindAndModify: true });
        if (!car) return res.status(404).send({ message: "Car with the given ID not found." });

        res.send({
            message: "Car deleted successfully.",
            car: car
        });
    } catch (error) {
        res.status(500).send({ message: "Failed to update Car." });
    }
});

module.exports = router;