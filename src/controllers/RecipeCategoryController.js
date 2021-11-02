const Recipe = require("../models").Recipe;
const Category = require("../models").Category;
const { NotFoundError } = require("../utils/Errors");

class RecipeCategoryController {
  static async store(req, res, next) {
    try {
      const [recipe] = await Recipe.findOrCreate({
        where: { name: req.body.name, isPublic: 1 },
        include: Category,
      });

      for (const category of req.body.categories) {
        const [createdCategory] = await Category.findOrCreate({
          where: { name: category.name },
        });
        await recipe.addCategory(createdCategory, {
          through: { percentage: category.percentage },
        });
      }

      const result = await Recipe.findOne({
        where: { name: req.body.name },
        include: Category,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = RecipeCategoryController;
