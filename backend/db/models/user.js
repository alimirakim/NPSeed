'use strict';
const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashword.toString())
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Character)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    hashword: {
      type: DataTypes.STRING(60).BINARY,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};