const controller = require('app/http/controllers/controller');
const Course = require('app/models/course');
const Episode = require('app/models/episode');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

class episodeController extends controller {
    async index(req , res) {
        try {
            let page = req.query.page || 1;
            let episodes = await Episode.paginate({} , { page , sort : { createdAt : 1 } , limit : 2 });
            res.render('admin/episodes/index',  { title : 'ویدیو ها' , episodes });
        } catch (err) {
            next(err);
        }
    }

    async create(req , res) {
        let courses = await Course.find({});
        res.render('admin/episodes/create' , { courses });        
    }

    async store(req , res , next) {
        try {
            let status = await this.validationData(req);
            if(! status) return this.back(req,res);
        
            let newEpisode = new Episode({ ...req.body });
            await newEpisode.save();

            // update course Times

            return res.redirect('/admin/episodes');  
        } catch(err) {
            next(err);
        }
    }

    async edit(req, res ,next) {
        try {
            this.isMongoId(req.params.id);

            let course = await Course.findById(req.params.id);
            if( ! course ) this.error('چنین دوره ای وجود ندارد' , 404);


            return res.render('admin/courses/edit' , { course });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res , next) {
        try {
            let status = await this.validationData(req);
            if(! status) {
                if(req.file) 
                    fs.unlinkSync(req.file.path);
                return this.back(req,res);
            }

            let objForUpdate = {};

            // set image thumb
            objForUpdate.thumb = req.body.imagesThumb;

            // check image 
            if(req.file) {
                objForUpdate.images = this.imageResize(req.file);
                objForUpdate.thumb = objForUpdate.images[480];
            }

            delete req.body.images;
            objForUpdate.slug = this.slug(req.body.title);
            
            await Course.findByIdAndUpdate(req.params.id , { $set : { ...req.body , ...objForUpdate }})
            return res.redirect('/admin/courses');
        } catch(err) {
            next(err);
        }
    }

    async destroy(req , res , next) {
        try {
            this.isMongoId(req.params.id);

            let episode = await Episode.findById(req.params.id);
            if( ! episode ) this.error('چنین ویدیو ای وجود ندارد' , 404);

            // delete courses
            episode.remove();

            return res.redirect('/admin/episodes');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new episodeController();