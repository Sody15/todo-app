export const TAGS = ['work', 'study', 'entertainment', 'family'];

export const MAX_TASKS = 30;

export const USERNAME_RULES = {
  min: 8,
  max: 20,
  regex: new RegExp(/^[a-zA-Z0-9_]{8,}$/),
  message:
    'Your username must be at least 8 characters long and can only contain alphanumeric characters as well as underscores.',
};

export const PASSWORD_RULES = {
  min: 8,
  max: 40,
  regex: new RegExp(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={[}\];:'",<.>/?\\|~-]{8,}$/),
  message: 'Your password must be at least 8 characters long and include at least 1 uppercase letter and 1 number.',
};

export const TITLE_LENGTH = 100;
export const DESC_LENGTH = 500;
