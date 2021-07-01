const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data - DONE
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data - DONE
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}]
    });
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag - DONE
  try {
    await Tag.create(req.body)
    const newTag = await Tag.findOne({ where: req.body })
  res.status(200).json([{message: 'New tag was created successfully!'}, newTag])
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value - DONE
  try {
    console.log('req:', req.body)
    await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    const updated_tag = await Tag.findByPk(req.params.id) 
    res.status(200).json({message: 'Tag updated successfully!', updated_tag})
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value - DONE
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this ID! Try again!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
