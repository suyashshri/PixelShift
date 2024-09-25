"use server";

import prisma from "../db";
import { revalidatePath } from "next/cache";
import { handleError } from "../utils";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";

//Add Image
export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    const author = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!author) {
      throw new Error("User not found");
    }

    const newImage = await prisma.imageSchema.create({
      data: {
        ...image,
        authorId: author.id,
      },
    });

    revalidatePath(path);
    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
}

//UpdateImage
export async function updateImage({ image, userId, path }: UpdateImageParams) {
  try {
    const imageToUpdate = await prisma.imageSchema.findFirst({
      where: {
        id: image.id,
      },
    });

    if (!imageToUpdate || imageToUpdate.authorId.toLocaleString() !== userId) {
      throw new Error("Unauthorized or image not found");
    }

    const updatedImage = await prisma.imageSchema.update({
      where: {
        id: imageToUpdate.id,
      },
      data: {
        ...image,
      },
    });
    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedImage));
  } catch (error) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
}

//DeleteImage
export async function deleteImage(imageId: string) {
  try {
    await prisma.imageSchema.delete({
      where: {
        id: imageId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  } finally {
    redirect("/");
  }
}

//GetImageById
export async function getImageById(imageId: string) {
  try {
    const image = await prisma.imageSchema.findFirst({
      where: {
        id: imageId,
      },
    });

    if (!image) throw new Error("Image no found");

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
}

//GetImages
// export async function getAllImages({
//   limit = 9,
//   page = 1,
//   searchQuery = "",
// }: {
//   limit?: number;
//   page: number;
//   searchQuery?: string;
// }) {
//   try {
//     cloudinary.config({
//       cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//       secure: true,
//     });
//     let expression = "folder=PixelShift";
//     if (searchQuery) {
//       expression += ` AND ${searchQuery}`;
//     }
//     const { resources } = await cloudinary.search
//       .expression(expression)
//       .execute();

//     const resouceIds = resources.map((resource: any) => resource.publicId);

//     let query = {};
//     if (searchQuery) {
//       query = {
//         publicId: {
//           $in: resouceIds,
//         },
//       };
//     }
//     const skipAmount = (Number(page) - 1) * limit;

//     return JSON.parse(JSON.stringify(image));
//   } catch (error) {
//     console.error(error);
//     throw new Error(`Error: ${error}`);
//   }
// }
