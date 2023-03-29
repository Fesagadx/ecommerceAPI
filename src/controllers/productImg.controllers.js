const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');
const fs = require('fs');
const path = require('path');

const getAll = catchError(async (req, res) => {
  const images = await ProductImg.findAll();
  return res.json(images)
})

const create = catchError(async (req, res) => {
  const url = req.protocol + "://" + req.headers.host + "/uploads/" + req.file.filename;
  const filename = req.file.filename;
  const image = await ProductImg.create({ url, filename });
  return res.status(201).json(image);
});

const update = catchError(async(req, res) => {
  const { id } = req.params;
  const result = await ProductImg.update(
      req.body,
      { where: {id}, returning: true }
  );
  if(result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const image = await ProductImg.findByPk(id);
  if (!image) return res.sendStatus(404);
  fs.unlinkSync(path.join(__dirname, '..', 'public', 'uploads', image.filename));
  await image.destroy();
  return res.sendStatus(204);
});

module.exports = {
  getAll,
  create,
  remove,
  update
}
