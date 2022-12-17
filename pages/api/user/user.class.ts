import { PrismaClient } from "@prisma/client";
import _ from "lodash";

const prisma = new PrismaClient();

/**
 * User class
 *
 */
export class User {
  id: number | null;
  email_hash: string;
  name: string;
  alias: string | null;
  secret: string;
  profile_image_url: string | null;
  created_at: Date | null | undefined;
  updated_at: Date | null | undefined;

  constructor(
    id: number | null,
    email_hash: string,
    name: string,
    alias: string | null,
    secret: string,
    profile_image_url: string | null,
    created_at: Date | null,
    updated_at: Date | null
  ) {
    this.id = id;
    this.email_hash = email_hash;
    this.name = name;
    this.alias = alias;
    this.secret = secret;
    this.profile_image_url = profile_image_url;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromUserData(userData: any): User {
    return new User(
      userData.id,
      userData.email_hash,
      userData.name,
      userData.alias,
      userData.secret,
      userData.profile_image_url,
      userData.created_at,
      userData.updated_at
    );
  }

  static async findUserByName(name: string): Promise<User | null> {
    const userData = await prisma.user.findUnique({
      where: {
        name,
      },
    });
    return userData ? <User>_.omit(User.fromUserData(userData), ["secret", "email_hash"]) : null;
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
    return <User>_.omit(User.fromUserData(userData), ["secret", "email_hash"]);
  }

  static async updateUser(user: User): Promise<User | null> {
    const userData = await prisma.user.update({
      where: {
        name: user.name,
      },
      data: {
        alias: user.alias,
        email_hash: user.email_hash,
        secret: user.secret,
        profile_image_url: user.profile_image_url,
      },
    });
    return <User>_.omit(User.fromUserData(userData), ["secret", "email_hash"]);
  }

  static async deleteUser(user: User): Promise<User | null> {
    const userData = await prisma.user.delete({
      where: {
        name: user.name,
      },
    });
    return <User>_.omit(User.fromUserData(userData), ["secret", "email_hash"]);
  }
}
