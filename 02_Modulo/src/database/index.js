import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';
import mongoConfig from '../config/mongo';

const models = [User, File, Appointment];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }

    mongo() {
        this.mongoConnection = mongoose
            .connect(
                `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@cluster0-8h5vf.mongodb.net/${mongoConfig.database}?retryWrites=true&w=majority`,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: true,
                }
            )
            .then(() => console.log('MongoDB connected...'))
            .catch(err => console.log(err));
    }
}

export default new Database();
