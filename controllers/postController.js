const User = require('../models/User')
const Post = require('../models/Post')

exports.create = async (req, res) =>{
    try {
        const newPost = await Post(req.body)
        const savedPost = await newPost.save()
        res.status(200).json({message:'Post created',savedPost})
    } catch (error) {
        res.status(500).json({message: error})
    }
}
exports.getAll = async (req, res) =>{
    const username = req.query.user;
    const category = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({username})
            res.status(200).json(posts)
        }else if(category){
            posts = await Post.find({categories:{
                $in:[category],
            }})
        }else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({message: error})
    }
}
exports.getById = async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({message: error}) 
    }
}
exports.updateById = async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedpost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
                res.status(200).json({message:'Post has been updated',updatedpost})
            } catch (error) {
                res.status(500).json({message: error})
            }
                
        }else {
            res.status(401).json("You can update only your posts")
        }
        
    } catch (error) {
        res.status(500).json({message: error})
    }
}
exports.deleteById = async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted")
            } catch (error) {
                res.status(500).json({message: error})
            }
                
        }else {
            res.status(401).json("You can delete only your posts")
        }
        
    } catch (error) {
        res.status(500).json({message: error})
    }
}