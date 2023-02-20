const express    = require('express');
const exphbs = require('express-handlebars');
const app        = express();
const path = require('path');
const db         = require('./db/connection');
const bodyParser = require('body-parser');
const Item = require('./models/Item')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O express está rodando na porta ${PORT}`);
});



app.use(bodyParser.urlencoded({ extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine','handlebars');

app.use(express.static(path.join(__dirname,'public')));

// db connection
db
.authenticate()
.then(()=>{
    console.log("Conectou ao banco com sucesso");
})
.catch(err=>{
    console.log("Ocorreu um erro ao conectar", err);
})

app.get('/', (req,res)=>{

    let search = req.query.item;
    let query = '%'+search+'%';
    if(!search){
        
        Item.findAll({order:         [['createdAt','DESC']
        ]})
        .then(items => {
        res.render('index', {
            items
        });
        })
        .catch(err=> console.log(err));

    } else {
        
    Item.findAll({where: {title: {[Op.like]: search}},
    order: [['createdAt','DESC']
]})
.then(items => {
    res.render('index', {
        items
    });
})
.catch(err=> console.log(err));
    }

    
});

// jobs routes
app.use('/items', require('./routes/items'));