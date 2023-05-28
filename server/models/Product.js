const {Sequelize} = require('sequelize');
module.exports=(sequelize,DataTypes,category)=>{
    const Product = sequelize.define('Product',
    {
        // 
        categoryId : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        manufacture_date: {
            type: Sequelize.DATEONLY,
        },
        expiry_date:{
            type: Sequelize.DATEONLY,
        }
    },
    {
        tableName: 'products',
        paranoid:true
        // Other model options go here
    });
    return Product;
}