const sequelize = require("sequelize");
const model = require("../models").Book;
const { Op } = require("sequelize");
const { NotFoundError } = require("../utils/Errors");

class BookController {
  static async index(req, res, next) {
    try {
      const { search } = req.query;
      const result = await model.findAll({
        where: {
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
      });
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const { id } = req.params;
      const result = await model.findOne({
        where: { id },
        include: ["Author"],
      });

      if (!result) {
        throw new NotFoundError();
      }

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async sumPagesByAuthor(req, res, next) {
    try {
      const result = await model.findAll({
        attributes: [
          "Author.name",
          [sequelize.fn("SUM", sequelize.col("pages")), "Pages"],
        ],
        include: ["Author"],
        group: ["Author.name"],
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async countByAuthor(req, res, next) {
    try {
      const result = await model.findAll({
        attributes: [
          "Author.name",
          [sequelize.fn("COUNT", sequelize.col("Author.id")), "AuthorCount"],
        ],
        include: ["Author"],
        group: ["Author.name"],
        raw: true,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = BookController;
