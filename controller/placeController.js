
const placeSchema = require("../models/placeSchema");

exports.getAllPlaces = async(req, res)=>{
    try{
        let places = await placeSchema.findAll({
          attributes: ['id', 'placeName', 'description', 'price', 'situatedIn', 'famousFor', 'image']
        });
        res.status(200).json({
            status: "success",
            content: {
                places: places
            }
        })
    }catch(e){
        res.status(500).json({
            status: "error",
            message: e.message || e
        })
    }
}

exports.createPlace = async (req, res) => {
  try {
    const body = req.body;
    await placeSchema.create({
      placeName: body.placeName,
      description: body.description,
      price: body.price,
      situatedIn: body.situatedIn,
      famousFor: body.famousFor,
      image: body.image,
      tourId: body.tourId
    });
    res.status(201).json({
      status: "success",
      content: {
        place: body,
      },
    });
  } catch (e) {
        res.status(500).json({
        status: "error",
        message: e,
        });
  }
};

exports.getPlace = async (req, res) => {
  try {
    const id = req.params.id;
    const p = await placeSchema.findByPk(id, {
      attributes: ['id', 'placeName', 'description', 'price', 'situatedIn', 'famousFor', 'image']
    });
    res.status(200).json({
      status: "success",
      content: {
        place: p,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e.message || e,
    });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const id = req.params.id;
    const p = user.findByPk(id);
    // const data = {
    //   name: req.body.name || u.name,
    //   email: req.body.email || u.email,
    //   mobile: req.body.mobile || u.mobile,
    // };

    const result = await placeSchema.save();
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

exports.deletePlace = async (req, res) => {
  try {
    const id = req.params.id;
    let data = placeSchema.findByPk(id);
    const query = `DELETE FROM places WHERE id = ${id}`;
    const p = await sequelize.query(query, { type: QueryTypes.DELETE });
    res.status(204).json({
      status: "success",
      content: {
        place: p,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e,
    });
  }
};