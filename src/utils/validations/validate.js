import {Op} from 'sequelize'
import { NotFoundError, ValidationError } from "../../errors/typeErrors.js"

export const isArrayValidate = (data) => {
    if (!Array.isArray(data))
        throw new ValidationError(
        "The entered data is not an array."
    );
}


export const isEmptyData = (data) => {
    if(!data || data.length === 0) {
        throw new ValidationError("The entered data is empty.")
    }  
}

export const isEmptyResponseData = (data) => {
    if (!data || data.length === 0) {
      throw new NotFoundError("The requested data was not found.");
    }  
}

/**
 * Valida si el dato está duplicado
 * @param {Model} Modelo - Modelo constructor de los datos que se comúnica con la DB
 * @param {object} data - Datos a evaluar en la petición hacia la DB 
 * @param {Array<string>} fields - Campo que se desea evaluar en la clausula Where
 * @param {string} excluidID - ID en formato UUID que será excluida de esta validación. Por defecto es null 
 * @throws {ValidationError} - Si el valor existe arrojara un error de validación 
 */
export const validateExistData = async(Modelo, data, fields, excluidID = null ) => {
    const duplicatedFlieds = [];

    isArrayValidate(fields)
    
    for(const field of fields) {
        if(data[field]) {
            const whereClause = { [field]: data[field] }
            
            if(excluidID) {
                whereClause.id = { [Op.ne]: excluidID } //Op.ne => Operador (Sequelize) Not Equal(ne)
            }
            
            const existData = await Modelo.findOne({ where: whereClause})
            if(existData) {
                duplicatedFlieds.push(field)
            }
        }
    }
    
    if(duplicatedFlieds.length > 0) {
        const fieldsString = duplicatedFlieds.map(field => `"${field}"`).join(', ');
        throw new ValidationError(`The fields ${fieldsString} are already in use by another record in '${Modelo.name}'.`)
    } 
}