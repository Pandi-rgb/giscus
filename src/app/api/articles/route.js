import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";
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

    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Judul dan konten wajib diisi" },
        { status: 400 },
      );
    }

    const slug = body.slug ? createSlug(body.slug) : createSlug(body.title);
    const tagConnections = getTagConnections(body.tagNames);

    // Resolve author safely
    let authorId = body.authorId;

    if (!authorId) {
      try {
        const adminUser = await getAdminUser();
        if (adminUser?.id) {
          authorId = adminUser.id;
        }
      } catch {
        // Continue to fallback
      }

      if (!authorId) {
        const existingUser = await prisma.user.findFirst();
        if (existingUser) {
          authorId = existingUser.id;
        } else {
          const newUser = await prisma.user.create({
            data: {
              email: "admin@posisi21media.id",
              name: "Admin Redaksi",
              role: "ADMIN",
            },
          });
          authorId = newUser.id;
        }
      }
    }

    const article = await prisma.article.create({
      data: {
        title: body.title,
        slug,
        excerpt: body.excerpt || null,
        content: body.content,
        coverImage: body.coverImage || null,
        published: body.published !== undefined ? Boolean(body.published) : true,
        categoryId: body.categoryId || null,
        tags: tagConnections.length
          ? {
              connectOrCreate: tagConnections,
            }
          : undefined,
        authorId,
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
    console.error("Failed to create article:", error);

    return NextResponse.json(
      { error: "Failed to create article: " + error.message },
      { status: 500 },
    );
  }
}
