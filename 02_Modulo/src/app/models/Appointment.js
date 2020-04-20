import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
    static init(sequelize) {
        super.init(
            {
                date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    },
                },
                canceled_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    validate: {
                        notNull: false,
                        notEmpty: true,
                    },
                },
                past: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return isBefore(this.date, new Date());
                    },
                },
                cancelable: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return isBefore(new Date(), subHours(this.date, 2));
                    },
                },
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.User, {
            foreignKey: 'provider_id',
            as: 'provider',
        });
    }
}

export default Appointment;
