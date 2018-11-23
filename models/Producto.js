const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema =  new Schema({
  name: String,
  code: {
    type: String,
    unique: true
  },
  photoURL: String,
  price: Number,
  marca: String,
  storeID: {
    type: Schema.Types.ObjectId,
    ref: 'Tiendita'
  }
},{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt:'updatedAt'
  }
})

module.exports = mongoose.model('Producto', productoSchema);