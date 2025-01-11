import { dbConfig } from "../config/db.config.js";
import { initModels } from "../utils/db/initModels.js";
import { setupAssociation } from "../utils/db/setupAssociations.js";



export const dbConnect = async() =>{
    try {
       await dbConfig.authenticate();
       initModels(dbConfig)
       setupAssociation()
       await dbConfig.sync({ alter:true })

        console.log('Se logró la conexión a Postgres a través de Sequelize 😺')
    } catch (error) {
        console.error('No pudimos conectarnos a la DB 🙀', error);
        process.exit(1)
    }
}