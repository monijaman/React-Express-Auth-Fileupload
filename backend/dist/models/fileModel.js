"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const userModel_1 = require("./userModel");
class File extends sequelize_1.Model {
}
exports.File = File;
File.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    filename: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    filepath: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "files",
});
File.belongsTo(userModel_1.User, { foreignKey: "uploadedBy" });
