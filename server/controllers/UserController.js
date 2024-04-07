const db = require("../model/db");
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken")


// Fonction pour récupérer tous les utilisateurs
const getUser = async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM utilisateurs");
        return res.json(response.rows);
    } catch (error) {
        console.log("Erreur lors de la récupération des utilisateurs :", error);
        return res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
    }
}

// Fonction pour enregistrer un utilisateur
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const pwdhash = await hash(password, 10);
        await db.query("INSERT INTO utilisateurs (email, password) VALUES ($1, $2)", [email, pwdhash]);
        return res.json("Succès");
    } catch (error) {
        console.log("Erreur lors de l'inscription d'un utilisateur :", error);
        return res.status(500).json({ error: "Erreur lors de l'inscription d'un utilisateur" });
    }
}


const login=async(req,res)=>
{
    let user = req.user
    let payload={
        id:user.id_user,
        email:user.email
    }
    const secret = process.env.SECRET
    try
    {
        const token = jwt.sign({secret},"jwtSecretKey", {expiresIn:300})
        return res.cookie("token",token, {httpOnly:true}).json({payload:payload,token:token,login:true})
    }catch (e)
    {
        console.log("Erreur lors de l'inscription d'un utilisateur :", e);
        res.status(500).json({ error: "Erreur lors de l'inscription d'un utilisateur" });
    }
}


module.exports = { getUser, register ,login};
