import { PrismaClient } from '@prisma/client';
import { IFilterOption, IPaginationValue } from '../../utils/helpers/interface';

const prisma = new PrismaClient();

const getUsersOrAdmins = async (
  meta: IPaginationValue,
  filterOptions: IFilterOption,
  role: 'admin' | 'user'
) => {
  const { skip, take, orderBy, page } = meta;
  const queryOption: { [key: string]: any } = {};
  if (Object.keys(filterOptions).length) {
    const { search, ...restOptions } = filterOptions;

    if (search) {
      queryOption['OR'] = [
        {
          email: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          agency: {
            some: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        },
      ];
    }
    Object.entries(restOptions).forEach(([field, value]) => {
      queryOption[field] = value;
    });
  }
  const result = await prisma.auth.findMany({
    skip: Number(skip),
    take,
    orderBy,
    where: {
      role,
      ...queryOption,
    },
    select: {
      id: true,
      accountStatus: true,
      email: true,
      user: {
        select: {
          name: true,
          id: true,
          profileImg: true,
        },
      },
    },
  });
  const totalCount = await prisma.auth.count({
    where: { role },
  });
  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
  return {
    result,
    meta: { page: page, size: take, total: totalCount, totalPage },
  };
};

const getAgencies = async (
  meta: IPaginationValue,
  filterOptions: IFilterOption
) => {
  const { skip, take, orderBy, page } = meta;
  const queryOption: { [key: string]: any } = {};
  if (Object.keys(filterOptions).length) {
    const { search, ...restOptions } = filterOptions;

    if (search) {
      queryOption['OR'] = [
        {
          email: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          agency: {
            some: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        },
      ];
    }
    Object.entries(restOptions).forEach(([field, value]) => {
      queryOption[field] = value;
    });
  }
  const result = await prisma.auth.findMany({
    skip: Number(skip),
    take,
    orderBy,
    where: {
      role: 'agency',
      ...queryOption,
    },
    select: {
      id: true,
      accountStatus: true,
      email: true,
      agency: {
        select: {
          id: true,
          name: true,
          contactNo: true,
          profileImg: true,
          rating: true,
        },
      },
    },
  });
  const totalCount = await prisma.auth.count({
    where: { role: 'agency' },
  });
  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
  return {
    result,
    meta: { page: page, size: take, total: totalCount, totalPage },
  };
};

const getAgencyDetailsById = async (id: number) => {
  const result = await prisma.agency.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      contactNo: true,
      featured: true,
      location: true,
      rating: true,
      totalReviews: true,
      totalStar: true,
      profileImg: true,
      auth: {
        select: {
          email: true,
          accountStatus: true,
          role: true,
        },
      },
      plans: {
        select: {
          planName: true,
          id: true,
          deadline: true,
          destination: true,
        },
      },
      Payouts: {
        select: {
          id: true,
          status: true,
          totalAmount: true,
          plan: {
            select: {
              departureTime: true,
            },
          },
        },
      },
    },
  });
  return result;
};

const upcomingSchedules = async (
  meta: IPaginationValue,
  filterOptions: IFilterOption
) => {
  const { skip, take, orderBy, page } = meta;
  const queryOption: { [key: string]: any } = {};
  const date = new Date();
  if (Object.keys(filterOptions).length) {
    const { search, ...restOptions } = filterOptions;

    if (search) {
      queryOption['OR'] = [
        {
          planName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          agency: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }
    Object.entries(restOptions).forEach(([field, value]) => {
      queryOption[field] = value;
    });
  }

  const result = await prisma.plan.findMany({
    skip: Number(skip),
    take,
    orderBy,
    where: {
      ...queryOption,
      departureTime: {
        gt: date,
      },
    },
    select: {
      id: true,
      status: true,
      destination: true,
      images: true,
      deadline: true,
      agency: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  const totalCount = await prisma.plan.count({
    where: {
      deadline: {
        gt: date,
      },
    },
  });
  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
  return {
    result,
    meta: { page: page, size: take, total: totalCount, totalPage },
  };
};

const getAllPlans = async (
  meta: IPaginationValue,
  filterOptions: IFilterOption
) => {
  const { skip, take, orderBy, page } = meta;
  const queryOption: { [key: string]: any } = {};
  if (Object.keys(filterOptions).length) {
    const { search, ...restOptions } = filterOptions;

    if (search) {
      queryOption['OR'] = [
        {
          planName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          destination: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          agency: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }
    Object.entries(restOptions).forEach(([field, value]) => {
      queryOption[field] = value;
    });
  }

  const result = await prisma.plan.findMany({
    skip: Number(skip),
    take,
    orderBy,
    where: {
      ...queryOption,
    },
    select: {
      id: true,
      status: true,
      destination: true,
      deadline: true,
      departureTime: true,
      images: true,
      agency: {
        select: {
          name: true,
          id: true,
          profileImg: true,
        },
      },
    },
  });
  const totalCount = await prisma.plan.count();
  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
  return {
    result,
    meta: { page: page, size: take, total: totalCount, totalPage },
  };
};

const getPlanDetailsById = async (id: number) => {
  const result = await prisma.plan.findUnique({
    where: { id },
    include: {
      bookings: true,
    },
  });
  return result;
};

const getBookings = async (
  meta: IPaginationValue,
  filterOptions: IFilterOption
) => {
  const { skip, take, orderBy, page } = meta;
  const queryOption: { [key: string]: any } = {};
  if (Object.keys(filterOptions).length) {
    const { search, ...restOptions } = filterOptions;

    if (search) {
      queryOption['OR'] = [
        {
          plan: {
            planName: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          agency: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }
    Object.entries(restOptions).forEach(([field, value]) => {
      queryOption[field] = value;
    });
  }

  const result = await prisma.bookings.findMany({
    skip: Number(skip),
    take,
    orderBy,
    where: {
      ...queryOption,
    },
    select: {
      id: true,
      status: true,
      seats: true,
      agency: {
        select: {
          name: true,
          id: true,
          profileImg: true,
        },
      },
      plan: {
        select: {
          planName: true,
          destination: true,
        },
      },
    },
  });
  const totalCount = await prisma.plan.count();
  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
  return {
    result,
    meta: { page: page, size: take, total: totalCount, totalPage },
  };
};

const getBookingById = async (id: number) => {
  const result = await prisma.bookings.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          profileImg: true,
          contactNo: true,
          auth: {
            select: {
              email: true,
            },
          },
        },
      },
      agency: {
        select: {
          name: true,
          contactNo: true,
          profileImg: true,
        },
      },
      plan: {
        select: {
          planName: true,
          deadline: true,
          destination: true,
          price: true,
        },
      },
      payouts: {
        select: {
          status: true,
          totalAmount: true,
        },
      },
    },
  });
  return result;
};

export const adminService = {
  getUsersOrAdmins,
  getAgencies,
  upcomingSchedules,
  getAllPlans,
  getAgencyDetailsById,
  getPlanDetailsById,
  getBookings,
  getBookingById,
};
