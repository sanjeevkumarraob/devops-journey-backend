//user model
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "event",
    {
      eventName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventDetails: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      eventDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      invitees: {
        // List of user objects. example [{"name":"john", "email":"john@example.com"}]
        type: DataTypes.JSONB,
        allowNull: true,
      },
      location: {
        // address object. example {"street_number","address_line_1":"some street","address_line_2":"line 2 address", "postcode":"123456", "state":"ABC", "country":"AUSTRALIA", "country_code":"AU"}
        type: DataTypes.JSONB,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photos: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    },
    { timestamps: true }
  );
  return Event;
};
