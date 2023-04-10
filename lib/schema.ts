import Joi from 'joi';

import { DESC_LENGTH, PASSWORD_LENGTH, TITLE_LENGTH, USERNAME_LENGTH } from '@/global';

export const taskSchema = Joi.object({
  title: Joi.string().trim().min(1).max(TITLE_LENGTH),
  description: Joi.string().trim().min(1).max(DESC_LENGTH),
  tags: Joi.array().items(Joi.string()),
  done: Joi.boolean(),
});

export const taskSchemaReq = Joi.object({
  title: Joi.string().trim().min(1).max(TITLE_LENGTH).required(),
  description: Joi.string().trim().min(1).max(DESC_LENGTH).required(),
  tags: Joi.array().items(Joi.string()).required(),
  done: Joi.boolean().required(),
});

export const userSchema = Joi.object({
  userName: Joi.string().trim().required().min(USERNAME_LENGTH.min).max(USERNAME_LENGTH.max),
  password: Joi.string().trim().required().min(PASSWORD_LENGTH.min).max(PASSWORD_LENGTH.max),
});
