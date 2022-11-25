import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js'
import { body } from 'express-validator'
import { validationResultExpress } from '../middlewares/validationResultExpress.js';

const router = Router();

/* A middleware that validates the data that comes from the client. */
router.post("/register", [
    body('email', "Formato de Email Incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Minimo 6 caracteres")
        .trim()
        .isLength({ min: 6 }),
    body("password", "formato de password incorrecto")
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error('No coinciden las contraseñas')
            }
            return value;
        })
], 
validationResultExpress,
register);

router.post("/login", [body('email', "Formato de Email Incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
body("password", "Minimo 6 caracteres")
    .trim()
    .isLength({ min: 6 }),
], 
validationResultExpress,
login);

export default router;