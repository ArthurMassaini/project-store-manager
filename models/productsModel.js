const connection = require('../config/connection');

const { ObjectId } = require('mongodb');

const getAll = async () => {
  const allProducts = await connection().then((db) =>
    db.collection('products').find().toArray(),
  );
  return allProducts;
};

const getById = async (id) => {
  const product = await connection().then((db) =>
    db.collection('products').findOne(ObjectId(id)),
  );
  return product;
};
  
const create = async (name, quantity) => {
  const product = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );

  return { _id: product.insertedId, name, quantity };
};

const update = async (id, name, quantity) => {
  const product = await connection().then((db) =>
    db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
  );
  return product;
};

const deleteProduct = async (id) => {
  const product = await connection().then((db) =>
    db.collection('products')
      .deleteOne({ _id: ObjectId(id) })
  );
  return product;
};

module.exports = { create, getAll, getById, update, deleteProduct };
