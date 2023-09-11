const AccountDetailsSchema = require('../models/AccountDetails')

const addAccountDetails = (req, res, next) => {
  let userObj = {
    name: req.body.name,
    password: req.body.password,
    mail: req.body.mail,
    isLoggedIn: false
  }
  let AccountDetails = new AccountDetailsSchema(userObj);
  AccountDetails
    .save()
    .then((response) => {
      res.json({
        statusCode: 200,
        message: "Account Details added successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: "error while saving " + error,
        errorCode: 501
      });
    });
};

const findUser = (req, res, next) => {

  let user = {
    mail: req.body.mail,
    password: req.body.password,
  }

  AccountDetailsSchema.findOneAndUpdate(user, { isLoggedIn: true }, { new: true }).then(userResponse => {

    if (userResponse._id) {

      res.json({
        statusCode: 200,
        data: userResponse,
        message: "loggedIn succesfully"
      })
    }


  }).catch(e => {
    res.json({
      statusCode: 205,
      message: "user not found: " + e
    })
  })
}

const userLogout = (req, res, next) => {

  let user = {
    mail: req.body.mail,
    password: req.body.password,
  }

  AccountDetailsSchema.findOneAndUpdate(user, { isLoggedIn: false }, { new: true }).then(userResponse => {

    if (userResponse._id) {

      res.json({
        statusCode: 200,

        message: "loggedOut succesfully"
      })
    }


  }).catch(e => {
    res.json({
      statusCode: 205,
      message: "user not found: " + e
    })
  })
}
const getAllUsers = (req, res, next) => {
  AccountDetailsSchema.find({}).then(response => {
    if (response.length > 0) {
      res.json({
        message: "users list fetched succcessfully",
        statusCode: 200,
        data: response
      })
    } else {
      res.json({
        message: "empty users",
        statusCode: 201,
      })
    }
  }).catch(e => {
    res.json({
      message: "something went wrong! " + e
    })
  })
}
module.exports = {
  addAccountDetails, findUser, getAllUsers, userLogout
}