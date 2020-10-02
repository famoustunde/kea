const {TE, to}              = require('../services/util.service');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Poste', {
        libellé     : DataTypes.STRING,
        description     : DataTypes.STRING,
        expérience     : DataTypes.INTEGER,
        placeDisponible     : DataTypes.INTEGER,
        datePublication     : DataTypes.DATE,
        dateExpiration     : DataTypes.DATE,
    });

  Model.prototype.toWeb = function (pw) {
      let json = this.toJSON();
      return json;
  };

  return Model;
};