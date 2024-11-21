import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { User } from "./userModel";

export class File extends Model {
  public id!: number;
  public filename!: string;
  public filepath!: string;
  public uploadedBy!: number;
}

File.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filepath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "files",
  }
);

File.belongsTo(User, { foreignKey: "uploadedBy" });
