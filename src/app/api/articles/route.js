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
        published: true,

        author: {
          connect: {
            email: "admin@example.com",
          },
        },
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
