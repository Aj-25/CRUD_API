'use strict';

module.exports = (sequelize, DataTypes) => {
    var access_token = sequelize.define('access_token', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        access_token: { type: DataTypes.STRING(511), allowNull: false },
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
        expiresAt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        paranoid: true,
        timestamp: true,
        createdAt: 'created_at',
    });
    return access_token;
};