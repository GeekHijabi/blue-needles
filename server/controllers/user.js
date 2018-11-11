import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

const { User } = db;

dotenv.load();
const secret = process.env.SECRETKEY;
const salt = bcrypt.genSaltSync(5);

export default {
  signUp(req, res) {
    const { userName, email } = req.body;
    User.findOne({
      where: {
        $or: [
          {
            userName: req.body.userName
              .trim().toLowerCase().replace(/ +/g, '')
          },
          { email: req.body.email }
        ]
      },
    })
      .then((userFound) => {
        if (userFound) {
          return res.status(409).json({
            error: 'User already exists'
          });
        }
        return User
          .create({
            userName,
            email,
            password: bcrypt.hashSync(req.body.password, salt, null),
            role_id: 2
          })
          .then((user) => {
            const userDetail = {
              userName: user.userName,
              email: user.email
            };
            res.status(201).json({ userDetail });
          });
      }).catch(error => res.status(500).json({ error: error.message }));
  },

  signIn(req, res) {
    const { identifier } = req.body;
    User.findOne({
        where: {
          $or: [
            {
              email: identifier
            },
            {
              userName: identifier
            }
          ]
        },
      })
      .then((userDetail) => {
        if (!userDetail) {
          return res.status(401).json({
            error: 'Email/Username and password does not match'
          });
        }
        const { password, role_id } = userDetail;
        if (!bcrypt.compareSync(req.body.password, password)) {
          return res.status(401).json({
            error: 'Email/Username and password does not match'
          });
        }
        const token = jwt.sign(
          { id: userDetail.role_id }
          , secret
          , { expiresIn: '48h' }
        );
        return res.status(200)
          .json({
            message: 'You have successfully signed in!',
            role_id,
            token
          });
      }).catch(error => res.status(500).json({
        error: error.message
      }));
   },
};
