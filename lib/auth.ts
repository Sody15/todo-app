import bcrypt from 'bcryptjs';

export const hashPassword = async (pw: string) => {
  const hashedPw = await bcrypt.hash(pw, 12);
  return hashedPw;
};

export const comparePassword = async (pw: string, hashedPw: string) => {
  const isValid = await bcrypt.compare(pw, hashedPw);
  return isValid;
};
