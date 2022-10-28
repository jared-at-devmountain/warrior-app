const Sequelize = require('sequelize')
require('dotenv').config()
const CONNECTION_STRING = process.env.CONNECTION_STRING

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    submitWarrior: (req, res) => {
        const name = req.body.name
        const power = req.body.power

        sequelize.query(`
            INSERT INTO warriors (name, power)
            VALUES ('${name}', ${power});
        `)
        .then((dbRes) => {
            res.status(200).send()
        })
    },
    submitWeapon: (req, res) => {
        const name = req.body.name
        const power = req.body.power

        sequelize.query(`
            INSERT INTO weapons (name, power)
            VALUES ('${name}', ${power});
        `)
        .then((dbRes) => {
            res.status(200).send()
        })
    },
    getPairs: (req, res) => {
        sequelize.query(`
            SELECT warriors.name AS war, weapons.name AS wea
            FROM warriors
            JOIN warrior_weapons
            ON warriors.id = warrior_weapons.warrior_id
            JOIN weapons
            ON weapons.id = warrior_weapons.weapon_id;
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
    },
    pair: (req, res) => {
        const {warrior, weapon} = req.body

        sequelize.query(`
            INSERT INTO warrior_weapons (weapon_id, warrior_id)
            SELECT we.id, wa.id
            FROM warriors wa, weapons we
            WHERE we.name = '${weapon}' AND wa.name = '${warrior}';
        `)
        .then(() => {
            res.status(200).send()
        })
    },
    seed: (req, res) => {
        sequelize.query(`
            DROP TABLE IF EXISTS warrior_weapons;
            DROP TABLE IF EXISTS  warriors;
            DROP TABLE IF EXISTS  weapons;

            CREATE TABLE warriors (
                id SERIAL PRIMARY KEY,
                name VARCHAR NOT NULL UNIQUE,
                power INT NOT NULL
            );

            CREATE TABLE weapons (
                id SERIAL PRIMARY KEY,
                name VARCHAR NOT NULL UNIQUE,
                power INT NOT NULL
            );

            CREATE TABLE warrior_weapons (
                id SERIAL PRIMARY KEY,
                weapon_id INT NOT NULL REFERENCES weapons(id),
                warrior_id INT NOT NULL REFERENCES warriors(id)
            );

            INSERT INTO weapons (name, power)
            values
            ('axe', 10),
            ('staff', 12),
            ('longbow', 8),
            ('sword', 9),
            ('shortbow', 6),
            ('holy book', 10),
            ('mace', 11);

            INSERT INTO warriors (name, power)
            values
            ('horace', 3),
            ('mikey', 1),
            ('billy bob', 1),
            ('joseph', 2),
            ('phil', 4),
            ('sampson', 5),
            ('rebecca', 5),
            ('samantha', 5);

            INSERT INTO warrior_weapons (weapon_id, warrior_id)
            values
            (1, 8),
            (5, 8),
            (7, 1),
            (4, 2),
            (2, 2),
            (6, 2),
            (3, 3),
            (7, 5),
            (1, 5),
            (7, 6),
            (7, 3);
        `)
        .then(() => {
            res.sendStatus(200)
        })
    }
}