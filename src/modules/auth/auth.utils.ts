import { PrismaClient } from '@prisma/client';
import { jwtToken } from '../../utils/auth_jwt/jwtToken';
import config from '../../utils/config';
import { ISignUpPayload } from './auth.interface';

const prisma = new PrismaClient();

export const getUserAuthInfo = async (id: number) => {
  const result = await prisma.user.findFirst({
    where: {
      authId: id,
    },
    select: {
      id: true,
      profileImg: true,
      auth: {
        select: {
          id: true,
          role: true,
        },
      },
    },
  });
  const authData = {
    userId: result?.id,
    authId: result?.auth.id,
    role: result?.auth?.role,
  };

  const accessToken = await jwtToken.createToken(
    authData,
    config.jwt.jwt_access_secret as string,
    config.jwt.expires_in as string
  );
  return { accessToken, profileData: { profileImg: result?.profileImg } };
};

export const getAgencyAuthInfo = async (id: number) => {
  const result = await prisma.agency.findFirst({
    where: {
      authId: id,
    },
    select: {
      id: true,
      profileImg: true,
      auth: {
        select: {
          id: true,
          role: true,
        },
      },
    },
  });
  const authData = {
    userId: result?.id,
    authId: result?.auth.id,
    role: result?.auth?.role,
  };

  const accessToken = await jwtToken.createToken(
    authData,
    config.jwt.jwt_access_secret as string,
    config.jwt.expires_in as string
  );
  return { accessToken, profileData: { profileImg: result?.profileImg } };
};

export const updateUserAdminProfile = async (
  id: number,
  data: Partial<ISignUpPayload>
) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const updateAgencyProfile = async (
  id: number,
  data: Partial<ISignUpPayload>
) => {
  const result = await prisma.agency.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
