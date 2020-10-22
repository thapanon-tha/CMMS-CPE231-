const router = require("express").Router();
const { sql } = require("../database");

router.get("/", async (req, res) => {
  try {
    /* Edit you SQL below */
    const result = await
      sql`SELECT pcat_id,pcat_name FROM part_categories`;
    const result2 = await
      sql`SELECT p.part_id,p.part_name,p.part_quantity,p.part_category,pc.pcat_name FROM parts p,part_categories pc
      WHERE p.part_category=pc.pcat_id`;
    res.json({ pcat: result, part: result2 });
    //res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


router.post("/", async (req, res) => {
  try {
    /* Edit you SQL below */
    let part_quantity = req.body.part_quantity;
    let part_name = req.body.part_name;
    let pcat_id = req.body.pcat_id;
    await sql`INSERT INTO parts (part_quantity, part_name, part_category) 
    VALUES (${part_quantity},${part_name},${pcat_id} )`;  
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;