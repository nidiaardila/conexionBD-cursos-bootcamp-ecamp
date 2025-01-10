import { CustomError } from "../errors/CustomError.js";
import { InternalServerError } from "../errors/typeErrors.js";

export const errorHandler = (err, req, res, next) => {
  if (!(err instanceof CustomError)) {
    err = new InternalServerError(
      err.message || "Error Inesperado",
      "Tenemos un error imprevisto, por favor contacta con nuestro equipo de soporte"
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