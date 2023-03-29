const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');
const catchError = require('../utils/catchError');

const getAll = catchError(async (req, res) => {
  const result = await Purchase.findAll({ where: { userId: req.user.id }, include: [Product] })
  return res.json(result);
});

const CreatePurchase = catchError(async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findAll({
    where: { userId },
    attributes: ['quantity', 'productId', 'userId'],
    raw: true
  })

  await Purchase.bulkCreate(cart)
  await Cart.destroy({ where: { userId } });
  
  return res.json(cart);
})


module.exports = {
  getAll,
  CreatePurchase
}