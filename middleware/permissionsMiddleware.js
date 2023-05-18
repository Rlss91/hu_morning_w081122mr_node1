const CustomError = require("../utils/CustomError");

/*
    TODO:
        finish isBizSpecific
*/

const permissionsMiddleware = (isBiz, isAdmin, isBizSpecific) => {
  const permissionsMiddleware2 = (req, res, next) => {
    if (!req.userData) {
      throw new CustomError("must provide userData");
    }
    if (isBiz === req.userData.isBusiness && isBiz === true) {
      next();
    }
    if (isAdmin === req.userData.isAdmin && isAdmin === true) {
      next();
    }
  };
};
