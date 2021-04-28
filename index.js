const express = require('express');
const productsRoutes = require('./routes/productsRoutes');
const salesRoutes = require('./routes/salesRoutes');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productsRoutes);
app.use(salesRoutes);

app.use(errorMiddleware);

const PORT = '3000';

app.listen(PORT, () => {
  console.log('online');
});
