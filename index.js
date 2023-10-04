const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  res.send("Server is running!");
});

app.post("/user", async (req, res) => {
  try {
    const insert = await prisma.student.create({
      data: req.body,
    });
    res.json({ msg: "success", data: insert });
  } catch (error) {
    res.json({ msg: "failed", error: error });
  }
});

app.get("/user", async (req, res) => {
  try {
    const users = await prisma.student.findMany({});
    res.json({ msg: "success", data: users });
  } catch (err) {
    res.json({ msg: "failed", error: err });
  }
});

app.post("/profile/:id", async (req, res) => {
  try {
    const profile = await prisma.studentInfo.create({
      data: {
        ...req.body,
        student: {
          connect: {
            id: req.params.id,
          },
        },
      },
    });
    res.json({ msg: "success", data: profile });
  } catch (error) {
    res.json({ msg: "failed", error: error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
