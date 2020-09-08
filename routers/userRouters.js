import express from 'express';
import userModel from '../models/userModel.js'

const router = express();
router.use(express.Router());
//create
router.post('/register', async(req, res, next) => {

    try {
        const user = new userModel(req.body);
        if(!user.email && !user.password) {
            res.status(402).send('Preencher os campos');
        }else {
            await user.save();
            res.send(user);
        }
    } catch (err) {
        next(err);
    }
});
//login
router.get('/login', async (req,res, next) => {

    try {
        const user = req.body;
        const findUser = await validateAccount(user);    
        res.send(findUser)        
    } catch (err) {
        next(err);
        
    }
    
    router.use((err, req, res, next) => {
        res.status(400).send({ error: err.message });
      });
});

const validateAccount = async (user) => {
  //traz apenas email e o password para consulta no BD;
  const { email, password } = user;
  user = {
    email,
    password,
  };
  try {
    user = await userModel.findOne(user);
    if (!user) {
      throw new Error(`(${email}/${password}) Usuario/Senha Invalidos`);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default router;