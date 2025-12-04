const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/pool");
const bcrypt = require("bcrypt");

function initializePassport(passport) {
    passport.use(new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                // Use a case-insensitive query for email
                const result = await pool.query(
                  `SELECT * FROM users WHERE LOWER(email) = LOWER($1)`, 
                  [email]
                );

                if (result.rows.length === 0) {
                    return done(null, false, { message: "No user found with that email." });
                }
                const user = result.rows[0];

                const isValidPassword = await bcrypt.compare(password, user.password_hash);
                if (!isValidPassword) {
                    return done(null, false, { message: "Incorrect password" });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
            done(null, result.rows[0]);
        } catch (error) {
            done(error);
        }
    });
}

module.exports = { initializePassport };
