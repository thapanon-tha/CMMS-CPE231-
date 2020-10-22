const router = require("express").Router();
const { sql } = require("../database");

router.get("/", async (req, res) => {
  try {
    /* Edit you SQL below */
    const result = await
      sql`SELECT task_id FROM tasks`;
    const result2 = await
      sql`SELECT part_id,part_name,part_quantity FROM parts`;
    res.json({ task: result, part: result2 });
    //res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  try {
    /* Edit you SQL below */
    let task_id = req.body.task_id;
    let preq_notes = req.body.preq_notes;
    let preq_datetime = req.body.preq_datetime;
    let part_inlist = req.body.part_inlist;
    await sql`INSERT INTO part_requirements (task_id, preq_notes, preq_datetime) VALUES (${task_id},${preq_notes},${preq_datetime} )`;
    const preq_id = await sql`SELECT MAX(preq_id) as preq_id FROM part_requirements `;
    /* loop insert*/
    for (count = 0; count < part_inlist.length; count++) {
      await sql`
   INSERT INTO part_requirement_list (preq_id, preq_quantity , part_id)
   VALUES (${preq_id[0].preq_id},${part_inlist[count].preq_quantity},${part_inlist[count].part_id});
   `
      let quantity = await sql`
      SELECT part_quantity
      FROM parts
      WHERE part_id = ${part_inlist[count].part_id}`;
      let new_quantity = quantity[0].part_quantity - part_inlist[count].preq_quantity;
      console.log(new_quantity);
      
      await sql`
   UPDATE parts
   SET part_quantity = ${new_quantity}
   WHERE part_id = ${part_inlist[count].part_id}`;

    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;