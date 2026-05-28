import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
export async function PATCH(req, { params }) {
  try {
    const { id } = await params;

    const body = await req.json();

    const article = await prisma.article.update({
      where: {
        id,
      },

      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
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