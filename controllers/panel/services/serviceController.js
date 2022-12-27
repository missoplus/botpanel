const serviceModel= require('../../../models/services');

module.exports = {
    getAll: async (req, res) => {
        const list = await serviceModel.find();
        res.render("admin/services/listservice", {
            layout: 'admin/dashboard',
            services: list
        });
    },
    updateById: async(req, res) => {

        const id = req.params.id;
        const data = req.body;
        let service = await serviceModel.findByIdAndUpdate(id, {
            name: data.service,
        }, {new: true});
        if(!service) return res.status(404).send('service with the given id not found');

        res.redirect('/panel/services/');
    },
    getUpdateView:async (req, res) => {
        try {
            const id = req.params.id;
            const oneservice = await serviceModel.findById(id);
            res.render('admin/services/editservice', {
                layout: 'admin/dashboard',
                service: oneservice
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    deleteById: async (req, res) => {
        try {
            const id = req.params.id;
            const service = await serviceModel.findByIdAndRemove(id);
            if(!service) return res.status(404).send('service with the given id not found');
            res.redirect('/panel/services/');
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    getAddServiceView: async (req, res)=>{
        res.render('admin/services/addservice',{layout: 'admin/dashboard'});
    },
    create: async (req, res) => {
        const data = req.body;
        let _service = await serviceModel.find({name: data.service});
        if(_service.length > 0 ){
            return res.status(400).send('service already exists');
        }
        let service = await new serviceModel({
            name: data.service
        });
        await service.save();
        res.redirect('/panel/services/');
    },


}