const model = require("../models").Recipe;
const Category = require("../models").Category;
const User = require("../models").User;
const { NotFoundError } = require("../utils/Errors");

class RecipeController {
  static async index(req, res, next) {
    try {
      const result = await model.findAll({
        include: Category,
      });
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const { id } = req.params;
      const result = await model.findOne({ where: { id }, include: Category });

      if (!result) throw new NotFoundError();

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async store(req, res, next) {
    try {
      const result = await model.create(req.body);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await model.update(req.body, { where: { id } });

      if (updated) {
        const result = await model.findOne({ where: { id } });
        if (!result) throw new NotFoundError();
        return res.status(200).json(result);
      }
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const updatedDeleted = await model.destroy({
        where: { id },
      });

      if (updatedDeleted) {
        return res.status(200).json({ message: `${id} was deleted` });
      }

      throw new NotFoundError();
    } catch (error) {
      return next(error);
    }
  }

  static async restore(req, res, next) {
    try {
      const { id } = req.params;

      const restored = await model.restore({ where: { id } });

      if (restored) {
        return res.status(200).json({ message: `${id} was restored` });
      }

      throw new NotFoundError();
    } catch (error) {
      return next(error);
    }
  }

  static async associateUser(req, res, next) {
    try {
      const { id } = req.params;
      const result = await model.findOne({ where: { id }, include: Category });
      if (!result) throw new NotFoundError();

      await User.update(
        {
          recipeId: id,
        },
        { where: { id: await req.user.id } }
      );

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = RecipeController;
