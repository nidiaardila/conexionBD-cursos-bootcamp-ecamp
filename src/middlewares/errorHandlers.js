import { CustomError } from "../errors/CustomError.js";
import { InternalServerError } from "../errors/typeErrors.js";

export const errorHandler = (err, req, res, next) => {
  if (!(err instanceof CustomError)) {
    err = new InternalServerError(
      err.message || "Error Inesperado",
      "Ha ocurrido un error inesperado. Por favor, contacta a nuestro equipo de soporte técnico"
    );
  }

  const errorResponse = {
    status: "Error",
    message: err.message,
    code: err.statusCode,
    details: err.details,
  };

  console.error(
    `ERROR: ${err.message} --- Details: ${err.details} ---- status: ${err.statusCode}`
  );

  res.status(err.statusCode).json(errorResponse);
}; 