const { QueryTypes } = require("sequelize");
const user = require("../models/userSchema");
const Tour = require("../models/tourSchema");
const Place = require("../models/placeSchema");
const Activity = require("../models/activitySchema");


const checkUserAvailable = async (id) => {
  try {
    const foundUser = await user.findByPk(id);
    return foundUser || null;
  } catch (error) {
    console.error(`Error checking user with id ${id}:`, error);
    return null;
  }
};

exports.createUser = async (req, res) => {
  try {
    const body = req.body;
    await user.create({
      name: body.name,
      email: body.email,
      mobile: body.mobile,
    });
    res.status(201).json({
      status: "success",
      content: {
        tour: body,
      },
    });
  } catch(e) {
    res.status(500).json({
      status: "error",
      message: e,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await user
      .findAll({
        attributes: ['id', 'name', 'email', 'mobile'],
        include: [{
          model: Tour,
          attributes: ['id', 'cityName', 'description', 'image', 'startDate', 'endDate'],
          as: 'tours',
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
        }]
        }]
      })
    res.status(200).json({
        status: "success",
        content: {
          users: users,
        },
      });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e,
    });
  }
};

exports.getUser = async (req, res)=>{
    try {
        const id = req.params.id;
        const u = await user.findByPk(id, {
          attributes: ['id', 'name', 'email', 'mobile'],
          include: [{
            model: Tour,
            attributes: ['id', 'cityName', 'description', 'image', 'startDate', 'endDate'],
            as: 'tours',
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
          }]
          }]
        }
        );
        if(!u){
          checkUserAvailable();
        }
        res.status(200).json({
            status: "success",
            content: {
                user: u
            }
        })
    } catch (e) { 
      res.status(500).json({
        status: "error",
        message: e.message || e,
      });
    }
}

exports.updateUser = async(req, res)=>{
    try {
        const data = req.body;
        const id = req.params.id;
        await user.findByPk(id).then( user =>{
          user.name = data.name || u.name,
          user.email = data.email || u.email,
          user.mobile = data.mobile || u.mobile

          return user.save();
        })
        .then(result =>{
          res.status(200).json({
            status: "success",
            content: {
              user: result,
            },
          });
        })
        .catch(e =>{
          console.log(e)
          res.status(500).json({
            status: "error",
            message: e,
          });
        })
    } catch (e) {
      res.status(500).json({
        status: "error",
        message: e,
      });
    }
}

exports.deleteUser = async(req, res)=>{
    try {
        const id = req.params.id;
        await user.findByPk(id).then(user =>{
          if(!user){
            return res.status(500).json({
              status: "error",
              message: `no user found with this id ${id}`
            })
          }
          return user.destroy();
        })
        .then((result)=>{
          if(result){
            console.log('USER DELETED.')
            res.status(204).json({
              status: "success",
              user: user,
            });
          }
        })
        .catch(e=>{
          console.log(e)
        })
        // const query = `DELETE FROM users WHERE id = ${id}`;
        // const u = await sequelize.query(query, { type: QueryTypes.DELETE });
        // res.status(204).json({
        //     status: "success",
        //     content: {
        //         user: u
        //     }
        // })
    } catch (e) {
      res.status(500).json({
        status: "error",
        message: e,
      });
    }
}