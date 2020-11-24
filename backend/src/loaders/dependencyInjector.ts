import { Container } from 'typedi';
import LoggerInstance from './logger';

export default ({ models }) => {
    try {
        models.forEach(({ name, model }) => {
            Container.set(name, model);
            model.createCollection();
        });

        Container.set('logger', LoggerInstance);
    } catch (err) {
        LoggerInstance.error(err, '🔥 Error on dependency injector loader');
        throw err;
    }
};
