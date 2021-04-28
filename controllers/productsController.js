const productsService = require('../services/productsService');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_UNPROCESSABLE_ENTITY = 422;

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const result = await productsService.createProduct(name, quantity);

  if (typeof result === 'string') {
    res
      .status(STATUS_UNPROCESSABLE_ENTITY)
      .json({ err: { code: 'invalid_data', message: result } });
  } else {
    res.status(STATUS_CREATED).json(result);
  }
};

const getAllProducts = async (_req, res) => {
  const result = await productsService.getAllProducts();

  res.status(STATUS_OK).json({ products: result });
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  const result = await productsService.getProductsById(id);

  if (typeof result === 'string') {
    res
      .status(STATUS_UNPROCESSABLE_ENTITY)
      .json({ err: { code: 'invalid_data', message: result } });
  } else {
    res.status(STATUS_OK).json(result);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const result = await productsService.updateProduct(id, name, quantity);

  if (typeof result === 'string') {
    res
      .status(STATUS_UNPROCESSABLE_ENTITY)
      .json({ err: { code: 'invalid_data', message: result } });
  } else {
    res.status(STATUS_OK).json({ id, name, quantity });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const getProductToBeDeleted = await productsService.getProductsById(id);
  const result = await productsService.deleteProduct(id);

  if (typeof result === 'string') {
    res
      .status(STATUS_UNPROCESSABLE_ENTITY)
      .json({ err: { code: 'invalid_data', message: result } });
  } else {
    res.status(STATUS_OK).json(getProductToBeDeleted);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
};
