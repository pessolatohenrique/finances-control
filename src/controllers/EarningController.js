const model = require("../models").Earning;
const { NotFoundError } = require("../utils/Errors");

class EarningController {
  static async index(req, res, next) {
    try {
      const result = await model.findAll({});
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const { id } = req.params;
      const result = await model.findOne({ where: { id } });

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
}

module.exports = EarningController;
