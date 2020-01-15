require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select
      "productId",
      "name",
      "price",
      "image",
      "shortDescription"
      from "products";
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const { productId } = req.params;
  const isNumber = new RegExp('^\\d+$');
  if (!isNumber.test(productId)) {
    next(new ClientError('ProductId must be a positive integer!', 400));
    return;
  }
  const sql = `
  select *
    from "products"
    where "productId" = $1;
  `;
  const params = [parseInt(productId, 10)];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        next(new ClientError(`Cannot find product with Id: ${productId}`, 404));
        return;
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) return [];
  const sql = `
      select "c"."cartItemId",
        "c"."price",
        "p"."productId",
        "p"."image",
        "p"."name",
        "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
      where "c"."cartId" = $1
  `;
  const params = [req.session.cartId];
  db.query(sql, params)
    .then(response => {
      res.json(response.rows);
    })
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const { productId } = req.body;
  const idCondition = new RegExp('^\\d+$');
  if (!idCondition.test(productId)) return next(new ClientError('ProductId must be a positive integer!', 400));
  const sql = `
  select "price"
    from "products"
    where "productId" = $1;
  `;
  const params = [parseInt(productId, 10)];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) throw new ClientError(`Cannot find product with Id: ${productId}`, 404);
      const price = result.rows[0];
      if (!req.session.cartId) {
        const sql = `
          insert into "carts" ("cartId", "createdAt")
          values (default, default)
          returning "cartId";
        `;
        return db.query(sql)
          .then(id => {
            const obj = { price: price.price, cartId: id.rows[0].cartId };
            return obj;
          });
      } else {
        const obj = { price: price.price, cartId: req.session.cartId };
        return obj;
      }
    })
    .then(object => {
      req.session.cartId = object.cartId;
      const sql = `
      insert into "cartItems" ("cartId", "productId", "price")
      values ($1, $2, $3)
      returning "cartItemId";
      `;
      const params = [object.cartId, productId, object.price];
      return db.query(sql, params)
        .then(cartItemId => {
          return cartItemId.rows[0];
        });
    })
    .then(cartItemId => {
      // SQL join 'using' / 'on'
      const sql = `
        select "c"."cartItemId",
        "c"."price",
        "p"."productId",
        "p"."image",
        "p"."name",
        "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
        where "c"."cartItemId" = $1
      `;
      const params = [cartItemId.cartItemId];
      return db.query(sql, params)
        .then(result => {
          res.status(201).json(result.rows[0]);
        });
    })
    .catch(err => next(err));
});

// orders
app.post('/api/orders', (req, res, next) => {
  const cartId = req.session.cartId;
  if (!cartId) return res.status(400).json({ Error: 'You have no cart to place order!' });
  const { name, creditCard, shippingAddress } = req.body;
  if (!name || !creditCard || !shippingAddress) return res.status(400).json({ Error: 'Name / CreditCard / Shipping Address are required input fields!' });

  const sql = `
  insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
  values ($1, $2, $3, $4)
  returning "orderId", "createdAt", "name", "creditCard", "shippingAddress";
  `;
  const params = [cartId, name, creditCard, shippingAddress];
  db.query(sql, params)
    .then(order => {
      delete req.session.cartId;
      res.status(201).json(order.rows[0]);
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
