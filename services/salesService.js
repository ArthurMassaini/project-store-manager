const salesModel = require('../models/salesModel');

const { ObjectId } = require('mongodb');

const verifyQuantity = (body) => {
  const minValue = 0;
  const bool = 
    body.some(({ quantity }) => quantity <= minValue || typeof quantity !== 'number');

  if (bool) {
    throw new Error('Wrong product ID or invalid quantity');
  }
};

const createSale = async (body) => {
  try {
    verifyQuantity(body);
    const result = await salesModel.create(body);

    return result;
  } catch (error) {
    return error.message;
  }
};

const getAllSales = async () => {
  const allSales = await salesModel.getAll();
  return allSales;
};

const getSalesById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return 'Sale not found';
  } else {
    const sale = await salesModel.getById(id);
    return sale === null ? 'Sale not found' : sale;
  }
};

const updateSale = async (id, body) => {
  try {
    verifyQuantity(body);

    const updatedSale = await salesModel.update(id, body);
    return updatedSale;
  } catch (error) {
    return error.message;
  }
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return 'Wrong sale ID format';
  } else {
    const deletedSale = await salesModel.deleteSale(id);
    return deletedSale;
  }
};


module.exports = { createSale, getAllSales, getSalesById, updateSale, deleteSale };
