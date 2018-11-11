import { adminAuthenticate, authenticateUser } from '../middleware/authenticate';
import {SignUpFieldValidation , signInFieldValidation} from '../middleware/validation';

import user from '../controllers/user';

const baseUrl = '/api/v1';

const routes = (app) => {
  app.get(`${baseUrl}`, (req, res) => {
    res.status(200).send({
      message: 'Welcome to BlueNeedles API'
    });
  });

  app.post(
    `${baseUrl}/user/signup`,
    SignUpFieldValidation,
    user.signUp
  );
  app.post(
    `${baseUrl}/user/signin`,
    signInFieldValidation,
    user.signIn
  );
  app.get(
    `${baseUrl}/admin`,
    user.adminLogIn
  );
}
export default routes
