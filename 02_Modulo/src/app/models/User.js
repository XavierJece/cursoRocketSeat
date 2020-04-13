import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    },
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    },
                },
                password_hash: Sequelize.STRING,
                password: {
                    type: Sequelize.VIRTUAL,
                    allowNull: false,
                    unique: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    },
                },
                provider: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );

        this.addHook('beforeSave', async user => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
