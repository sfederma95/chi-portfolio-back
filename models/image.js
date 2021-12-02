const { Sequelize, DataTypes, Model } = require('sequelize');
const ExpressError = require('../expressError');
const db = require('../db');

class Image extends Model {
    static async allImages(){
        try {
            const images = await Image.findAll();
            if (images.length===0) throw new Error;
            return images;
        } catch (err){
            throw new ExpressError("Could not find any images",404);
        }
    }
    static async getImage(id){
        try {
            const image = await Image.findAll({
                where: {
                    img_id: id
                }
            });
            if (image.length===0) throw new Error;
            return image;
        } catch (err){
            throw new ExpressError("Could not find that image",404);
        }
    }
    static async postImage({type,ctgy,name,desc, path}){
        try {
            await Image.create({
                img_type: type.toUpperCase(),
                img_ctgy: ctgy || null,
                img_name: name,
                img_desc: desc || null,
                img_path: path
            });
            return {msg: 'Posting successful'};
        } catch (err){
            const errArr = [];
            err.errors.map(e=>{errArr.push(e.message)})
            throw new ExpressError(errArr,500);
        }
    }
    static async updateImage({ctgy,name,desc,size},id){
        try {
            await this.getImage(id);
            await Image.update({
                img_ctgy: ctgy,
                img_name: name,
                img_size: size,
                img_desc: desc
            }, {
                where: {
                    img_id: id
                }
            })
            return {msg: 'Update successful'};
        } catch (err){
            const errArr = [];
            err.errors.map(e=>{errArr.push(e.message)})
            throw new ExpressError(errArr,500);
        }
    }
    static async deleteImage(id){
        try {
            await this.getImage(id);
            await Image.destroy({
                where: {
                    img_id:id
                }
            })
            return {msg: 'Delete successful'};
        } catch(err){
            throw new ExpressError("Could not find that image",404);
        }
    }
}

Image.init({
    img_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
            args: [['APNG', 'AVIF','GIF','JPEG','PNG','SVG','WEBP']],
            msg: "Not a valid image type"
        }
      }
    },
    img_path: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isUUID:4,
        }
    },
    img_size: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '500x500',
        validate: {
            contains: 'x',
            notContains: {
                args: ['\\'],
                msg: "Certain special characters are not allowed"
            }
        }
    },
    img_ctgy: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
        validate: {
            len: [0,15],
            notContains: {
                args: ['\\'],
                msg: "Certain special characters are not allowed"
            }
        }
    },
    img_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args:[2,25],
                msg: "Img must have a name longer than 2 characters in length"
            },
            notContains: {
                args: ['\\'],
                msg: "Certain special characters are not allowed"
            }
        }
    },
    img_desc: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '',
        validate: {
            len: [0,50],
            notContains: {
                args: ['\\'],
                msg: "Certain special characters are not allowed"
            }
        }
    },
    img_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
  }, {
      sequelize: db,
      tableName: 'images'
  });

module.exports = Image; 