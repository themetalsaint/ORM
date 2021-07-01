const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    include: [Product],

  })
  .then((categories) => res.json(categories))
  .catch((err) => res.status(404).json(err))


  
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
       
    }
  })//add .then & catch
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
