'use strict';

import { ALL, COMPLETE, INCOMPLETE, DESCRIPTION, DATE_ADDED} from '../../utils/todos.constants';
import Joi from 'joi';

const Validators = {

    fetchTasks: {
        query: {
            filter: Joi.valid(ALL, COMPLETE, INCOMPLETE).optional(),
            orderBy: Joi.valid(DESCRIPTION, DATE_ADDED).optional()
        },
        failAction: (request, h, err) => {
            return err;
        }
    },

    createTask: {
        payload: {
            description: Joi.string().trim().required()
        }
    },

    updateTask: {
        params: {
            id: Joi.string().trim().required()
        },
        payload: {
            state: Joi.valid(COMPLETE, INCOMPLETE).when('description', {
                is: Joi.exist(),
                then: Joi.optional(),
                otherwise: Joi.required()
            }),
            description: Joi.string().trim().optional(),
        },
        failAction: (request, h, err) => {
            return err;
        }
    },

    deleteTask: {
        params: {
            id: Joi.string().trim().required()
        },
        failAction: (request, h, err) => {
            return err;
        }
    }
    
}

export default Validators;
