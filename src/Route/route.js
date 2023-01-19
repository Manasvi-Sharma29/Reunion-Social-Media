const express = require('express')
const { comment } = require('../Controllers/comment')
const { follow, unfollow } = require('../Controllers/following')
const { login } = require('../Controllers/login')
const { like, unlike } = require('../Controllers/postReaction')
const { post, deletePost, getPost, getAllPost } = require('../Controllers/posts')
const { profile } = require('../Controllers/profile')
const { authentication } = require('../Middleware/auth')

const router = express.Router()

router.post('/api/authenticate',login)
router.post('/api/follow/:id',authentication,follow)
router.post('/api/unfollow/:id',authentication,unfollow)
router.get('/api/user',authentication,profile)
router.post('/api/posts/',authentication,post)
router.delete('/api/posts/:id',authentication,deletePost)
router.post('/api/like/:id',authentication,like)
router.post('/api/unlike/:id',authentication,unlike)
router.post('/api/comment/:id',authentication,comment)
router.get('/api/posts/:id',authentication,getPost)
router.get('/api/all_posts',authentication,getAllPost)



module.exports = router