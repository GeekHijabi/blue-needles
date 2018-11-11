export default (sequelize, DataTypes) => {
    const product = sequelize.define('Product', {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING
      },
      productDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      productMaterial: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      views: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      }
    });
    product.associate = (models) => {
        product.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    };
    return product;
  };
  