"use server";

import prisma from "../db";
import { revalidatePath } from "next/cache";
import { handleError } from "../utils";

//Create
export async function createUser(user: CreateUserParams) {
  try {
    const newUser = await prisma.user.create({
      data: user,
    });
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
}

//Read
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
    });
    if (!user) throw new Error("User Not Found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
}

//Update
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        clerkId,
      },
      data: user,
    });
    if (!updatedUser) throw new Error("User Update failed");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
}

//Delete
export async function deleteUser(clerkId: string) {
  try {
    const userToDelete = await prisma.user.findFirst({
      where: {
        clerkId,
      },
    });

    if (!userToDelete) {
      throw new Error("User not found");
    } else {
      const deleteUser = await prisma.user.delete({
        where: {
          clerkId,
        },
      });
    }

    if (!deleteUser) throw new Error("Delete User failed");
    else revalidatePath("/");
  } catch (error) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
}

//USE Credits
export async function updateCredits(userId: string, creditFee: number) {
  try {
    console.log(userId, creditFee);

    const updateUserCredits = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        creditBalance: {
          increment: creditFee,
        },
      },
    });

    if (!updateUserCredits) throw new Error("User credits update failed");
  } catch (error) {
    handleError(error);
  }
}
