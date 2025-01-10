import { dbConnect } from "./dbConnection.js";


export const serverInit = async(app, port) => {
    try {
        console.log('Verificando conexión a la base de datos');
        await dbConnect()
        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port} 😺`);
        })
    } catch (error) {
        console.error('Error al inicializar el servidor', error);
    }
}