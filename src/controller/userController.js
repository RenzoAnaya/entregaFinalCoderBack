import usersDao from '../DAO/userDao.js';
import validPassword from '../utils/validPassword.js'
import generateToken from '../utils/generateToken.js';
import {  signUpEmail } from '../utils/email.js'

class  usersController{
    async signUp(req, res) {
        try {
          const newUserData = req.body;
          newUserData.password = req.body.password1;
          const newUser = await usersDao.create(newUserData);
          signUpEmail(newUser);
          return res.redirect('login');
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error_description: 'Error en el servidor.' });
        }
      }
    
      async login(req, res) {
        try {
          const { email, password } = req.body;
          if (!email || !password) {
            return res.status(401).json({ error_description: 'Complete los datos' });
          }
          const user = await usersDao.getUser(email);
          if (!user)
            return res.status(404).json({ error_description: 'Usuario no encontrado' });
          const isValid = await validPassword(password, user.password);
          if (!isValid)
            return res.status(404).json({ error_description: 'Error de contraseña' });
          req.session.user = user;
          return res.json({ token: await generateToken(user) });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error_description: 'Error de servidor.' });
        }
      }
      async getUser(req, res) {
        try {
          res.status(200).json(await usersDao.getUser(req.user.email));
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error_description: 'Error de servidor.' });
        }
      }
    
}

export default new usersController();