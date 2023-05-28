const Util = require('../util')
const util = new Util();
const db = require('../config/db')
const category = db.category
const product = db.product

class CateGoryController {
    static async getCategory(req,res){
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
        const data = await category.findAll(query);
        util.setSuccess(200, "Category get successfully", data);
        return util.send(res); 
        } catch (error) {
         util.setError(500, error.message);
         return util.send(res)
       }
    }

    static async addCategory(req,res) {
        try{
            if(req.body.name){
                // const values = [req.body.name, new Date(),new Date()];
                // db.query("INSERT INTO categories (name, created_at,updated_at) VALUES(?)",[values], (err, result) => {
                //     if (err) throw err;
                //     util.setSuccess(200, "Add Category successfully", result);
                //     return util.send(res); 
                // });
                const data = await category.create({name:req.body.name})
                util.setSuccess(200, "Add Category successfully", data);
                return util.send(res); 
            } else{
                util.setError(400,"The Name is required");
                return util.send(res); 
            }
        }catch(error){
         util.setError(500, error.message);
        return util.send(res)
        }
    }
    static async updateCategory(req,res) {
        try{
            if(req.params.id && req.body.name){
                // db.query("UPDATE categories SET name=?,updated_at=? WHERE id=? ",[req.body.name,new Date(),req.params.id], (err, result) => {
                //     if (err) throw err;
                //     util.setSuccess(200, "Add Category successfully", result);
                //     return util.send(res); 
                // });
                const recordToUpdate = await category.findOne({ where: { id: req.params.id } });

                if (recordToUpdate) {
                    // Update the record's properties
                    recordToUpdate.name = req.body.name;
                  
                    // Save the changes
                    await recordToUpdate.save();
                    util.setSuccess(200, "Add Category successfully", recordToUpdate);
                    return util.send(res); 
                }
            } else{
                util.setError(400,"The Name and id required");
                return util.send(res); 
            }
        }catch(error){
         util.setError(500, error.message);
         return util.send(res)
        }
    }

    static async deleteCategory(req,res){
        try{
            // db.query("UPDATE categories SET updated_at=?, deleted_at=? WHERE id=? ",[new Date(),new Date(),req.params.id], (err, result) => {
            //     if (err) throw err.message;
            //     util.setSuccess(200, "Category deleted successfully", result);
            //     return util.send(res); 
            // });
            const data = await category.findOne({ where: { id: req.params.id } });
            const productdata = await product.findOne({ where:{categoryId:req.params.id}})
            await productdata.destroy();
            await data.destroy();
            util.setSuccess(200, "Category deleted successfully", data);
            return util.send(res);  
        }catch(error){
            util.setError(500, error.message);
            return util.send(res)
        }
    }
}
module.exports = CateGoryController;