const router = require("express").Router();
const { sql } = require("../database");

router.post("/", async (req, res) => {
  try {
    /* Edit you SQL below */
    let part_id = req.body.part_id;
    
    await sql`
    DELETE FROM parts 
    WHERE part_id = ${part_id};
    `;  
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;