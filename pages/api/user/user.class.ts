import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class User {
  email_hash: string;
  name: string;
  alias: string | null;
  secret: string;
  profile_image_url: string | null;

  constructor(
    email_hash: string,
    name: string,
    alias: string | null,
    secret: string,
    profile_image_url: string | null
  ) {
    this.email_hash = email_hash;
    this.name = name;
    this.alias = alias;
    this.secret = secret;
    this.profile_image_url = profile_image_url;
  }

  static fromUserData(userData: any): User {
    return new User(
      userData.email_hash,
      userData.name,
      userData.alias,
      userData.secret,
      userData.profile_image_url
    );
  }
  static async findUserByName(name: string): Promise<User | null> {
    const userData = await prisma.user.findUnique({
      where: {
        name,
      },
    });
    return userData ? User.fromUserData(userData) : null;
  }

  static async saveUser(user: User): Promise<User | null> {
    const userData = await prisma.user.create({
      data: {
        email_hash: user.email_hash,
        name: user.name,
        alias: user.alias,
        secret: user.secret,
        profile_image_url: user.profile_image_url,
      },
    });
    return User.fromUserData(userData);
  }
}
