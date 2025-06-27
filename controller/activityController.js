const activitySchema = require("../models/activitySchema");

exports.getAllActivity = async (req, res) => {
  try {
    let activities = await activitySchema.findAll();
    res.status(200).json({
      status: "success",
      content: {
        activities: activities,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e.message || e,
    });
  }
};

exports.createActivity = async (req, res) => {
  try {
    const body = req.body;
    await activitySchema.create({
      activityName: body.activityName,
      description: body.description,
      difficulty: body.difficulty,
      timing: body.timing,
      price: body.price,
      image: body.image || null,
      is18plus: body.is18plus,
    });
    res.status(201).json({
      status: "success",
      content: {
        activity: body,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e,
    });
  }
};

exports.getActivity = async (req, res) => {
  try {
    const id = req.params.id;
    const a = await activitySchema.findByPk(id);
    res.status(200).json({
      status: "success",
      content: {
        activity: a,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e.message || e,
    });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const id = req.params.id;
    const a = activitySchema.findByPk(id);
    // const data = {
    //   name: req.body.name || u.name,
    //   email: req.body.email || u.email,
    //   mobile: req.body.mobile || u.mobile,
    // };

    const result = await activitySchema.save();
    res.status(200).json({
      status: "success",
      content: {
        place: result,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e,
    });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const id = req.params.id;
    let data = activitySchema.findByPk(id);
    const query = `DELETE FROM activities WHERE id = ${id}`;
    const a = await sequelize.query(query, { type: QueryTypes.DELETE });
    res.status(204).json({
      status: "success",
      content: {
        activity: a,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e,
    });
  }
};
