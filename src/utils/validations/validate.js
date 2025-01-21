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
 * Valida si los datos están duplicados en la base de datos.
 * @param {Model} Modelo - El constructor del modelo que interactúa con la base de datos.
 * @param {object} data - Los datos que se deben evaluar en la petición hacia la base de datos.
 * @param {Array<string>} fields - Los campos que se desean evaluar en la cláusula WHERE.
 * @param {string} excluidID - El ID en formato UUID que se excluye de esta validación. Por defecto es null.
 * @throws {ValidationError} - Si se encuentra un valor duplicado, se lanzará un error de validación.
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