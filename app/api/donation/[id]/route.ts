import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireAdmin } from "@/app/lib/auth";

type Routercontext = {
    params :Promise<{
        id : string
    }>
}

//get by id
export async function GET(request: NextRequest,context:Routercontext) {
    try {
        await requireAdmin(request);
        const {id} = await context.params;
     
        if(!id){
         return NextResponse.json({
            message:"id is required to find donation",
         },{status:400})
        }

        const donation = await prisma.donation.findUnique({
            where: {
                id: id
            }
        });

        if (!donation) {
            return NextResponse.json({
                message: "donation not found",
            }, { status: 404 })
        }

        return NextResponse.json({
            message: "donation fetched successfully",
            data: donation
        }, { status: 200 });

    } catch (error) {
        if (error instanceof AuthError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: "internal server error" }, { status: 500 });
    }
}

//delete
export async function DELETE(request: NextRequest,context:Routercontext) {
    try {
        await requireAdmin(request);

        const { id } = await context.params;

        if(!id){
            return NextResponse.json({
                message:"id is required to delete donation",
            },{status:400})
        }

        const existing = await prisma.donation.findUnique({
            where:{
                id:id
            }
        });

        if(!existing){
            return NextResponse.json({
                message:"donation not found",
            },{status:404})
        }

        const deletedDonation = await prisma.donation.delete({
            where: {
                id: id
            }
        });

        return NextResponse.json({
            message: "donation deleted successfully",
            data: deletedDonation
        }, { status: 200 });

    } catch (error) {
        if (error instanceof AuthError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        return NextResponse.json({ message: "internal server error" }, { status: 500 });
    }
}