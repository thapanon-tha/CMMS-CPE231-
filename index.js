require("dotenv").config({ silent: process.env.NODE_ENV === "production" });
const express = require("express");
const cors = require("cors");
const api = require("./api");

const app = express();
const api_path = express.Router();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

api_path.get("/", (req, res) => {
    res.sendStatus(200);
});

const isLoggedIn = (req, res, next) => {
    if (!req.user) {
        res.redirect('/login')
    }
    next()
}

/* --- แก้ API ในนี้ --- */

// api_path.use("[path]", api.[api]);
api_path.use("/tasks", api.tasks);
api_path.use("/addnewpart", api.addnewpart);
api_path.use("/importpts", api.importpts);
api_path.use("/partinmonth", api.partinmonth);
api_path.use("/edit_quantity_in_store", api.edit_quantity_in_store);
api_path.use("/delete_part", api.delete_part);
api_path.use("/find_detail", api.find_detail);

/* --- อย่าแก้อะไรหลังจากนี้ --- */

api_path.use((req, res) => {
    res.sendStatus(501);
});

app.use("/api", api_path);
app.use(express.static("src"));
app.use((req, res) => {
    res.sendStatus(404);
});
app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
);