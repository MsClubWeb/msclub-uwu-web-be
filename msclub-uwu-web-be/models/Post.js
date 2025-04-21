module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true 
      },

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
      }
      
    }, {
      timestamps: true // Enable timestamps (createdAt and updatedAt)
    });
  
  
    return Post;
  };
  