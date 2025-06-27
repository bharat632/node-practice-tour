const tourSchema = require('../models/tourSchema')

exports.getAllTours = async(req, res)=>{
    try {
        let tours = await tourSchema.findAll();
        res.status(200).json({
            status: "success",
            content: {
                tours: tours
            }
        })
    } catch (e) {
      res.status(500).json({
        status: "error",
        message: e,
      });
    }
}

exports.createTour = async(req, res)=>{
    try {
        let body = req.body;
        let startDate = Number(new Date(body.startDate))
        let endDate = Number(new Date(body.endDate))
        let tour = await tourSchema.create({
          cityName: body.cityName,
          description: body.description,
          image: body.image,
          startDate: startDate,
          endDate: endDate,
        });
        res.status(201).json({
            status: "success",
            content: {
                tour: body
            }
        })

    } catch (e) {
      res.status(500).json({
        status: "error",
        message: e.message || e,
      });
    }
}

exports.getTOur = async (req, res) => {
  try {
    let id = req.params.id;
    let tour = await tourSchema.findByPk(id);
    res.status(200).json({
      status: "success",
      content: {
        tours: tour,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    let id = req.params.id;
    let tour = await tourSchema.destroy(id);
    res.status(204).json({
      status: "success",
      content: {
        tours: tours,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e,
    });
  }
};

exports.updateTour = async(req, res)=>{

}