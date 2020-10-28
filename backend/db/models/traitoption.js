'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TraitOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.GenTrait)
      this.hasMany(models.CharTrait)
      this.belongsTo(models.Trait)
    }
  };
  TraitOption.init({
    traitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    option: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'TraitOption',
  });
  return TraitOption;
};