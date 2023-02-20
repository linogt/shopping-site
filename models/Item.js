const Sequelize = require('sequelize');
const db = require('../db/connection');

const Item = db.define('item',{
    nome:{
        type: Sequelize.STRING,
    },
    imagem:{
        type: Sequelize.STRING,
    },
    descricao:{
        type: Sequelize.STRING,
    },
    preco:{
        type: Sequelize.STRING,
    },
    createdAt:{
        type: Sequelize.DATE,
    },
    updatedAt:{
        type: Sequelize.DATE,
    }
});

module.exports = Item;