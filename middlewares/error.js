const INTERNAL_SERVER_ERROR = 500;

const errorMiddleware = (err, _req, res, _next) => {
  if (err.status) {
    res.status(err.status).send({
      error: err.message,
    });
  }

  res.status(INTERNAL_SERVER_ERROR).send({
    error: err.message,
  });
};

module.exports = errorMiddleware;
