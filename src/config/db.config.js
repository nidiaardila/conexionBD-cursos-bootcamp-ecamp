import { Sequelize } from 'sequelize';
import {config} from './env.config.js';

const { host, user,  pass, name, dialect, port} = config.db;

export const dbConfig = new Sequelize(name, user, pass, {
    host, dialect, port,
    dialectOptions: {
        ssl: {
            require: true, //Fuerza el uso de conexiones SSL para garantizar la seguridad de los datos
            rejectUnauthorized: false, // Desactiva la verificación del certificado SSL (no recomendado en entornos de producción)
        },
    },
});
