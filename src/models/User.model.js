import { DataTypes, Model } from "sequelize";

export class User extends Model{}
export const initUser = (dbConfig) => {
User.init(
    {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate:{
            notEmpty: {msg: "The name cannot be an empty field."},
            len: {
                args: [2, 50],
                msg: "The name must be between 2 and 50 characters long."
            },
            is: {
                args: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/,
                msg: "The name can only contain letters from the Spanish alphabet, accents, umlauts, and spaces."
            },
        }
    },
    lastName:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate:{
            notEmpty: {msg: "The lastName cannot be an empty field."},
            len: {
                args: [2, 50],
                msg: "The lastName must be between 2 and 50 characters long."
            },
            is: {
                args: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/,
                msg: "The lastName can only contain letters from the Spanish alphabet, accents, umlauts, and spaces."
            },
        }
    },
    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "The email address entered is already in use." },
        validate: {
          notEmpty: { msg: "The email cannot be an empty field" },
          isEmail: { msg: "The entered email is not valid" },
          is: {
               args: /^[a-zA-Z0-9._%+-áéíóúÁÉÍÓÚñÑ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
               msg: "The email format is not valid.",
          }
        },
        
      },

    },

    {
        sequelize: dbConfig,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        paranoid: true
  
    }

  );
}