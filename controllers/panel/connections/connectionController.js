const connectionModel= require('../../../models/connections');

module.exports = {
    getAll: async (req, res) => {
        const list = await connectionModel.find();
        res.render("admin/connections/listconnection", {
            layout: 'admin/dashboard',
            connections: list
        });
    },
    getUpdateView:async (req, res) => {
        try {
            const id = req.params.id;
            const oneconnection = await connectionModel.findById(id);
            res.render('admin/connections/editconnection', {
                layout: 'admin/dashboard',
                connection: oneconnection
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    updateById: async(req, res) => {

        const id = req.params.id;
        const data = req.body;
        let connection = await connectionModel.findByIdAndUpdate(id, {
            key: data.key,
            file_Id: data.file_Id,
        }, {new: true});
        if(!connection) return res.status(404).send('connection with the given id not found');

        res.redirect('/panel/connections/');
    },
    deleteById: async (req, res) => {
        try {
            const id = req.params.id;
            const connection = await connectionModel.findByIdAndRemove(id);
            if(!connection) return res.status(404).send('connection with the given id not found');
            res.redirect('/panel/connections/');
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    getAddConnectionView: async (req, res)=>{
        res.render('admin/connections/addconnection',{layout: 'admin/dashboard'});
    },
    create: async (req, res) => {
        const data = req.body;
        let _connection = await connectionModel.find({key: data.key});
        if(_connection.length > 0 ){
            return res.status(400).send('service already exists');
        }
        let connection = await new connectionModel({
            key: data.key,
            file_Id: data.file_Id,
        });
        await connection.save();
        res.redirect('/panel/connections/');
    },


}