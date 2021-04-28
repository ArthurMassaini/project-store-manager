const productsModel = require('../models/productsModel');

const { ObjectId } = require('mongodb');

const verifyName = (allProducts, name) => {
  const minLength = 5;
  let bool;
  if (allProducts !== undefined) {
    bool = allProducts.some((element) => element.name === name);
  }
  if (typeof name !== 'string' || name.length <= minLength) {
    throw new Error('"name" length must be at least 5 characters long');
  } else if (bool) {
    throw new Error('Product already exists');
  }
};

const verifyQuantity = (quantity) => {
  const minSize = 0;
  if (typeof quantity !== 'number' && !Number.isInteger(quantity)) {
    throw new Error('"quantity" must be a number');
  } else if (quantity <= minSize) {
    throw new Error('"quantity" must be larger than or equal to 1');
  }
};

const createProduct = async (name, quantity) => {
  const allProducts = await productsModel.getAll();
  try {
    verifyName(allProducts, name);
    verifyQuantity(quantity);

    const newProduct = await productsModel.create(name, quantity);
    return newProduct;
  } catch (error) {
    return error.message;
  }
};

const getAllProducts = async () => {
  const allProducts = await productsModel.getAll();
  return allProducts;
};

const getProductsById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return 'Wrong id format';
  } else {
    const product = await productsModel.getById(id);
    return product;
  }
};

const updateProduct = async (id, name, quantity) => {
  try {
    verifyName(undefined, name);
    verifyQuantity(quantity);

    const updatedProduct = await productsModel.update(id, name, quantity);
    return updatedProduct;
  } catch (error) {
    return error.message;
  }
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return 'Wrong id format';
  } else {
    const deletedProduct = await productsModel.deleteProduct(id);
    return deletedProduct;
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
};
