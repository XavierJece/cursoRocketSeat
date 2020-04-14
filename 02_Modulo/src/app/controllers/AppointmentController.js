import * as Yup from 'yup';
import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentController {
    async store(req, res) {
        console.log(req.body);
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation falis :(' });
        }

        const { provider_id, date } = req.body;
        /**
         * Check if provider_id is a provider
         */

        const isProvider = await User.findOne({
            where: {
                id: provider_id,
                provider: true,
            },
        });

        const appoitment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date,
        });

        if (!isProvider) {
            return res.status(401).json({
                error: 'You can only create appointments with providers',
            });
        }

        return res.json({ appoitment });
    }
}

export default new AppointmentController();
