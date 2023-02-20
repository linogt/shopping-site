const express = require('express');
const router  = express.Router();
const Item     = require('../models/Item');



router.get('/view/:id', (req,res) => Item.findOne({
    where: {id:req.params.id}
}).then(item => {
    res.render('view', {
        item
    });
}).catch(err => console.log(err))
);

router.get('/add',(req,res) =>{
    res.render('add');
})



router.post('/add', (req,res)=>{
    let{nome,descricao,preco,imagem}= req.body;


    // insert
    Item.create({
        nome,
        descricao,
        preco,
        imagem
    })
    .then(()=> res.redirect('/'))
    .catch(err=> console.log(err));
});


module.exports = router;