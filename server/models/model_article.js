const mongoose = require('mongoose');
const Schema = mongoose.Schema

const articleSchema = new Schema({
  author: { type:String },
  category: { type:Number },
  article: { type:Number },
  picture: { type:String },
  UserId: { type:String, ref: 'User' },
  time: { type:String }
},{
  timestamps: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Item;
