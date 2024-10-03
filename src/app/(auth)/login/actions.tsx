"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { signInSchema, SignInValues } from "@/lib/validation";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function SignIn(
  credentials: SignInValues
): Promise<{ error: string }> {
  try {
    const { username, password } = signInSchema.parse(credentials);

    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (!existingUser || !existingUser.passwordHash) {
      return {
        error: "Username or password is incorrect",
      };
    }

    const validPassword = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!validPassword) {
      return {
        error: "Credentials are incorrect",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});

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
