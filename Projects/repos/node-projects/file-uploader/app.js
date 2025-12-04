require('dotenv').config();
const express = require('express');
const session = require('express-session');
const {PrismaClient} = require('@prisma/client');
const {PrismaSessionStore} = require('@quixo3/prisma-session-store');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

//Setting ejs engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//serving static files if needed
app.use(express.static(path.join(__dirname, 'public')));

//middleware for parsing form data and JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

//session middleware with prisma session store
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // cleanup expired sessions every 2 minutes
      dbRecordIdIsSessionId: true,  // <-- This is crucial
    })
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Passport Local Strategy config
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await prisma.user.findUnique({where: {username}});
            if (!user) return done(null, false, {message: 'Incorrect username'});
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) return done(null, false, {message: 'Incorrect Password'});
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({where: { id }});
        done(null, user);
    } catch (error) {
        done(error);
    }
});

//Mount route files
const authRoutes = require('./routes/auth');
const folderRoutes = require('./routes/folder');
const fileRoutes = require('./routes/file');

app.use('/', authRoutes);
app.use('/folders', folderRoutes);
app.use('/files', fileRoutes);

app.get('/', (req,res) => res.redirect('/dashboard'));

app.listen(port, () => {
    console.log(`Server running on http://locahost:${port}`);
})