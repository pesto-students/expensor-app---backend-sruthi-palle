const { register, login } = require("../controllers/auth");
const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expense");
const {
  addIncome,
  deleteIncome,
  getIncomes,
} = require("../controllers/income");
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });

const router = require("express").Router();
router
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncomes)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", addExpense)
  .get("/get-expenses", getExpense)
  .delete("/delete-expense/:id", deleteExpense)
  .post("/register", register)
  .post("/login", login);

module.exports = router;
