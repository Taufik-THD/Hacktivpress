const Article = require('../models/model_article')
const mongoose = require('mongoose');

module.exports = {

  getArticle (req, res) {
    Article.find({}).populate('UserId')
    .exec()
    .then(data => {
      res.status(200).json(data)
    }).catch(err => {
      console.log(err);
    })
  },

  addArticle (req, res) {

    let newDate = new Date
    const date = String(newDate).slice(0, 15)
    const time = String(newDate).slice(16, 24)
    const now = `${date}, ${time}`

    const newArticle = {
      title: req.body.title,
      category: req.body.category,
      article: req.body.article,
      picture: req.file.cloudStoragePublicUrl,
      UserId: req.body.UserId,
      time: now
    }

    Article.create(newArticle, function(err, success) {
      if (err) {
        res.status(404).json('badrequest')
        console.log(err);
      } else {
        console.log('response');
        res.status(201).json('success')
      }
    })

  },

  editArticle (req, res) {
    console.log('editArticle');
  },

  deleteArticle (req, res) {
    console.log('deleteArticle');
  }

};
