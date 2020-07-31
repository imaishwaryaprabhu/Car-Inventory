const { Modal, validate } = require('../modals/modal');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.post('/', auth, async (req, res) => {
    const error = validate(req.body);
    if (error.length) return res.status(400).send({ message: "Invalid Request", errors: error });

    try {
        const modal = new Modal({
            name: req.body.name
        });
        await modal.save();
        res.send({
            message: "Modal added successfully.",
            modal: modal
        });
    } catch (error) {
        res.status(500).send({ message: "Failed to create modal." });
    }
});

router.put('/:id', auth, async (req, res) => {
    const error = validate(req.body);
    if (error.length) return res.status(400).send({ message: "Invalid Request", errors: error});

    try {
        const modal = await Modal
            .findByIdAndUpdate(
                req.params.id, 
                { name: req.body.name },
                { new: true }
            );

        if (!modal) return res.status(404).send({ message: "Modal with the given ID not found." });

        res.send({
            message: "Modal updated successfully.",
            modal: modal
        })
    } catch (error) {
        res.status(500).send({ message: "Failed to update modal." });
    }
});

router.get('/', async (req, res) => {
    let query = Modal.find({ deleted: false });
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.pageno;

    if (pageSize && currentPage) {
        query.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }

    try {
        const modals = await query.sort({ _id: -1 }).select({ deleted: 0 });
        const count = await Modal.countDocuments({ deleted: false });

        res.status(200).send({
            message: "Success",
            modals: modals,
            totalCount: count
        });
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch modals." });
    }
});


router.delete('/:id', auth, async(req, res) => {
    try {
        const modal = await Modal
            .findByIdAndUpdate(
                req.params.id, 
                { deleted: true }
            );
        if (!modal) return res.status(404).send({ message: "Modal with the given ID not found." });

        res.send({
            message: "Modal deleted successfully.",
            modal: modal
        })
    } catch (error) {
        res.status(500).send({ message: "Failed to update modal." });
    }
})

module.exports = router;