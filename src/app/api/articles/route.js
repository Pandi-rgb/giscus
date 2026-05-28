import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const article = await prisma.article.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        coverImage: body.coverImage,
        published: true,

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
