const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcrypt')


exports.create = async (req, res) =>{
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPass
        })
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error})
    }
}
exports.login = async (req, res) =>{
    try {
        const user = await User.findOne({username:req.body.username})
        //console.log(user)
        if (!user) {
            return res.status(400).json('User does not exist!')
        }
        const validar = bcrypt.compare(req.body.password, user.password)
        if (!validar) {
            return res.status(400).json('Wrong password!!')
        }
        const {password,...others} = user._doc;
        res.status(200).json({message:'Login successfully',others})
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al hacer loggin' });
    }
}
exports.getAll = async (req, res) =>{
    try {
        
    } catch (error) {
        res.status(500).json({message: error})
    }
}
exports.getById = async (req, res) =>{
    try {
        const user = await User.findById(req.params.id)
        const {password,...others} = user._doc;
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json({message: error})
    }
}
exports.updateById = async (req, res) =>{
    if(req.body.userId === req.params.id){
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new: true})
            const {password,...others} = updatedUser._doc;
            res.status(200).json({message:'User updated', others})
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al actualizar' });
        }

    }else{
        res.status(401).json('You can update only your account')
    }
    
}
exports.deleteById = async (req, res) =>{
    if(req.body.userId === req.params.id){
        try {
            const user = await User.findById(req.params.id)
            try {
                await Post.deleteMany({username: user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json({message:'User deleted'})
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error when deleting' });
            }
        } catch (error) {
            console.error(error);
            res.status(404).json({ message: error });
        }
        

    }else{
        res.status(401).json('You can delete only your account')
    }
}