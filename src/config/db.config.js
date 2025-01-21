import { Sequelize } from 'sequelize';
import {config} from './env.config.js';

const { host, user,  pass, name, dialect, port} = config.db;

export const dbConfig = new Sequelize(name, user, pass, {
    host, dialect, port,
    dialectOptions: {
        ssl: {
            require: true, // Obliga a usar SSL
            rejectUnauthorized: false, // Desactiva la verificación de certificado
        },
    },
});
