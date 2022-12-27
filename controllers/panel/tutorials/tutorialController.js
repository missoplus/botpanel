const tutorialModel= require('../../../models/tutorials');

module.exports = {
    getAll: async (req, res) => {
        const list = await tutorialModel.find();
        res.render("admin/tutorials/listtutorial", {
            layout: 'admin/dashboard',
            tutorials: list
        });
    },
    getUpdateView:async (req, res) => {
        try {
            const id = req.params.id;
            const onetutorial = await tutorialModel.findById(id);
            res.render('admin/tutorials/edittutorial', {
                layout: 'admin/dashboard',
                tutorial: onetutorial
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    updateById: async(req, res) => {

        const id = req.params.id;
        const data = req.body;
        let tutorial = await tutorialModel.findByIdAndUpdate(id, {
            name: data.name,
            text: data.text,
        }, {new: true});
        if(!tutorial) return res.status(404).send('tutorial with the given id not found');

        res.redirect('/panel/tutorials/');
    },
    deleteById: async (req, res) => {
        try {
            const id = req.params.id;
            const tutorial = await tutorialModel.findByIdAndRemove(id);
            if(!tutorial) return res.status(404).send('tutorial with the given id not found');
            res.redirect('/panel/tutorials/');
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    getAddTutorialView: async (req, res)=>{
        res.render('admin/tutorials/addtutorial',{layout: 'admin/dashboard'});
    },
    create: async (req, res) => {
        const data = req.body;
        let _tutorial = await tutorialModel.find({name: data.name});
        if(_tutorial.length > 0 ){
            return res.status(400).send('tutorial already exists');
        }
        let tutorial = await new tutorialModel({
            name: data.name,
            text:data.text
        });
        await tutorial.save();
        res.redirect('/panel/tutorials/');
    },


}