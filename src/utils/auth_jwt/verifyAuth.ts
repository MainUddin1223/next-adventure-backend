import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { PrismaClient } from '@prisma/client';
import { jwtToken } from './jwtToken';

const prisma = new PrismaClient();

const verifyAuthWithRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwtToken.verifyToken(
        token,
        config.jwt.jwt_access_secret as string
      );
      let isExist;
      if (!decoded.authId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      if (decoded.role === 'agency') {
        isExist = await prisma.auth.findUnique({
          where: {
            id: decoded.authId,
            accountStatus: 'active',
          },
          select: {
            id: true,
            agency: {
              select: {
                id: true,
              },
            },
          },
        });
      } else {
        isExist = await prisma.auth.findUnique({
          where: {
            id: decoded.authId,
            accountStatus: 'active',
          },
          select: {
            id: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        });
      }

      if (!isExist?.id || !allowedRoles.includes(req.user?.role)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = isExist;
      next();
    } catch (error) {
      next(error);
    }
  };
};

const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwtToken.verifyToken(
      token,
      config.jwt.jwt_access_secret as string
    );
    let isExist;
    if (!decoded.authId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (decoded.role === 'agency') {
      isExist = await prisma.auth.findUnique({
        where: {
          id: decoded.authId,
          accountStatus: 'active',
        },
        select: {
          id: true,
          agency: {
            select: {
              id: true,
            },
          },
        },
      });
    } else {
      isExist = await prisma.auth.findUnique({
        where: {
          id: decoded.authId,
          accountStatus: 'active',
        },
        select: {
          id: true,
          user: {
            select: {
              id: true,
            },
          },
        },
      });
    }
    req.user = isExist;
    next();
  } catch (error) {
    next(error);
  }
};

const verifyAdmin = verifyAuthWithRole(['admin', 'super_admin']);
const verifySuperAdmin = verifyAuthWithRole(['super_admin']);
const verifyUser = verifyAuthWithRole(['user']);
const verifyAgency = verifyAuthWithRole(['agency']);

export { verifyAdmin, verifyUser, verifyAuth, verifySuperAdmin, verifyAgency };
