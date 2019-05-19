const { check } = require('express-validator/check');

module.exports.validateCreatePost = () => [
    check('title',
      'Title must be between 2 and 40 characters long.')
      .exists().isLength({ min: 2, max: 40 }),
    check('type',
      'Must select a housing type.')
      .exists(),
    check('price',
      'Price must be a value greater than 0 and no characters.')
      .exists().matches(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/g),
    check('size',
      'Size of the living space must be a value greater than 0 and no characters.')
      .exists().matches(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/g),
    check('num_bed',
      'Number of bedrooms must be a value greater than 0 and no characters.')
      .exists().matches(/^[+]?[1-9]\d*\.?[0]*$/g),
    check('num_bath',
      'Number of bathrooms must be a value greater than 0 and no characters.')
      .exists().matches(/^[+]?[1-9]\d*\.?[0]*$/g)    
  ];