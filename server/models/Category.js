module.exports=(sequelize,DataTypes)=>{
    const Category = sequelize.define('Category',
    {
        name:{
            type:DataTypes.STRING,
            allowNull: false
        }
      },
       {
        tableName: 'categories',
        paranoid:true
        // Other model options go here
      });
    return Category;
}