const Util = require('../util')
const util = new Util();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../config/db')
const product = db.product
const category = db.category
// const validator = require("express-validator");
const { validationResult } = require('express-validator');

class ProductController{
    static async getProduct(req,res){
        try{
         // db.query("SELECT * FROM  categories WHERE deleted_at IS NULL", (err, result) => {
         //     if (err) throw err;
         //     util.setSuccess(200, "Category get successfully", result);
         //     return util.send(res);  
         // });
         const { current_page } = req.body;
         const limit = 10;
         const offset = limit * (parseInt(current_page) - 1);
 
         const query = {
         offset,
         limit
         };
         let data = null
         if (req.body.search) {
            data = await product.findAll({query,where: {
                [Op.or]: [{ '$categories.name$':{
                    [Op.like]: `%${req.body.search}%`
                }},{
                    name:{
                        [Op.like]: `%${req.body.search}%`
                    }
                }]
            }, include: {
                model: category,as:"categories"
            }});
         } else {
            data = await product.findAll({query,include: {
                model: category,as:"categories"
            }});
         }
       
         util.setSuccess(200, "Product get successfully", data);
         return util.send(res); 
         } catch (error) {
          util.setError(500, error.message);
          return util.send(res)
        }
    }    
    static async addProduct(req,res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                util.setError(400,errors.array());
                return util.send(res); 
            } else {
                console.log("body",req.body)
                const {name,categoryId,manufacture_date,expiry_date} = req.body
                const data = await product.create(req.body)
                util.setSuccess(200, "Add Product successfully", data);
                return util.send(res); 
            }
        } catch (error) {
            util.setError(500, error.message);
            return util.send(res)
        }
    }
    static async updateProduct(req,res)
    {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                util.setError(400,errors.array());
                return util.send(res); 
            } else {
                if (req.params.id) {
                    const {name,categoryId,manufacture_date,expiry_date} = req.body
                    const data = await product.update(
                      req.body
                      , {
                        where: { id: req.params.id },
                        returning: true,
                        plain: true})
                    util.setSuccess(200, "update Product successfully", data);
                    return util.send(res); 
                } else {
                    util.setError(400, 'id is required');
                    return util.send(res)
                }
            }
        }catch(error){
            util.setError(500, error.message);
            return util.send(res)
        }
    }
    static async deleteProduct(req,res){
        try{
            // db.query("UPDATE categories SET updated_at=?, deleted_at=? WHERE id=? ",[new Date(),new Date(),req.params.id], (err, result) => {
            //     if (err) throw err.message;
            //     util.setSuccess(200, "Category deleted successfully", result);
            //     return util.send(res); 
            // });
            const data = await product.findOne({ where: { id: req.params.id } });
            await data.destroy();
            util.setSuccess(200, "Product deleted successfully", data);
            return util.send(res);  
        }catch(error){
            util.setError(500, error.message);
            return util.send(res)
        }
    }
}
module.exports = ProductController;