import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireAdmin } from "@/app/lib/auth";

// find all
export async function GET(request: NextRequest) {
    try {
        await requireAdmin(request);

        const donations = await prisma.donation.findMany({
            orderBy:{
                createdAt:"desc"
            }
        });

        if(!donations){
            return NextResponse.json({
                message:"no donations found",
            },{status:404})
        }

        return NextResponse.json({
        message:"donations fetched successfully",
        data:donations
        }, { status: 200 });

    } catch (error) {

        if (error instanceof AuthError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: "internal server error" }, { status: 500 });
    }
}
