const User = require ('../models/User');

const store = async (req, res) => {
    const { email} = req.body;
    console.log(email);

    let usuario = await User.findOne // busca o primeiro email
    console.log(usuario);

    if(!usuario) usuario = await User.create({email}); // se nao houver o usuario no email, ele cria um 

    return res.json(usuario); // retorna a resposta 



}

module.exports = { store };