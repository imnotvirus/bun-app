import { registerDto } from "../dtos/auth/register.dto";
import AuthRepository from "../repositories/auth.repository";

export async function register(data: registerDto) {
  const user = await AuthRepository.register(data);
  return user;
}


export async function findUserByEmail(email: string) {
  const user = await AuthRepository.findUserByEmail(email);
  return user;
}