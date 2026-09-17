import {prisma} from "@/app/lib/prisma"
import { NextRequest,NextResponse } from "next/server";
import { AuthError, requireAdmin } from "@/app/lib/auth";

// get all

export async function GET(request: NextRequest) {
    try {
        await requireAdmin(request);

        const emailContacts = await prisma.emailContact.findMany({
            orderBy : {
                createdAt : "desc"
            }
        })

        if(!emailContacts){
            return NextResponse.json({
                message : "Email contacts not found",
            },{
                status : 404,
            })
        }

        return NextResponse.json({
            message : "Email contacts fetched successfully",
            data : emailContacts
        },{
            status : 200
        })
    } catch (error) {

        if (error instanceof AuthError) {
            return NextResponse.json(
              {
                message: error.message,
              },
              {
                status: error.status,
              },
            );
          }

          console.log("Error in fetching email contacts",error);

          return NextResponse.json(
            {
                message : "Failed to fetch email contacts",
            },
            {
                status : 500,
            }
          )
    }
}