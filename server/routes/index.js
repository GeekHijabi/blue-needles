import { adminAuthenticate, authenticateUser } from '../middleware/authenticate';
import {SignUpFieldValidation , signInFieldValidation} from '../middleware/validation';

import user from '../controllers/user';
import product from '../controllers/product';

const baseUrl = '/api/v1';

const routes = (app) => {
  app.get(`${baseUrl}`, (req, res) => {
    res.status(200).send({
      message: 'Welcome to BlueNeedles API'
    });
  });

  app.post(`${baseUrl}/user/signup`, SignUpFieldValidation, user.signUp);

  app.post(`${baseUrl}/user/signin`, signInFieldValidation, user.signIn);

  app.post(`${baseUrl}/product/add`, authenticateUser, product.addProduct);

  app.get(`${baseUrl}/products`, product.getProducts);

  app.patch(`${baseUrl}/product/:productId`, authenticateUser, product.editProduct);

  app.get(`${baseUrl}/product/:productId`, product.getProduct);

  app.delete(`${baseUrl}/product/:productId`, authenticateUser, product.deleteProduct);
}
export default routes
