import dotenv from 'dotenv';

dotenv.load();

export const SignUpFieldValidation = (req, res, next) => {
  const filter =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!req.body.userName ||
    req.body.userName.length < 6 ||
    req.body.userName
      .toLowerCase().replace(/ +/g, '').trim() === '') {
    return res.status(422).json({
      error: 'Please provide a valid username with atleast 6 characters.'
    });
  }
  if (!req.body.email || !filter.test(req.body.email)) {
    return res.status(422).json({
      error: 'Please supply valid email address'
    });
  }
  if (!req.body.password || req.body.password.trim() === '') {
    return res.status(422)
      .json({
        error: 'password cannot be empty'
      });
  }
  if (req.body.password.length < 8) {
    return res.status(422).json({
      error: 'password must be 8 characters or more'
    });
  }
  next();
}

export const signInFieldValidation = (req, res, next) => {
  if (!req.body.identifier || req.body.identifier.trim() === '') {
    return res.status(422).json({ error: 'Invalid credentials' });
  }
  if (!req.body.password || req.body.password.trim() === '') {
    return res.status(422).json({ error: 'Password is required' });
  }
  next();
};

