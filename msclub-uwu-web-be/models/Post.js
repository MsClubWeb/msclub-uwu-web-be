module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: true // Enable timestamps for createdAt and updatedAt
    });
  
    Post.associate = (models) => {
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author',
        onDelete: 'CASCADE'
      });
    };
  
    return Post;
  };
  