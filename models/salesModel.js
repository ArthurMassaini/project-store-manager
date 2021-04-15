const connection = require('../config/connection');

const { ObjectId } = require('mongodb');

const create = async (body) => {
  const sale = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: [...body] }),
  );

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

module.exports = { create, getAll, getById };
