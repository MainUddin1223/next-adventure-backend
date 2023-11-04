import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { IRegisterPayload } from './auth.interface';
import { jwtToken } from '../../utils/auth_jwt/jwtToken';
import config from '../../utils/config';

const prisma = new PrismaClient();

const signUp = async (payload: IRegisterPayload) => {
  const { email, password, ...data } = payload;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const result = await prisma.$transaction(async prisma => {
    // Insert into auth table
    const auth = await prisma.auth.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Insert into user table
    const userInfo = await prisma.user.create({
      data: {
        ...data,
        authId: auth.id,
      },
    });
    return { userInfo, auth };
  });
  const accessData = {
    role: result.auth.role,
    authId: result.auth.id,
    userId: result.userInfo.id,
  };
  const accessToken = await jwtToken.createToken(
    accessData,
    config.jwt.jwt_access_secret as string,
    config.jwt.expires_in as string
  );
  return accessToken;
};

export const authService = { signUp };
