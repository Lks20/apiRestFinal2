
import mongoose from "mongoose";


try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log('Conexion DB ok 👋')
} catch (error) {
    console.log('Error de conexion a la DB:' + error)
}

