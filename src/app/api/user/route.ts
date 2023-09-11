import db from "@/lib/db";
import { registerSchema } from "@/lib/validations/auth";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, password } = registerSchema.parse(body);

    // check if email already exist

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { message: "Email already exist" },
        {
          status: 400,
        }
      );
    }
    const hashedPassword = await hash(password, 12);

    const newUser = await db.user.create({
      data: {
        email: email.toLowerCase(),
        name: name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { user: newUser, message: "Succesfull register" },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", {
      status: 500,
    });
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { name, image, bio } = body;

  const session = await getAuthSession();

  if (!session) {
    return new NextResponse("No user found", { status: 401 });
  }

  try {
    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: name,
        image: image,
        bio: bio
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", {
      status: 500,
    });
  }
}
