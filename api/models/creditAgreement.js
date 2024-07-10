const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const creditAgreement = sequelize.define(
    "creditagreement",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        refrences: {
          model: "creditcompanyprofiles",
          key: "id",
        },
      },
      agreement_doc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      max_limit: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        // allowNull:false,
        defaultValue: true,
      },
    },
    {
      hooks: {
        afterCreate: async (creditAgreement, options) => {
          await sequelize.models.credit_agreements_audit.create({
            creditAgreement_id: creditAgreement.id,
            company_id: creditAgreement.company_id,
            agreement_doc: creditAgreement.agreement_doc,
            start_date: creditAgreement.start_date,
            end_date: creditAgreement.end_date,
            max_limit: creditAgreement.max_limit,
            status: creditAgreement.status,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (creditAgreement, options) => {
          const previousValue = creditAgreement._previousDataValues;
          await sequelize.models.credit_agreements_audit.create({
            creditAgreement_id: previousValue.id,
            company_id: previousValue.company_id,
            agreement_doc: previousValue.agreement_doc,
            start_date: previousValue.start_date,
            end_date: previousValue.end_date,
            max_limit: previousValue.max_limit,
            old_status: previousValue.status,
            status: creditAgreement.status,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeDestroy: async (creditAgreement, options) => {
          await sequelize.models.credit_agreements_audit.create({
            creditAgreement_id: creditAgreement.id,
            company_id: creditAgreement.company_id,
            agreement_doc: creditAgreement.agreement_doc,
            start_date: creditAgreement.start_date,
            end_date: creditAgreement.end_date,
            max_limit: creditAgreement.max_limit,
            status: creditAgreement.status,
            operation_type: "D",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  creditAgreement.sync({ alter: false, force: false });
  return creditAgreement;
};
