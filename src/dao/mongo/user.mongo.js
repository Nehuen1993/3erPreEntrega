import usersModel from './models/Users.js'

export default class Users {
    constructor() {}

    async findOne(query, projection) {
        try {
            return await usersModel.findOne(query, projection);
        } catch (error) {
            throw new Error(`Error en la búsqueda del usuario: ${error}`);
        }
    }


async create(userData) {
    try {
        return await usersModel.create(userData);
    } catch (error) {
        throw new Error(`Error al crear un usuario: ${error}`);
    }
}
}




