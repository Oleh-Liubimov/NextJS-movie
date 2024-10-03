"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { signUpSchema, SignUpValues } from "@/lib/validation";
// import { hash } from "@node-rs/argon2";
import bcrypt from "bcrypt";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function SignUp(
  credentials: SignUpValues
): Promise<{ error: string }> {
  try {
    const { username, email, password } = signUpSchema.parse(credentials);

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = generateIdFromEntropySize(10);

    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (existingUsername) {
      return {
        error: "Username already taken",
      };
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingEmail) {
      return {
        error: "Email already taken",
      };
    }

    await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    const session = await lucia.createSession(userId, {});

    const sessionCookies = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookies.name,
      sessionCookies.value,
      sessionCookies.attributes
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something gone wrong. Please try again",
    };
  }
}
