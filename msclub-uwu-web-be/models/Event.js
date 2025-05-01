module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        eventTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eventDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        eventDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        eventTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eventLocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eventImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        eventLink: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },{
        timestamps: true,
    });

    return Event;
}