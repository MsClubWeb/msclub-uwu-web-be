module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bannerDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bannerImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    authorName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: true // createdAt and updatedAt fields
  });

  return Post;
};
