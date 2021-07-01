const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products - DONE
    include: [Product],

  })
  .then((categories) => res.json(categories))
  .catch((err) => res.status(404).json(err))

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products -- DONE
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category - DONE
  try {
    console.log('req:', req.body)
    await Category.create(req.body)
    res.status(200).json(req.body)
  } catch (err) {
        console.log(err);
      res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value - DONE
  Category.update(req.body, {
    where: {
      id: req.params.id,
       //add .then & catch - DONE
    }, catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value - DONE
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id! Please try again!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
