import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getTagConnections(tagNames = []) {
  return tagNames.map((name) => ({
    where: {
      slug: createSlug(name),
    },
    create: {
      name,
      slug: createSlug(name),
    },
  }));
}

// untuk hapus artikel
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const article = await prisma.article.findUnique({
      where: { id },

      include: {
        attachment: true,
      },
    });

    if (article?.attachment) {
      await prisma.attachment.delete({
        where: {
          articleId: id,
        },
      });
    }

    await prisma.article.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to delete article",
      },
      {
        status: 500,
      },
    );
  }
}

// untuk update artikel
export async function PUT(req, { params }) {
  try {
    const { id } = await params;

    const body = await req.json();
    const tagConnections = getTagConnections(body.tagNames);

    const article = await prisma.article.update({
      where: {
        id,
      },

      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        coverImage: body.coverImage,
        categoryId: body.categoryId || null,
        tags: {
          set: [],
          ...(tagConnections.length
            ? {
                connectOrCreate: tagConnections,
              }
            : {}),
        },
        attachment: body.attachment
          ? {
              upsert: {
                create: {
                  fileName: body.attachment.fileName,
                  fileUrl: body.attachment.fileUrl,
                },
                update: {
                  fileName: body.attachment.fileName,
                  fileUrl: body.attachment.fileUrl,
                },
              },
            }
          : undefined,
      },
      include: {
        attachment: true,
        tags: true,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to update article",
      },
      {
        status: 500,
      },
    );
  }
}

export const PATCH = PUT;
