const EventModel = require("../models/event");

exports.createNewEvent = (req, res) => {
  EventModel.create({ ...req.body }, (error, newEvent) => {
    if (error) return res.status(500).json({ message: error });

    return res
      .status(201)
      .json({ message: `${req.body.title} event created`, newEvent });
  });
};

exports.fetchEvents = (req, res) => {
  let filter = {};

  if (req.query.category) filter.category = req.query.category;

  EventModel.find(filter, (error, results) => {
    if (error) return res.status(500).json({ message: error });

    return res.status(200).json({ results });
  });
};

exports.fetchSingleEvent = (req, res) => {
  EventModel.findById(req.params.id, (error, result) => {
    if (error) return res.status(500).json({ message: error });
    if (!result) return res.status(404).json({ message: "Event not found." });
    return res.status(200).json({ result });
  });
};

exports.updateEntireEvent = (req, res) => {
  EventModel.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true, runValidators: true },
    (error, result) => {
      if (error) return res.status(500).json({ message: error });
      if (!result) return res.status(404).json({ message: "Event not found." });
      return res
        .status(200)
        .json({ message: "Event updated successfully", result });
    }
  );
};

exports.deleteSingleEvent = (req, res) => {
  EventModel.findByIdAndDelete(req.params.id, (error, result) => {
    if (error) return res.status(500).json({ message: error });
    if (!result) return res.status(404).json({ message: "Event not found." });
    return res
      .status(200)
      .json({ message: `${result.title.toUpperCase()} was deleted.` });
  });
};
