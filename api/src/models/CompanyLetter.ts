import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  DataTypes,
} from "sequelize";

// CREATE TABLE CompanyLetter (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     patient_id INT NOT NULL,
//     company_id INT NOT NULL,
//     letter_date DATE NOT NULL,
//     letter_doc_url VARCHAR(255),
//     purpose VARCHAR(255),
//     status VARCHAR(50),
//     FOREIGN KEY (patient_id) REFERENCES Patient(id),
//     FOREIGN KEY (company_id) REFERENCES CreditCompany(id)
// );
import sequelize from "../db/index";
class CompanyLetter extends Model<
  InferAttributes<CompanyLetter>,
  InferCreationAttributes<CompanyLetter>
> {
  declare id: CreationOptional<number>;
  declare patient_id: number;
  declare company_id: number;
  declare letter_date: Date;
  declare letter_doc_url: string;
  declare purpose: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

CompanyLetter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    letter_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    letter_doc_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "CompanyLetter",
    tableName: "company_letters",
  }
);

export default CompanyLetter;
