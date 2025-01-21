import { dbConfig } from "../config/db.config.js";
import { initModels } from "../utils/db/initModels.js";
import { setupAssociation } from "../utils/db/setupAssociations.js";

export const dbConnect = async() =>{
    try {
       await dbConfig.authenticate();
       initModels(dbConfig)
       setupAssociation()
       await dbConfig.sync({ alter:true })

       console.log('Conexión exitosa a PostgreSQL mediante Sequelize 💪🏻');
    } catch (error) {
        console.error('No se pudo establecer la conexión con la base de datos 🚨', error);
        process.exit(1)
    }
}