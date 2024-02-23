import prisma from "../database/prisma";
import { registerDto } from "../dtos/auth/register.dto";

class AuthRepository {
  async register(data: registerDto) {
    const { password, ...rest } = data;
    return await prisma.user.create({
      data: {
        password: await Bun.password.hash(password),
        ...rest,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
  }
}

export default new AuthRepository();
