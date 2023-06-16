const Category = require('../models/Category')
const User = require('../models/User')
const Post = require('../models/Post')
exports.create = async (req, res) =>{
    try {
        const newCat = new Category(req.body);
        const savedCat = await newCat.save();
        res.status(200).json({message:'Category crated',savedCat})
    } catch (error) {
        res.status(500).json({message: error})
    }
}
exports.getAll = async (req, res) =>{
    try {
        const categories = await Category.find();
        
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({message: error})
    }
}
exports.getById = async (req, res) =>{}
exports.updateById = async (req, res) =>{}
exports.deleteById = async (req, res) =>{}