var postModel = require('../models/posts');
let curl = require('curlrequest');


module.exports = {
    getListAnime: (req, res, next) => {
        postModel.find({},(err, posts)=>{
            if (err) throw err;
            // res.json(posts);
            res.render('client/index',{posts: posts});
        })
    },
    getAnime: (req, res, next) => {
        postModel.find({name_slug: req.params.name_slug},(err, post)=>{
            if (err) throw err;
            // res.json(post);
            var fb_url = post[0].episode[req.params.chap - 1].url_video;
            // console.log(fb_url);
            curl.request(fb_url,(err,response)=>{
                const regex = /(hd_src_no_ratelimit:)(.+)(",aspect_ratio)/gm;
                var kq = response.match(regex).toString();
                var end = kq.indexOf(",aspect_ratio");
                var url = kq.slice(21,end-1);
                res.render('client/detail',{url: url});
            });
        })
        // res.render('client/detail');
    }
}