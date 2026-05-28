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

export async function POST(req) {
  try {
    const body = await req.json();
    const tagConnections = getTagConnections(body.tagNames);

    const article = await prisma.article.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        coverImage: body.coverImage,
        published: true,
        categoryId: body.categoryId || null,
        tags: tagConnections.length
          ? {
              connectOrCreate: tagConnections,
            }
          : undefined,

        authorId: "cmpm51qiw0000hqpk5l2a60wz", // hardcoded untuk sementara

        attachment: body.attachment
          ? {
              create: {
                fileName: body.attachment.fileName,

                fileUrl: body.attachment.fileUrl,
              },
            }
          : undefined,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 },
    );
  }
}
