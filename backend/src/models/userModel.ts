import bcrypt from "bcryptjs"; // Import bcryptjs
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class User extends Model {
  public id!: number;
  public email!: string;
  public fullName!: string;
  public password!: string;
  public token?: string;

  // Method to compare password
  public async comparePassword(enteredPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

// Hash password before saving
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10); // Hash the password before saving
  }
});

export default User;
