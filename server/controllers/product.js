import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

const { Product, User } = db;

export default {
  addProduct(req, res) {
  const {id} = req.decoded;
    const {
      productName,
      productDescription,
      imageUrl,
      productMaterial
    } = req.body;

    Product.findOne({
      where: {
        productName
      },
    })
    .then((productFound) => {
      if (id !== 1) {
        return res.status(401).json({
          error: 'Unauthorized route'
        });
      }
      else if(productFound) {
        return res.status(409).json({
          error: 'Product already exists'
        })
      }
      else return Product
        .create({
          productName,
          productDescription,
          imageUrl,
          productMaterial
        })
        .then(newProduct =>
          res.status(201).json({
            productName: newProduct.productName,
            productDescription: newProduct.productDescription,
            productMaterial: newProduct.productMaterial,
            imageUrl: newProduct.imageUrl,
            id: newProduct.id,
          }));
      })
      .catch((error) => {
        res.status(500).json({ error: "internal server error" });
      });
  },

  getProduct(req, res) {
    Product
      .findOne({ where: { id: req.params.productId } })
      .then((aProduct) => {
        if (!aProduct) {
          return res.status(404).json({
            error: 'Product does not exist'
          });
        }
        return res.status(200).json(aProduct);
      })
      .catch(error => res.status(404).json({ error: 'Internal server error' }));
  },

  getProducts(req, res) {
    const limitValue = req.query.limit || 6;
    const pageValue = (req.query.page - 1) || 0;
    const sort = req.query.sort ? req.query.sort : 'createdAt';
    const order = req.query.order ? req.query.order : 'DESC';
    Product.findAndCountAll({
      order: [
        [sort, order]
      ],
      limit: limitValue,
      offset: pageValue * limitValue
    })
    .then(productList => res.status(200).json({
      page: (pageValue + 1),
      totalCount: productList.count,
      pageCount: Math.ceil(productList.count / limitValue),
      pageSize: parseInt(productList.rows.length, 10),
      products: productList.rows
    }));
  },

  searchProduct(req, res) {
    const limitValue = req.query.limit || 6;
    const pageValue = (req.query.page - 1) || 0;
    Product
      .findAll({
        where: {
              productName: {
                $ilike: `%${decodeURIComponent(req.query.search)}%`
              }
        },
        limit: limitValue
      }).then(searchFound => res.status(200).json({
        page: (pageValue + 1),
        totalCount: searchFound.count,
        pageCount: Math.ceil(searchFound.count / limitValue),
        searchFound
      }))
      .catch(() => res.status(500).json({ error: 'internal server error' }));
  },

  editProduct(req, res) {
    const { id } = req.decoded;
    const {
      productName,
      productDescription,
      productMaterial,
      imageUrl
    } = req.body;
    return Product
      .find({ where: { id: req.params.productId } })
      .then((productFound) => {
        if (!productFound) {
          return res.status(404).send({ error: 'Product not found' });
        }
        if (id === 1) {
          productFound
            .update({
              productName: productName || productFound.productName,
              productDescription: productDescription || productFound.productDescription,
              productMaterial: productMaterial || productFound.productMaterial,
              imageUrl: imageUrl || productFound.imageUrl,
            })
            .then(updatedProduct => res.status(200).json({
              updatedProduct
            }));
        } else {
          res.status(403)
            .send({
              error: 'You are not authorized to perform this action'
            });
        }
      }).catch(() => res.status(500).json({ error: 'Internal server error' }));
  },

  deleteProduct(req, res) {
    const { id } = req.decoded;
    return Product.find({ where: { id: req.params.productId } })
      .then((productFound) => {
        if (!productFound) {
          return res.status(404).send({ error: 'Product not found' });
        }
        if (id === 1) {
          return productFound.destroy({ productFound })
            .then(() => res.status(200).json({
              message: 'Product deleted successfully'
            }));
        }
        return res.status(403).send({
          error: 'You are not authorized to perform this action',
        });
      })
      .catch(() => {
        res.status(500).json({
          error: 'Internal Server Error'
        });
      });
  },


}
