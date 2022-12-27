const serverModel= require('../../../models/servers');
services= require('../../../models/services');
module.exports = {
    getAll: async (req, res) => {
        const list = await serverModel.find();
        res.render("admin/servers/listserver", {
            layout: 'admin/dashboard',
            servers: list
        });
    },
    getUpdateView:async (req, res) => {
        try {
            const id = req.params.id;
            const oneserver = await serverModel.findById(id);
            res.render('admin/servers/editserver', {
                layout: 'admin/dashboard',
                server: oneserver
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    updateById: async(req, res) => {

        const id = req.params.id;
        const data = req.body;
        let server = await serverModel.findByIdAndUpdate(id, {
            name: data.name,
            ip: data.ip,
            file_Id: data.file_Id,
            service_Id: data.services,
        }, {new: true});
        if(!server) return res.status(404).send('server with the given id not found');

        res.redirect('/panel/servers/');
    },
    deleteById: async (req, res) => {
        try {
            const id = req.params.id;
            const server = await serverModel.findByIdAndRemove(id);
            if(!server) return res.status(404).send('server with the given id not found');
            res.redirect('/panel/servers/');
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    getAddServerView: async (req, res)=>{
        res.render('admin/servers/addserver',{layout: 'admin/dashboard'});
    },
    create: async (req, res) => {
        const data = req.body;
        let _server = await serverModel.find({name: data.name});
        if(_server.length > 0 ){
            return res.status(400).send('server already exists');
        }
        let server = await new serverModel({
            name: data.name,
            ip: data.ip,
            file_Id: data.file_Id,
            service_Id: data.services,
        });
        await server.save();
        res.redirect('/panel/servers/');
    },
}