// controllers/generateAndSaveUsers.js
const fetch = require('node-fetch'); // Importar fetch
const userModel = require('../../dao/mongo/models/user.model');
const bcrypt = require('bcryptjs');
const CustomError = require("../../utils/CustomErrors/CustomError");
const { generateUserErrorInfo } = require("../../utils/CustomErrors/info");
const EErrors = require("../../utils/CustomErrors/EErrors");
const { cartService } = require("../../services/index.service");
const config = require("../../config/config");

const generateAndSaveUsers = async (req, res) => {
    try {
        // Llamar al endpoint /mockingusers para generar usuarios
        const response = await fetch(`http://localhost:${config.PORT}/api/mocks/mockingusers`, { method: 'GET' }); // Cambia YOUR_PORT por tu puerto actual
        const users = await response.json(); // Obtener la lista de usuarios generados

        // Guardar cada usuario en la base de datos
        for (const user of users) {
            const { first_name, last_name, age, email, password } = user;
            if (!first_name || !last_name || !email || !age) {
                CustomError.createError({
                    name: "User creation error",
                    cause: generateUserErrorInfo({ first_name, last_name, age, email }),
                    message: "Error to create a user",
                    code: EErrors.INVALID_TYPE_ERROR,
                });
            }

            const existe = await userModel.findOne({ email });
            if (existe) continue; // Si el usuario ya existe, saltar a la siguiente iteración

            let cartId = await cartService.createCart();
            cartId = cartId._id.toString();

            await userModel.create({
                first_name: first_name.trim(),
                last_name: last_name.trim(),
                age,
                email: email.trim(),
                password: bcrypt.hashSync(password.trim(), bcrypt.genSaltSync(10)),
                cartId,
            });
        }

        return res.status(200).json({ status: "success", message: "Users generated and saved successfully." });
    } catch (error) {
        req.logger.error(error.message);
        return res.sendServerError(error.message);
    }
};

module.exports = { generateAndSaveUsers };
