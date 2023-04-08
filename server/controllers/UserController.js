const Util = require('../util')
const util = new Util();
const data = [{'id': 1,'name': 'test','age': 24}];
class UserController {
    static async userList(req, res) {
        try {
            util.setSuccess(200, "All user get successfully", data);
        } catch (error) {
            util.setError(500, error.message);
        }
        return util.send(res);
    }
    static async insertUser(req, res) {
        try {
            let itemIds = data.map(item => item.id);
            let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
            let newItem = {
                'id': newId,
                'name': req.body.name,
                'age': req.body.age
            }
            data.push(newItem)
            util.setSuccess(200, "User added successfully", newItem);
        } catch (error) {
            util.setError(500, error.message);
        }
        return util.send(res);
    }
    static async updateUser(req, res) {
        try {
            let found = data.find(function (item) {
                return item.id === parseInt(req.params.id);
            });
            if (found) {
                let updated = {
                    id: found.id,
                    name: req.body.name,
                    age: req.body.age,
                };
                let targetIndex = data.indexOf(found);
                data.splice(targetIndex, 1, updated);
                util.setSuccess(200, "User updated successfully", updated);
            } else {
                util.setError(400, 'User Not Found');
            }
        } catch (error) {
            util.setError(500, error.message);
        }
        return util.send(res);
    }
    static async deleteUser(req,res){
        try {
            let found = data.find(function (item) {
                return item.id === parseInt(req.params.id);
            });
            if (found) {
                let targetIndex = data.indexOf(found);
                data.splice(targetIndex, 1);
                util.setSuccess(200, "User deleted successfully", found);
            } else {
                util.setError(400, 'User Not Found');
            }
        } catch(error) {
            util.setError(500, error.message);
        }
        return util.send(res);
    }

    static async getUser(req,res) {
        try{
            let found = data.find(function (item) {
                return item.id === parseInt(req.params.id);
            });
            if (found) {
                util.setSuccess(200, "User get successfully", found);
            } else {
                util.setError(400, 'User Not Found');
            }
        }catch(error){
            util.setError(500, error.message);
        }
        return util.send(res);
    }
}
module.exports = UserController;