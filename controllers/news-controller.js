const id = require('shortid'); 
const { News } = require('../models');



const index = async(req, res) => {
  try {
    const news = await News.findAll()
    if (news) {
      return await res.status(200).json({
        articles: news
      })
    }
  }
  catch (error) {
    return res.status(500).json({
      error: {
        message: 'Server Error',
        status: 500
      }
    })
  }
  
}


const publishArticle = async (req, res, next) => {
  const { author, content, description, video } = req.body;

  console.log(req.file)
  const news = await News.create({
      newsId: id(),
      author: author,
      content: content,
      description: description,
      photo: req.file.path,
      video: video
  
    })
  try {
    if (!news) {
      return await res.status(400).json({
        message: 'bad request',
        status: 400
      })
    } else {
      return await res.status(201).json({
      message: 'success',
      status: 201
      })
    }
    
  } catch (err) {
    return  res.status(201).json({
      message: 'Server Error',
      status: 500
      })
      
  }

}

const show = async (req, res, next) => {
  const { id } = req.params;
  const article = await News.findByPk(id)
  try {
    if (article) {
      return await res.status(200).json({
        message: article,
        status: 200
      })
    }
    return await res.status(404).json({
        message: 'No Article Found',
        status: 404
      })
  }
  catch (err) {
    return await res.status(500).json({
        message: 'Server Error',
        status: 500
      })
  }
  
}


const update = async(req, res) => {
  const { id } = req.params
  const { author, content, description, video } = req.body;
  const article = await News.findByPk(id);
  const updatedArticle = await News.update({
      author: author,
      content: content,
      description: description,
      photo: req.file.path,
      video: video
        },{ where: { newsId: id } })


  try {
    if (!article) {
     return await res.status(404).json({
        message: 'No Article Found',
        status: 404
      })
    } 
    else {
      if (!updatedArticle) {
      return await res.status(400).json({
        message: 'bad request',
        status: 400
      })
      } else {
        return await res.status(201).json({
        message: 'success',
        status: 201
      })
      }
    }
  }
  catch (error) {
    return res.status(500).json({
        message: 'server Error',
        status: 500
      })
  }
  
}

const destroy = async(req, res) => {
  const { id } = req.params
  const article = await News.findByPk(id);
  const deletedArticle = await News.destroy({
    where: {newsId: id}
  })
  try {
    if (!article) {
      return await res.status(404).json({
        message: 'No Article Found',
        status: 404
      })
    } else {
      if (!deletedArticle) {
        return await res.status(404).json({
        message: 'No Article Found',
        status: 404
      })
      }
      return await res.status(201).json({
        message: 'success',
        status: 201
      })
    }
     
  }
  catch (error) {
    return res.status(500).json({
        message: 'server Error',
        status: 500
      })
  }
  
  
}



module.exports = { index, publishArticle, show, update, destroy };
