const { check } = require("express-validator");
const db = require("../model/db");
const { hash, compare } = require("bcrypt");



function createValidators() {
    const validators = [];

    const password = check("password")
        .isLength({ min: 6, max: 20 })
        .withMessage("Le mot de passe doit contenir entre 6 et 20 caractères");

    const email = check("email")
        .isEmail()
        .withMessage("Entrez une adresse e-mail valide");

    const emailExist = check("email").custom(async (value) => {
        const { rows } = await db.query("SELECT * FROM utilisateurs WHERE email = $1", [value]);
        if (rows.length > 0) {
            throw new Error('Cet e-mail est déjà enregistré, veuillez en choisir un autre');
        }
    });

    validators.push(password);
    validators.push(email);
    validators.push(emailExist);
    return validators;
}


const loginValidation = () => {
    return check("email").custom(async (value, { req }) => {
        const user = await db.query("SELECT * FROM utilisateurs WHERE email=$1", [value]);
        if (!user.rows.length) {
            throw new Error('Cet e-mail n\'existe pas');
        }
        const validPwd = await compare(req.body.password, user.rows[0].password);
        if (!validPwd) {
            throw new Error('Mot de passe incorrect');
        }

        req.user = user.rows[0];
    });
};



module.exports =createValidators()
module.exports = loginValidation()

