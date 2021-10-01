const { Router } = require("express");
const AuthorController = require("../controllers/AuthorController");
const middlewares = require("../auth/middlewares");

const router = Router();

router.get("/", (req, res) => res.status(200).send({ message: "initial" }));
router.get(
  "/author",
  [middlewares.bearer, middlewares.rbac],
  AuthorController.index
);

router.get(
  "/author/:id",
  [middlewares.bearer, middlewares.rbac],
  AuthorController.show
);

router.get(
  "/author/:id/restore",
  [middlewares.bearer, middlewares.rbac],
  AuthorController.restore
);

router.get(
  "/author/:id/books",
  [middlewares.bearer, middlewares.rbac],
  AuthorController.getBooks
);

router.post(
  "/author",
  [middlewares.bearer, middlewares.rbac],
  AuthorController.store
);

router.put(
  "/author/:id",
  [middlewares.bearer, middlewares.rbac],
  AuthorController.update
);

router.delete(
  "/author/:id",
  [middlewares.bearer, middlewares.rbac],
  AuthorController.destroy
);

module.exports = router;
