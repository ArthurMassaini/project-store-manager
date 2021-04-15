const connection = require('../config/connection');

const { ObjectId } = require('mongodb');

const create = async (body) => {
  const sale = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: [...body] }),
  );

  await body.forEach(async (element) =>{
    await connection().then((db) => 
      db
        .collection('products')
        .updateOne(
          { _id: ObjectId(element.productId) }, { $inc: { quantity: - element.quantity } }
        )
    );
  });

  return { _id: sale.insertedId, itensSold: [...body] };
};

const getAll = async () => {
  const allSales = await connection().then((db) => 
    db.collection('sales').find().toArray());
  return allSales;
};

const getById = async (id) => {
  const sale = await connection().then((db) =>
    db.collection('sales').findOne(ObjectId(id)),
  );
  return sale;
};

const update = async (id, body) => {

  const sale = await connection().then((db) =>
    db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: body } })
  );

  await connection().then((db) =>
    db
      .collection('products')
      .updateOne(
        { _id: ObjectId(body[0].productId) }, { $inc: { quantity: - body[0].quantity } }
      )
  );

  return sale;
};

const deleteSale = async (id) => {
  const beforeSale = await getById(id);

  const sale = await connection().then((db) =>
    db.collection('sales')
      .deleteOne({ _id: ObjectId(id) })
  );

  await connection().then((db) =>
    db
      .collection('products')
      .updateOne(
        { _id: ObjectId(beforeSale.itensSold[0].productId) }, 
        { $inc: { quantity: beforeSale.itensSold[0].quantity } }
      )
  );

  return sale;
};

module.exports = { create, getAll, getById, update, deleteSale };
