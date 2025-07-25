const tourSchema = require('../models/tourSchema');
const Place = require("../models/placeSchema");
const Activity = require("../models/activitySchema");

exports.getAllTours = async(req, res)=>{
    try {
        let tours = await tourSchema.findAll({
          attributes: ['id', 'cityName', 'description', 'image', 'startDate', 'endDate'],
          include: [{
            model: Place,
            attributes: ['id', 'placeName', 'description', 'price', 'situatedIn', 'famousFor', 'image'],
            as: 'places'
          },
          {
            model: Activity,
            attributes: ['id', 'activityName', 'description', 'image'],
            as: 'activities',
            through: {
              attributes: []
            }
          }],
        });
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
        const tour = await tourSchema.create({
          cityName: body.cityName,
          description: body.description,
          image: body.image,
          startDate: startDate,
          endDate: endDate,
          userId: body.userId
        });

        if(body.activities && body.activities.length > 0) {
          // await tour.addActivities(body.activities);
          await tour.setActivities(req.body.activities);
        }

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
    let tour = await tourSchema.findByPk(id, {
      attributes: ['id', 'cityName', 'description', 'image', 'startDate', 'endDate'],
      include: [{
        model: Place,
        attributes: ['id', 'placeName', 'description', 'price', 'situatedIn', 'famousFor', 'image'],
        as: 'places'
      },
      {
        model: Activity,
        attributes: ['id', 'activityName', 'description', 'image'],
        as: 'activities',
        through: {
          attributes: []
        }
      }],
    });
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
    await tourSchema.destroy(id);
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