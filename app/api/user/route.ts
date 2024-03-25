import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  // 회원 가입 로직 작성
  const { email, password, confirmPassword, nickname } = await req.json();

  // 빈 값을 받아왔는지 체크
  if (!email || !password || !confirmPassword || !nickname) {
    return NextResponse.json(
      { error: "Bad Request: 빈 필드를 제출했습니다." },
      { status: 400 }
    );
  }
  // 비밀번호와 비밀번호 재확인이 같은 값인지 다시 체크

  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "Bad Request: 비밀번호가 일치하지 않습니다." },
      { status: 400 }
    );
  }
  // 이메일로 이미 등록된 유저인지 확인
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return NextResponse.json({
      status: 409,
      message: "이미 가입된 유저입니다.",
    });
  }

  // 전부 통과 시, 비밀번호 암호화 로직 작성
  const hashedPassword = await bcrypt.hash(password, 10);
  // 기본 프로필 사진 등록
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: nickname,
      createdDate: new Date().toLocaleDateString("ko-KR"),
      image:
        "https://firebasestorage.googleapis.com/v0/b/hang-man-game-c1ba4.appspot.com/o/asset%2Fno-image.png?alt=media&token=37010ce6-007b-4d9d-9418-fc51c0e98f98",
    },
  });

  return NextResponse.json(newUser);
}

export async function PATCH(req: NextRequest) {
  // 프로필 변경 로직 작성
}

export async function DELETE(req: NextRequest) {
  // 회원 탈퇴 로직 작성
}
