import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { IRegisterPayload, ISignUpPayload } from './auth.interface';
import { jwtToken } from '../../utils/auth_jwt/jwtToken';
import config from '../../utils/config';
import ApiError from '../../utils/errorHandlers/apiError';
import { StatusCodes } from 'http-status-codes';
import { getAgencyAuthInfo, getUserAuthInfo } from './auth.utils';

const prisma = new PrismaClient();

const signUp = async (payload: ISignUpPayload) => {
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

  return {
    accessToken,
    profileData: { profileImg: result.userInfo.profileImg },
  };
};

const registerAgency = async (payload: IRegisterPayload) => {
  const { email, password, ...data } = payload;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const result = await prisma.$transaction(async prisma => {
    // Insert into auth table

    const auth = await prisma.auth.create({
      data: {
        email,
        password: hashedPassword,
        role: 'agency',
      },
    });

    // Insert into agency table

    const agencyData = await prisma.agency.create({
      data: {
        ...data,
        authId: auth.id,
      },
    });
    return { agencyData, auth };
  });

  const authData = {
    role: result.auth.role,
    authId: result.auth.id,
    userId: result.agencyData.id,
  };

  const accessToken = await jwtToken.createToken(
    authData,
    config.jwt.jwt_access_secret as string,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
    profileData: { profileImg: result.agencyData.profileImg },
  };
};

const login = async (payload: ISignUpPayload) => {
  const { email, password } = payload;
  const isUserExist = await prisma.auth.findFirst({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    );
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    );
  }

  if (isUserExist?.accountStatus !== 'active') {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      `Your account is ${isUserExist.accountStatus}`
    );
  }

  if (isUserExist.role === 'agency') {
    const accessToken = await getAgencyAuthInfo(isUserExist.id);
    return accessToken;
  } else {
    const accessToken = await getUserAuthInfo(isUserExist.id);
    return accessToken;
  }
};

export const authService = { signUp, registerAgency, login };
