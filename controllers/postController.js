const Post = require('../models/post')
const Comment= require('../models/comment')

module.exports.createPost = function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log(`Error in creating post ${err}`);
            return;
        }
        return res.redirect('back')

    })
    
}

module.exports.destroyPost = function(req,res){
    Post.findById(req.params.id,function(err,post){
        if(post.user==req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                if(err){
                    console.log(`Error in deleting comment ${err}`)
                }
                return res.redirect('back')
            })
        }else{
            return res.redirect('back')
        }
    })
}
