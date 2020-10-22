const router = require("express").Router();
const { sql } = require("../database");

router.post("/", async (req, res) => {
  try {
    /* Edit you SQL below */
    let part_id = req.body.part_id;
    let currentTime = new Date();
    let setDayOneToCurrentMonth = currentTime.setDate(1);
    let dateForNextMonth = new Date(setDayOneToCurrentMonth)
    let currMonth = dateForNextMonth.getMonth();
    let nextMonth = dateForNextMonth.setMonth(currMonth + 1);
    //
    const result = await
      sql`SELECT pls.part_id , p.part_name ,pls.preq_quantity ,pl.preq_datetime
      FROM part_requirements pl 
      RIGHT JOIN
      part_requirement_list pls ON pl.preq_id = pls.preq_id AND pls.part_id = ${part_id}
      RIGHT JOIN
      parts p ON pls.part_id = p.part_id
      WHERE pl.preq_datetime >= ${setDayOneToCurrentMonth} AND pl.preq_datetime < ${nextMonth}`;
      
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;




