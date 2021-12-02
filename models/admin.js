const { Sequelize, DataTypes, Model } = require('sequelize');
const ExpressError = require('../expressError');
const db = require('../db');
const bcrypt = require('bcrypt');
const {BCRYPT_WORK_FACTOR} = require('../config.js');

class Admin extends Model {
    static async login ({email,password}){
        try {
            const admin = await Admin.findAll({
                where: {
                    email: email
                }
            });
            if (admin.length===0) throw new Error;
            const validLogin = await bcrypt.compare(password,admin[0].dataValues.admin_pass);
            if(validLogin) return {msg:"success"};
        } catch (err) {
            throw new ExpressError("Email or password invalid",500);
        }
    }
}

Admin.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    admin_pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
  }, {
      sequelize: db,
      tableName: 'admins'
  });

module.exports = Admin; 