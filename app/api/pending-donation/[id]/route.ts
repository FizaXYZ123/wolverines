import {prisma} from "@/app/lib/prisma";
import { NextRequest,NextResponse } from "next/server";
import { AuthError,requireAdmin } from "@/app/lib/auth";

type Routercontext ={
    params:Promise<{
        id:string
    }>
}

// find by id
export async function GET(request:NextRequest,context:Routercontext){
    try {

        await requireAdmin(request);

        const {id} = await context.params;

        if(!id){
            return NextResponse.json({
                message:"id is required to find donation"
            },{
                status:400
            })
        }

        const existing = await prisma.pendingDonation.findUnique({
            where:{
                id
            }
        })

        if(!existing){
            return NextResponse.json({
                message : "donation not found"
            },{status:404})
        }

        return NextResponse.json({
            message:"donation fetched successfully",
            data:existing
        })
        
    } catch (error) {
        if (error instanceof AuthError) {
            return NextResponse.json({ error: error.message }, { status: 401 });
          }
      
          console.error("Error fetching pending donation:", error);
      
          return NextResponse.json(
            { message: "Failed to fetch donation" },
            { status: 500 },
          );
    }
}

// delete
export async function DELETE(request:NextRequest,context:Routercontext) {
    try {

        await requireAdmin(request);

        const {id} = await context.params;

        if(!id){
            return NextResponse.json({
                message:"id is required to delete donation"
            },{
                status:400
            })
        }

        const existing = await prisma.pendingDonation.findUnique({
            where:{
                id
            }
        })

        if(!existing){
            return NextResponse.json({
                message : "donation not found"
            },{status:404})
        }

      const deleted =  await prisma.pendingDonation.delete({
            where:{
                id
            }
        })

        return NextResponse.json({
            message:"donation deleted successfully",
            data:deleted
        })
        
    } catch (error) {
        if (error instanceof AuthError) {
            return NextResponse.json({ error: error.message }, { status: 401 });
          }
      
          console.error("Error deleting pending donation:", error);
      
          return NextResponse.json(
            { message: "Failed to delete donation" },
            { status: 500 },
          );
    }
    
}