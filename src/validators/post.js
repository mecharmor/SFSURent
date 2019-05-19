/*
Author: Cory Lewis
Date: 5/18/19
Description: Validation rules for create post.
*/
const { check } = require('express-validator/check');

module.exports.validateCreatePost = () => [
    check('title',
      'Title must be between 2 and 40 characters long.')
      .exists().isLength({ min: 2, max: 40 }),
    check('listing_type_id',
      'Must select a housing type.')
      .exists().isLength({ min: 0, max: 2 }),
    check('address',
    'Must Enter an Address')
    .exists(),
    check('price',
      'Price must be a value greater than 0 and no characters.')
      .exists().isNumeric(),
    check('size',
      'Size of the living space too large or contains characters')
      .exists().isNumeric().isLength({ min: 0, max: 10 }),
    check('num_bed',
      'Number of bedrooms too large or contains characters')
      .exists().isNumeric().isLength({ min: 0, max: 10 }),
    check('num_bath',
      'Number of bathrooms too large or contains characters')
      .exists().isNumeric().isLength({ min: 0, max: 10 })
];


//.matches(/^[1-9]\d*$/gm)


  