// const mysql= require('mysql')

// var connection = mysql.createConnection({
//     host     : '127.0.0.1',
//     user     : 'root',
//     password : '',
//     database : 'test1'
// });
// connection.connect(error => {
//     if (error) throw error;
//     console.log("Successfully connected to the database.");
// });

// module.exports = connection

const { Sequelize,DataTypes} = require('sequelize');
const dotenv = require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);

}

const db = {};
db.Sequelize = Sequelize
db.sequelize = sequelize
db.category = require('../models/Category')(sequelize,DataTypes)
db.product = require('../models/Product')(sequelize,DataTypes)
db.sequelize.sync({force:false})

db.category.hasMany(db.product,{as:'product',foreignKey: 'categoryId',foreignKeyConstraint: true })
db.product.belongsTo(db.category,{as:'categories',foreignKey: 'categoryId'});
module.exports = db
