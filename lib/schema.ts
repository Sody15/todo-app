import Joi from 'joi';

import { DESC_LENGTH, TITLE_LENGTH, USERNAME_RULES, PASSWORD_RULES } from '@/global';

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
  userName: Joi.string().trim().required().min(USERNAME_RULES.min).max(USERNAME_RULES.max).regex(USERNAME_RULES.regex),
  password: Joi.string().trim().required().min(PASSWORD_RULES.min).max(PASSWORD_RULES.max).regex(PASSWORD_RULES.regex),
});
