var crypto = require("crypto");

module.exports = function (express, app, mongoose, Group) {
  var router = express.Router();

  router.get("/", async function (req, res) {
    res.send("Health: Good");
  });

  router.post("/save-group", async function (req, res) {
    try {
      if (req.body.group_name) {
        Group.findOne({ name: req.body.group_name }, function (err, group) {
            if(group){
                res.status(200).send({
                    message: "Group name already exist.",
                    sucess:false
                  });
            }else{
                var group = new Group({
                    name: req.body.group_name,
                  });
          
                  group.save(function (err) {
                    if (!err) {
                      Group.find({}, function (err, group) {
                      if (!err) {
                          res.status(200).send({
                            sucess:true,
                            groups: group,
                          });
                      } else {
                          res.status(400).send({
                            message: err,
                            sucess:false
                          });
                      }
                      });
                    } else {
                      res.status(400).send({
                        message: err,
                        sucess:false
                      });
                    }
                  });
            }
        })
        
      } else {
        res.status(400).send({
          message: "Group name required.",
          sucess:false
        });
      }
    } catch (err) {
      res.status(400).send({ error: err, sucess:false });
    }
  });

  router.get("/get-all-groups", async function (req, res) {
    try {
      Group.find({}, function (err, group) {
        if (!err) {
          res.status(200).send({
            groups: group,
          });
        } else {
          res.status(400).send({
            message: err,
          });
        }
      });
    } catch (err) {
      res.status(400).send({ error: err });
    }
  });

  router.post("/add-user-to-group", async function (req, res) {
    try {
      if (req.body.group_name && req.body.user_name && req.body.color) {
        Group.findOne({ name: req.body.group_name }, function (err, group) {
          if (!err) {
            if (group.users && group.users.length > 0) {
              var isUserExist = group.users.find(x=>x.name == req.body.user_name);
              if(isUserExist){
                return res.status(200).send({
                    "message":"User already exist",
                     sucess:false,
                     user:isUserExist
                  });
              }else{
                var query = { _id: group._id };
                const userObject = {
                     color: req.body.color,
                     name: req.body.user_name, 
                  }; 
                  var users = {
                    $push: {
                        users: { 
                            name: req.body.user_name, 
                            color: req.body.color
                        }
                    }
                  }
                Group.findOneAndUpdate(
                    query,
                    users,
                    { upsert: true },
                    function (err, response) {
                      if (err) return res.send(500, { error: err });
                      Group.find({}, function (err, group) {
                        if (!err) {
                            res.status(200).send({
                              sucess:true,
                              groups: group,
                            });
                        } else {
                            res.status(400).send({
                              message: err,
                              sucess:false
                            });
                        }
                        });
                    }
                  );
              }
            } else {
              const userObject = {
                users: [{ name: req.body.user_name, color: req.body.color }],
              };
              var query = { _id: group._id };
              Group.findOneAndUpdate(
                query,
                userObject,
                { upsert: true },
                function (err, response) {
                  if (err) return res.send(500, { error: err });
                  Group.find({}, function (err, group) {
                    if (!err) {
                        res.status(200).send({
                          sucess:true,
                          groups: group,
                        });
                    } else {
                        res.status(400).send({
                          message: err,
                          sucess:false
                        });
                    }
                    });
                }
              );
            }
          } else {
            res.status(400).send({
              message: "Error while saving user",
              sucess:false
            });
          }
        });
      } else {
        res.status(400).send({
          message:
            "Please send all information. Group name, user name and color!",
            sucess:false
        });
      }
    } catch (err) {
      res.status(400).send({ error: err,sucess:false });
    }
  });

  app.use("/group", router);
};
