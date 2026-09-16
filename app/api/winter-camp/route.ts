import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { AuthError,requireAdmin } from "@/app/lib/auth";

//find all

export async function GET(request: NextRequest) {

    try {

        await requireAdmin(request)

        const registrations = await prisma.winterCampRegistration.findMany()

        if(!registrations){
            return NextResponse.json({
                message:"no registrations found",
            }, {status: 404})
        }

        return NextResponse.json({
            message:"registrations fetched successfully",
            data: registrations
        }, {status: 200})
        
    } catch (error) {
        if(error instanceof AuthError){
            return NextResponse.json({
                error:error.message
            }, {status: 401})
        }
        console.log("get all winter camp error", error)
        return NextResponse.json({
            message:"failed to get winter camp",
        }, {status: 500})
        
    }

}
