import { setupUserBootcamp } from "../../models/index.js";

export const setupAssociation = () => {
    try {
       setupUserBootcamp();
    } catch (error) {
        console.error('Ocurrió un error al configurar las asociaciones entre el usuario y el bootcamp ⚠️', error);
    }
}