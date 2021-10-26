const Recipe = require("../models").Recipe;
const Category = require("../models").Category;
const { NotFoundError } = require("../utils/Errors");

class RecipeCategoryController {
  //   static async index(req, res, next) {
  //     try {
  //       const result = await model.findAll();
  //       return res.status(200).json(result);
  //     } catch (error) {
  //       return next(error);
  //     }
  //   }

  //   static async show(req, res, next) {
  //     try {
  //       const { id } = req.params;
  //       const result = await model.findOne({ where: { id } });

  //       if (!result) throw new NotFoundError();

  //       return res.status(200).json(result);
  //     } catch (error) {
  //       return next(error);
  //     }
  //   }

  static async store(req, res, next) {
    try {
      const [recipe] = await Recipe.findOrCreate({
        where: { name: "teste 123", isPublic: 1 },
        include: Category,
      });

      const [category] = await Category.findOrCreate({
        where: { name: "teste 9999" },
      });

      const [categorySecond] = await Category.findOrCreate({
        where: { name: "teste 0000" },
      });

      await recipe.addCategory(category, { through: { percentage: 40 } });
      await recipe.addCategory(categorySecond, { through: { percentage: 40 } });

      const result = await Recipe.findOne({
        where: { name: "teste 123" },
        include: Category,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  //   static async update(req, res, next) {
  //     try {
  //       const { id } = req.params;
  //       const updated = await model.update(req.body, { where: { id } });

  //       if (updated) {
  //         const result = await model.findOne({ where: { id } });
  //         if (!result) throw new NotFoundError();
  //         return res.status(200).json(result);
  //       }
  //     } catch (error) {
  //       return next(error);
  //     }
  //   }
}

module.exports = RecipeCategoryController;
