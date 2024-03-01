const { where } = require("sequelize");
const db = require("../models");
const Citizen = db.Citizen;
const Health = db.health;
const ROLES = ('ADMIN', 'CITIZEN', 'HEALTH');


    checkRolesAndDuplicateUser = (req, res, next) => {
        if (req.body.role) {
            if (!ROLES.includes(req.body.role)) {
              res.status(400).send({
                message: "Failed! Role does not exist = " + req.body.roles[i]
              });
              return;
            }
            else if (req.body.role === 'CITIZEN') {
              Citizen.findOne({
                where :{
                  pseudo : req.body.pseudo
                }
              }).then(user =>{
                if(user){
                  res.status(400).send({
                    message: "Failed! Username is already in use!"
                  });
                  return;
                }
              })

              Citizen.findOne({
                where :{
                  tel : req.body.tel
                }
              }).then(user =>{
                if(user){
                  res.status(400).send({
                    message: "Failed! Username is already in use!"
                  });
                  return;
                }
              })
              
            } else {
              Health.findOne({
                where :{
                  firstname : req.body.firstname
                }
              }).then(user =>{
                if(user){
                  res.status(400).send({
                    message: "Failed! Username is already in use!"
                  });
                  return;
                }
              })
            }
        }
        
        next();
      };

      const verifySignUp = {
        checkRolesAndDuplicateUser : checkRolesAndDuplicateUser
      }

      module.exports = verifySignUp;