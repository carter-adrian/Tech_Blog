const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/helpers');


const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: "Super seret shhhhhh!",
    cookie: {maxAge: 1800000},
    resave: false,
    saveUnintialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(session(sess));


app.use(routes);


sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});

