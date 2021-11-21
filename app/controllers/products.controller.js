const asyncHandler = require("../middleware/app_async");
const client = require("../config/db.config");


exports.getProducts = asyncHandler(async (req, res, next) => {
  await client.query(
    `SELECT * FROM products`,
    (err, result) => {
      const { rows } = result;
      if (!err) res.status(200).json(rows);
    }
  );
});

exports.getSingleProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await client.query(
    `SELECT * FROM products p WHERE p.product_id = $1`,
    [id],
    (err, result) => {
      if(result){
        const { rows } = result;
        if (!err) res.status(200).json(rows);
      }
    }
  );
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  const { name,price,amount,describtion } = req.body;
  await client.query(
    `insert into products  (name,price,amount,describtion)
    values ($1,$2,$3,$4)`,
    [name,price,amount,describtion],
    (err, result) => {
      if (!err) res.status(200).json({ Data: [], Success: true, Message: "" });
      else res.status(500).json({ Data: [], Success: false, Message: "" });
    }
  );
});

// @desc        Update student information
// @route       PUT /api/student
// @access      Public
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const {name,price,amount,describtion,product_id } =
    req.body;
  await client.query(
    `UPDATE products 
    SET name = $1,
        price = $2,
        amount = $3,
        describtion = $4 
    WHERE product_id = $5;`,
    [name,price,amount,describtion,product_id],
    (err, result) => {
      if (!err) res.status(200).json({ Data: [], Success: true, Message: "" });
      else res.status(500).json({ Data: [], Success: false, Message: "" });
    }
  );
});

// @desc        Delete a student
// @route       Delete /api/student/:id
// @access      Public
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await client.query(`
  DELETE FROM products 
  WHERE product_id = $1;`, [id], (err, result) => {
    if (!err) res.status(200).json({ Data: [], Success: true, Message: "" });
    else res.status(500).json({ Data: [], Success: false, Message: "" });
  });
});


exports.getUserProgressingProducts = asyncHandler(async (req, res, next) => {
  const { username } = req.params;
  await client.query(`
  select p.* from products p 
join card_product cp on p.product_id = cp.product_id
join cards c on c.card_id = cp.card_id 
join "users" u on u.username = c.username 
join card_status cs on cs.row_id = c.status_id 
where u.username = $1 and cs.card_status = 'progressing'`, [username], (err, result) => {
    if(result){
      const { rows } = result;
      if (!err) res.status(200).json(rows);
    }
  });
});


exports.create = asyncHandler(async (req, res, next) => {
  const { username ,password ,phone ,first_name,last_name} = req.body;
  await client.query(
    `insert into "users"  (username ,"password" ,phone ,first_name,last_name)
    values ($1,$2,$3,$4)`,
    [username ,password ,phone ,first_name,last_name],
    (err, result) => {
      if (!err) res.status(200).json({ Data: [], Success: true, Message: "" });
      else res.status(500).json({ Data: [], Success: false, Message: "" });
    }
  );
});