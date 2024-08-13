import * as bcrypt from 'bcrypt'

export async function HashPassword(password: string): Promise<string> {

   const hashedPassword = await bcrypt.hashSync(password, 8);
   return hashedPassword;
}

export async function ComparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compareSync(password, hashedPassword);
}