var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    name: String,
    name_slug: String,
    description: String,
    url_images: String,
    updated_by: String,
    episode:[{
        chap: Number,
        url_video: String,
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('posts',postSchema);

