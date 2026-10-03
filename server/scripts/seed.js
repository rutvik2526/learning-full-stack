const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
    path: path.join(__dirname, "../.env")
});

const pool = require("../db");

async function seed() {
    const seedPath = path.join(
        __dirname,
        "../../database/seeds/001_initial_data.sql"
    );

    const seedSql = fs.readFileSync(
        seedPath,
        "utf8"
    );

    try {
        await pool.query(seedSql);

        console.log(
            "Seed completed successfully."
        );
    } catch (error) {
        console.error(
            "Seed failed."
        );

        console.error(error.message);

        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

seed();