const express = require('express');
const router = express.Router();
const Tiendita = require('../models/Tiendita');

//create Tienditas
router.get('/new', (req, res) => {
  const action = '/tienditas/new';
  res.render('tienditas/form', {action});
})

router.post('/new', (req, res) => {
  Tiendita.create(req.body)
    .then(tiendita => {
      res.render('success', tiendita)
      // this.setTimeout(res.redirect('/tienditas'),5000)
      
    })
    .catch(error => {
      res.render('tienditas/form', {tiendita:req.body, error})
    })
})

//list Tienditas
router.get('/', (req, res, next) =>{
  Tiendita.find()
    .then(tienditas => {
      res.render('tienditas/list', {tienditas})
    })
    .catch(e => {
      next(e)
    })
})
//Tienditas detail
router.get('/detail/:id', (req, res, next) => {
  const {id} = req.params
  Tiendita.findById(id).populate('products')
    .then(tiendita => {
      res.render('tienditas/detail', tiendita)
    })
    .catch(e => {
      next(e);
    })
})
//update Tienditas
router.get('/update/:id', (req, res, next) => {
  const {id} = req.params;
  const action = `${id}`;
  Tiendita.findById(id)
    .then(tiendita => {
      res.render('tienditas/form', {tiendita, action})
    })
    .catch(e => {
      next(e)
    })
})

router.post('/update/:id', (req, res, next) => {
  const {id} = req.params
  Tiendita.findByIdAndUpdate(id, {$set:req.body}, {new:true})
    .then(tiendita => {
      res.redirect(`/tienditas/detail/${id}`)
    })
    .catch(error => {
      res.render('tienditas/form', {tiendita:req.body, error})
    })
})

//delete Tienditas
router.get('/delete/:id', (req, res, next) => {
  const {id} = req.params;
  Tiendita.findById(id)
    .then(tiendita => {
      res.render('tienditas/delete', tiendita)
    })
    .catch(e => {
      next(e)
    })
})

router.post('/delete/:id', (req, res, next) => {
  const {id} = req.params;
  Tiendita.findByIdAndRemove(id)
  .then(tiendita => {
    res.redirect('/tienditas')
  })
  .catch(e => next(e))
})


module.exports = router;