export default (sequelize, DataTypes) => {
    const products = sequelize.define('Products', {
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
    products.associate = (models) => {
        products.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    };
    return products;
  };
  