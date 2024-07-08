module.exports = (sequelize, DataTypes) => {
  const SocialHistory = sequelize.define(
    "social_history",
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
      //Current smoker, Former smoker, Non-smoker
      tobacco_use: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Current smoker", "Former smoker", "Non-smoker"],
      },
      alcohol_use: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      hooks: {
        afterCreate: async (socialHistory, options) => {
          await sequelize.models.social_history_audit.create({
            socialHistory_id: socialHistory.id,
            patient_id: socialHistory.patient_id,
            tobacco_use: socialHistory.tobacco_use,
            alcohol_use: socialHistory.alcohol_use,
            created_by: socialHistory.created_by,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (socialHistory, options) => {
          const previousSocialHistory = socialHistory._previousDataValues;
          await sequelize.models.social_history_audit.create({
            socialHistory_id: previousSocialHistory.id,
            patient_id: previousSocialHistory.patient_id,
            tobacco_use: previousSocialHistory.tobacco_use,
            alcohol_use: previousSocialHistory.alcohol_use,
            created_by: previousSocialHistory.created_by,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeDestroy: async (socialHistory, options) => {
          await sequelize.models.social_history_audit.create({
            socialHistory_id: socialHistory.id,
            patient_id: socialHistory.patient_id,
            tobacco_use: socialHistory.tobacco_use,
            alcohol_use: socialHistory.alcohol_use,
            created_by: socialHistory.created_by,
            operation_type: "D",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  SocialHistory.sync({ alter: true });
  return SocialHistory;
};
