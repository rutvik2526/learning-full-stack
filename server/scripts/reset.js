const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
    path: path.join(__dirname, "../.env")
});

const pool = require("../db");

async function reset() {
    const migrationPath = path.join(
        __dirname,
        "../../database/migrations/001_create_projects_and_tasks.sql"
    );

    const seedPath = path.join(
        __dirname,
        "../../database/seeds/001_initial_data.sql"
    );

    const migrationSql = fs.readFileSync(
        migrationPath,
        "utf8"
    );

    const seedSql = fs.readFileSync(
        seedPath,
        "utf8"
    );

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        console.log(
            "WARNING: Reset will delete existing task and project data."
        );

        await client.query(`
            DROP TABLE IF EXISTS tasks;
        `);

        await client.query(`
            DROP TABLE IF EXISTS projects;
        `);

        await client.query(migrationSql);

        await client.query(seedSql);

        await client.query("COMMIT");

        console.log(
            "Database reset completed successfully."
        );
    } catch (error) {
        await client.query("ROLLBACK");

        console.error(
            "Database reset failed."
        );

        console.error(error.message);

        process.exitCode = 1;
    } finally {
        client.release();
        await pool.end();
    }
}

reset();