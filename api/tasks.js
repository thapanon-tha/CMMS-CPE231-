const router = require("express").Router();
const { sql } = require("../database");

router.get("/", async (req, res) => {
  try {
    /* Edit you SQL below */
    const result = await sql`SELECT * FROM tasks`;
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});



router.post("/", async (req, res) => {
  try {
    /* Edit you SQL below */
    const result = await sql`SELECT * FROM tasks`;
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
