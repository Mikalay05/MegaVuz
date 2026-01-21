const jwt = require("jsonwebtoken");
const { User } = require("../models/entities");
const ApiError = require("../error/ApiError");

const EXPIRES_IN_REFRESH = "30d";
const EXPIRES_IN_ACCESS = "30m";

class TokenService {
  generatePayloadForUser(userData) {
    return {
      id: userData.id,
      login: userData.login,
      roleId: userData.roleId,
    };
  }

  generateTokens = async (userData) => {
    try {
      const payload = this.generatePayloadForUser(userData);
      const accessToken = this.generateAccess(payload);
      const refreshToken = this.generateRefreshToken(payload);

      await this.saveTokenForUser({ userId: userData.id, token: refreshToken });

      return { accessToken, refreshToken };
    } catch (err) {
      throw err;
    }
  };

  generateAccess(payload) {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
      expiresIn: EXPIRES_IN_ACCESS,
    });
  }

  generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
      expiresIn: EXPIRES_IN_REFRESH,
    });
  }

  saveTokenForUser = async ({ userId, token }) => {
    try {
      return await User.update({ token: token }, { where: { id: userId } });
    } catch (err) {
      throw err;
    }
  };

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
    } catch (err) {
      return null;
    }
  }

  async validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
      await this.validateCurrentTokenForUser({ userId: userData.id, token });

      return userData;
    } catch (err) {
      console.error("Refresh token validation failed:", err.message);
      return null;
    }
  }

  validateCurrentTokenForUser = async ({ userId, token }) => {
    try {
      if (!token) {
        throw ApiError.Unauthorized("Token required");
      }

      const user = await User.findOne({ where: { id: userId } });

      if (!user || user.token !== token) {
        throw ApiError.Unauthorized("Invalid or expired session");
      }

      return user;
    } catch (err) {
      throw err;
    }
  };

  async removeToken(userId) {
    return await User.update({ token: null }, { where: { id: userId } });
  }
}

module.exports = new TokenService();
