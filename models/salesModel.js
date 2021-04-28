const connection = require('../config/connection');

const { ObjectId } = require('mongodb');

const create = async (body) => {

  // atualizar products
  let response;
  const initialIndex = 0;
  for (let index = initialIndex; index < body.length; index += 1) {
    const quantityObject = await connection().then((db) =>
      db
        .collection('products')
        .findOne({ _id: ObjectId(body[index].productId) }, { quantity: 1, _id: 0 }),
    );

    if (body[index].quantity <= quantityObject.quantity) {
      await connection().then((db) =>
        db
          .collection('products')
          .updateOne(
            { _id: ObjectId(body[index].productId) },
            { $inc: { quantity: - body[index].quantity } },
          ),
      );
    } else {
      response = { err: 'Such amount is not permitted to sell' };
    }
  }

  if (typeof response === 'object') {
    return response;
  }

  const sale = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: [...body] }),
  );

  return { _id: sale.insertedId, itensSold: [...body] };
};

const getAll = async () => {
  const allSales = await connection().then((db) => 
    db
      .collection('sales').find().toArray());
  return allSales;
};

const getById = async (id) => {
  const sale = await connection().then((db) => 
    db
      .collection('sales').findOne(ObjectId(id)));
  return sale;
};

const update = async (id, body) => {
  const sale = await connection().then((db) =>
    db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: body } }),
  );

  return sale;
};

const deleteSale = async (id) => {
  const beforeSale = await getById(id);

  const sale = await connection().then((db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) }),
  );

  // atualizar os products
  await connection().then((db) =>
    db
      .collection('products')
      .updateOne(
        { _id: ObjectId(beforeSale.itensSold[0].productId) },
        { $inc: { quantity: beforeSale.itensSold[0].quantity } },
      ),
  );

  return sale;
};

module.exports = { create, getAll, getById, update, deleteSale };
