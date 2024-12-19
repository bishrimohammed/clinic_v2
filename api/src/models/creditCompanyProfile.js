module.exports = (sequelize, DataTypes) => {
  const creditCompanyProfile = sequelize.define(
    "creditcompanyprofile",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      representative_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      representative_phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      address_id: {
        type: DataTypes.INTEGER,
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
        afterCreate: async (creditCompanyProfile, options) => {
          await sequelize.models.credit_company_profile_audit.create({
            creditCompanyProfile_id: creditCompanyProfile.id,
            name: creditCompanyProfile.name,
            tin: creditCompanyProfile.tin,
            representative_name: creditCompanyProfile.representative_name,
            representative_phone: creditCompanyProfile.representative_phone,
            phone: creditCompanyProfile.phone,
            address_id: creditCompanyProfile.address_id,
            status: creditCompanyProfile.status,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (creditCompanyProfile, options) => {
          const previousValue = creditCompanyProfile._previousDataValues;
          await sequelize.models.credit_company_profile_audit.create({
            creditCompanyProfile_id: previousValue.id,
            name: previousValue.name,
            tin: previousValue.tin,
            representative_name: previousValue.representative_name,
            representative_phone: previousValue.representative_phone,
            phone: previousValue.phone,
            address_id: previousValue.address_id,
            old_status: previousValue.status,
            status: creditCompanyProfile.status,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  creditCompanyProfile.sync({ alter: false, force: false });
  return creditCompanyProfile;
};
