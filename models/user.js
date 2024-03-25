const db = require("../db");
const bcrypt = require("bcrypt");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { sqlForPartialUpdate } = require("../helpers/sql");

class User {

    static async authenticate(username, password){
        const result = await db.query(
            `SELECT username, password, first_name AS "firstName", last_name AS "lastName", email FROM users WHERE username = $1`,[username],
        );

        const user = result.rows[0];

        if (user){
            const isValid = await bcrypt.compare(password, user.password);
            if(isValid === true){
                delete user.password;
                return user;
            }
        }
        throw new UnauthorizedError("Invalid username/password");
    }

    static async register({ username, password, firstName, lastName, email }){
        const duplicateCheck = await db.query(
            `SELECT username FROM users WHERE username = $1`, [username],
        );

        if(duplicateCheck.rows[0]){
            throw new BadRequestError(`Duplicate username: ${username}`);
        }
       
        // console.log(BCRYPT_WORK_FACTOR);
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)
            RETURNING username, first_name AS "firstName", last_name AS "lastName", email`, [username, hashedPassword, firstName, lastName, email],
        );

        const user = result.rows[0];

        return user;
    }

    // Given an username, return data about the user
    static async get(username){
        const userRes = await db.query(
            `SELECT username, first_name AS "firstName", last_name AS "lastName", email FROM users
            WHERE username = $1`, [username],
        );

        const user = userRes.rows[0];

        if(!user) throw new NotFoundError(`User: ${username} not found`);

        return user;
    }

    static async getUserId(username) {
        console.log(`getUserId username ${username}`);
        const result = await db.query(
            `SELECT UserId FROM Users WHERE Username = $1`, [username],
        );

        const user = result.rows[0];
        console.log(`after query request, user is ${user}`);

        if (!user) throw new NotFoundError(`User with username: ${username} not found`);
        
        console.log(`returning userid ${user.userid}`);
        return user.userid;
    }

    // username updates their own data, to be used to edit their profile.
    static async update(username, data){
        if(data.password){
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }

        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                firstName: "first_name",
                lastName: "last_name",

            });
            const usernameVarIdx = "$" + (values.length + 1);

            const querySql = `UPDATE users SET ${setCols} WHERE username=${usernameVarIdx}
            RETURNING username, first_name AS "firstName", last_name AS "lastName", email`;
            const result = await db.query(querySql, [...values, username]);
            const user = result.rows[0];

            if(!user) throw new NotFoundError(`User: ${username} not found!`);

            delete user.password;
            return user;

    }
}

module.exports = User;