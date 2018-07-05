const mongoose = require('mongoose');
const Schema = mongoose.Schema

const articleSchema = new Schema({
  title: { type:String },
  category: { type:String },
  article: { type:String },
  picture: { type:String },
  UserId: { type:String, ref: 'User' },
  time: { type:String }
},{
  timestamps: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article;
