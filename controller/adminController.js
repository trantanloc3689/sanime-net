var postModel = require('../models/posts');

function to_slug(str)
{
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();     
 
    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
 
    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');
 
    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');
 
    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');
 
    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');
 
    // return
    return str;
}

module.exports = {
    getListAnime: (req, res, next) => {
        postModel.find({},(err, posts)=>{
            if (err) throw err;
            // res.json(posts);
            res.render('admin/index',{posts: posts});
        })
    },
    getAdd:(req, res, next) => res.render('admin/addAnime'),
    postAdd: (req, res, next) => {
        postModel.findOne({name_slug: to_slug(req.body.name)},(err,user)=>{
            if(err) throw err;
            if(user){
                res.send('Đã có tên anime!');
            } else{
                // postModel.create({
                //     name: req.body.name,
                //     name_slug: to_slug(req.body.name),
                //     description: req.body.description,
                //     url_image: req.body.url_image
                // },(err,data)=>{
                //     if(err) throw err;
                //     console.log(data);
                // });
                var post = new postModel({
                    name: req.body.name,
                    name_slug: to_slug(req.body.name),
                    description: req.body.description,
                    url_image: req.body.url_image
                });

                post.save()
                .then(console.log("add new anime success!"))
                .then(res.redirect('/admin'));
            }
        })
    },
    getAddEpisode: (req, res, next) => {
        postModel.find({name_slug: req.params.name_slug},(err, post)=>{
            res.render('admin/addEpisode',{post:post});
            // res.json(post);
        });
    },
    postAddEpisode: (req, res, next) => {
        let update = {
            $push: {
                "episode": {
                    chap: req.body.chap,
                    url_video: req.body.url_video
                }
            }
        };
        postModel.update({name_slug: req.params.name_slug},update)
        .then(console.log("Add episode success!"))
        .then(res.redirect('/admin'));
    }
}