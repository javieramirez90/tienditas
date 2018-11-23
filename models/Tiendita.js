const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tienditaSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  giro: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  products:[
    {
      type: Schema.Types.ObjectId,
      ref: "Producto"
    }
  ]
},{
  timestamps: {
  createdAt: 'createdAt',
  updatedAt: 'updatedAtº'
}
})

module.exports = mongoose.model('Tiendita', tienditaSchema);