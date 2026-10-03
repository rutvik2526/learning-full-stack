const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
    path: path.join(__dirname, "../.env")
});

const pool = require("../db");

async function migrate() {
    const migrationPath = path.join(
        __dirname,
        "../../database/migrations/001_create_projects_and_tasks.sql"
    );

    const migrationSql = fs.readFileSync(
        migrationPath,
        "utf8"
    );

    try {
        await pool.query(migrationSql);

        console.log(
            "Migration completed successfully."
        );
    } catch (error) {
        console.error(
            "Migration failed."
        );

        console.error(error.message);

        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

migrate();