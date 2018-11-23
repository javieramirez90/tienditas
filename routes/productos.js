const express = require('express')
const router = express.Router()
const Producto = require('../models/Producto')
const Tiendita = require('../models/Tiendita');

//create Products
router.get('/new/:tiendaId',(req, res, next)=>{
  const {tiendaId} = req.params
  const action = `/productos/new/${tiendaId}`
  res.render('productos/form',{action})
})

router.post('/new/:tiendaId',(req, res, next)=>{
  const {tiendaId} = req.params
  req.body['storeID'] = tiendaId
  Producto.create(req.body)
    .then(producto=>{
      Tiendita.findByIdAndUpdate(tiendaId, {$push:{products: producto._id}})
        .then(tiendita => {
          res.redirect(`/productos/detail/${producto._id}`)
        })
      // res.redirect(`/productos/detail/${producto._id}`)
    }).catch(error=>{
      res.render('productos/form',{error,producto:req.body})
    })
})

//product detail
router.get('/detail/:id',(req, res, next)=>{
  const {id} = req.params
  Producto.findById(id).populate('storeID')
    .then(producto=>{
      console.log(producto)
      res.render('productos/detail',producto)
    }).catch(e=>next(e))
})


module.exports = router