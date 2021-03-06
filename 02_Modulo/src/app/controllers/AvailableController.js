import {
    startOfDay,
    endOfDay,
    setSeconds,
    setHours,
    setMinutes,
    format,
    isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';

class AvailableController {
    async index(req, res) {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({
                error: 'Ivalid date',
            });
        }

        const providerExist = await User.findOne({
            where: { id: req.params.providerId, provider: true },
        });

        if (!providerExist) {
            return res.status(404).json({
                error: 'Not fount',
            });
        }

        const searchDate = Number(date);

        const appointments = await Appointment.findAll({
            where: {
                provider_id: req.params.providerId,
                canceled_at: null,
                date: {
                    [Op.between]: [
                        startOfDay(searchDate),
                        endOfDay(searchDate),
                    ],
                },
            },
        });

        const schedule = [
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
        ];

        const avaible = schedule.map(time => {
            const [hour, minute] = time.split(':');
            const value = setSeconds(
                setMinutes(setHours(searchDate, hour), minute),
                0
            );

            return {
                time,
                value: format(value, "yyyy-MM-dd'T'HH:mm:ssxx"),
                available:
                    isAfter(value, new Date()) &&
                    !appointments.find(
                        appointment =>
                            format(appointment.date, 'HH:mm') === time
                    ),
            };
        });

        return res.json(avaible);
    }
}

export default new AvailableController();
