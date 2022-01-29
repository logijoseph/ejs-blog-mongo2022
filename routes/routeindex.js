
const express = require('express');
const router = express.Router();
//const Task = require('../model/task');
const Post = require('../model/post')


router.get('/', async function(req,res){
  
  let posts = await Post.find();

  res.render('index', {posts});
});


router.get('/newPost', async (req,res) =>{
  res.render('newPost');
});

router.post('/newPost', async(req,res) => {
  
  let post = new Post(req.body);

  await post.save();

  res.redirect('/');
});

router.get('/delete/:id', async (req,res, next) =>{
  
  let id = req.params.id;

  await Post.remove({_id:id});

  res.redirect('/');
})

router.get('/edit/:id', async (req,res, next) =>{
  let id = req.params.id;

  let postToEdit = await Post.findById(id);

  res.render('edit',{postToEdit});
})

router.post('/editPost/:id', async(req,res) => {
  let id = req.params.id;

  await Post.updateOne({id},req.body);
  
  res.redirect('/');
});

module.exports = router;