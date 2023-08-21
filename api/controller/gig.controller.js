const Gig = require("../models/gig.model")
const { createError } = require("../utils/createError");


const getGigs = async (req, res, next) => {
    const q = req.query;

    const filters = {
        ...(q.userId && { userId: q.userId }),
        ...(q.cat && { category: q.cat }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } }),
        ...((q.min || q.max) && {
            price: {
                ...(q.min && { $gt: q.min }),
                ...(q.max && { $lt: q.max })
            }
        })
    }
    try {
        const gigs = await Gig.find(filters)
        res.status(200).send(gigs);
    } catch (err) {
        next(err)
    }
}
const getGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (!gig) return next(createError(404, "Gig not Found!"))
        res.status(200).send(gig)
    } catch (err) {
        next(err)
    }
}
const createGig = async (req, res, next) => {
    if (!req.isSeller) return next(createError(403, "Only sellers can create a gig"));

    const newGig = new Gig({
        userId: req.userId,
        ...req.body
    });

    try {
        const savedGig = await newGig.save();
        res.status(201).json(savedGig);
    } catch (err) {
        next(err)
    }
}
const deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);

        if (gig.userId !== req.userId)
            return next(createError(403, "You can delete only our gig!"))

        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).send("Gig has been deleted!");
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getGigs,
    getGig,
    createGig,
    deleteGig,
}