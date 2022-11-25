import { User } from "../models/User.js"
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body
    try {
        //alternativa 2 para evitar usuario repetido por email
        /* Looking for a user with the same email. */
        let user = await User.findOne({ email })
        if (user) throw ({ code: 11000 })


        /* Creating a new user and saving it to the database. */
        user = new User({ email, password });
        await user.save();

        //jwt

        return res.status(201).json({ ok: true });
    } catch (error) {
        /* Checking if the user already exists.
        Alternativa por defecto mongoose */
        console.log(error)
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Ya existe este usuario' })
        }
    }
    return res.status(500).json({ error: "Error de servidor" })
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email })
        if (!user) return res.status(403).json({ error: 'No existe este usuario' });


        const respuestaPassword = await user.comparePassword(password)

        /* Checking if the password is correct. */
        if (!respuestaPassword) {
            return res.status(403).json({ error: 'Contraseña incorrecta' });
        }
        //generar el token de JWT
 /* Creating a token with the user id and the secret key. */
            const token = jwt.sign({uid:user._id},process.env.JWT_SECRET)
            return res.json({token})



        return res.json({ ok: 'login' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Error de servidor" })
    }

}
