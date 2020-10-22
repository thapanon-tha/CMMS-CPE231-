const router = require("express").Router();
const { sql } = require("../database");

router.get("/", async (req, res) => {
  try {
    /* Edit you SQL below */
    let currentTime = new Date();
    let setDayOneToCurrentMonth = currentTime.setDate(1);
    let dateForNextMonth = new Date(setDayOneToCurrentMonth)
    let currMonth = dateForNextMonth.getMonth();
    let nextMonth = dateForNextMonth.setMonth(currMonth + 1);
    

    const result = await
      sql`SELECT part_id,part_name,part_quantity FROM parts`;
    const result2 = await
      sql`SELECT pls.part_id , p.part_name ,SUM(pls.preq_quantity) AS SUM
      FROM part_requirements pl 
      RIGHT JOIN
      part_requirement_list pls ON pl.preq_id = pls.preq_id
      RIGHT JOIN
      parts p ON pls.part_id = p.part_id
      WHERE pl.preq_datetime >= ${setDayOneToCurrentMonth} AND pl.preq_datetime < ${nextMonth}
      GROUP BY pls.part_id`;
    res.json({ part: result, part_inmonth: result2 });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;




