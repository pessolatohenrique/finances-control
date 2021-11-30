const bcrypt = require("bcrypt");
const model = require("../models").User;
const Recipe = require("../models").Recipe;
const tokens = require("../auth/tokens");
const { ForgotPasswordEmail } = require("../utils/Email");
const { NotFoundError, InvalidPasswordKey } = require("../utils/Errors");

const ROUNDS_BCRYPT = 12;

/**
 * Represents Controller to User Requests
 */
class UserController {
  /**
   * creates token and refresh token
   * @param {object} req request from express
   * @param {object} res response from express
   * @return {object} response with access token and refresh token
   */
  static async login(req, res, next) {
    try {
      const { user } = req;
      const token = tokens.access.create(user.id);
      const refreshToken = await tokens.refresh.create(user.id);
      res.set({ Authorization: token });
      return res.status(200).json({ accessToken: token, refreshToken });
    } catch (error) {
      return next(error);
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const user = await model.findOne({
        where: { email },
      });

      if (!user) {
        throw new NotFoundError();
      }

      const token = await tokens.forgotPassword.create(user.id);

      const emailObj = new ForgotPasswordEmail(email, token);
      emailObj.send();

      return res.status(200).json({
        message: "Verifique o seu e-mail para redefinir a senha!",
        token,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { token } = req.params;
      const { password } = req.body;
      const id = await tokens.forgotPassword.search(token);

      if (!id) {
        throw new InvalidPasswordKey();
      }

      const user = await model.findOne({ where: { id } });
      const passwordHash = await bcrypt.hash(password, ROUNDS_BCRYPT);

      await user.update(
        { password: passwordHash },
        {
          where: { id },
        }
      );

      return res.status(200).json({ message: "Senha resetada com sucesso!" });
    } catch (error) {
      return next(error);
    }
  }

  static async index(req, res, next) {
    try {
      const result = await model.findAll();
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
        include: Recipe,
      });

      if (!result) {
        throw new NotFoundError();
      }

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, ROUNDS_BCRYPT);
      }

      const { id } = req.params;
      const updated = await model.update(req.body, {
        where: { id },
      });

      if (updated.length > 0) {
        const result = await model.findOne({ where: { id } });
        return res.status(200).json(result);
      }
    } catch (error) {
      return next(error);
    }
  }

  static async store(req, res, next) {
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, ROUNDS_BCRYPT);
      }

      const result = await model.create(req.body);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = UserController;
