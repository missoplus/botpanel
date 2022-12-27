const faqModel= require('../../../models/faqs');

module.exports = {
    getAll: async (req, res) => {
        const list = await faqModel.find();
        res.render("admin/faqs/listfaq", {
            layout: 'admin/dashboard',
            faqs: list
        });
    },
    getUpdateView:async (req, res) => {
        try {
            const id = req.params.id;
            const onefaq = await faqModel.findById(id);
            res.render('admin/faqs/editfaq', {
                layout: 'admin/dashboard',
                faq: onefaq
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    updateById: async(req, res) => {

        const id = req.params.id;
        const data = req.body;
        let faq = await faqModel.findByIdAndUpdate(id, {
            key: data.key,
            text: data.text
        }, {new: true});
        if(!faq) return res.status(404).send('faq with the given id not found');

        res.redirect('/panel/faqs/');
    },
    deleteById: async (req, res) => {
        try {
            const id = req.params.id;
            const faq = await faqModel.findByIdAndRemove(id);
            if(!faq) return res.status(404).send('faq with the given id not found');
            res.redirect('/panel/faqs/');
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    getAddFaqView: async (req, res)=>{
        res.render('admin/faqs/addfaq',{layout: 'admin/dashboard'});
    },
    create: async (req, res) => {
        const data = req.body;
        let _faq = await faqModel.find({key: data.key});
        if(_faq.length > 0 ){
            return res.status(400).send('faq already exists');
        }
        let faq = await new faqModel({
            key: data.key,
            text: data.text
        });
        await faq.save();
        res.redirect('/panel/faqs/');
    },


}