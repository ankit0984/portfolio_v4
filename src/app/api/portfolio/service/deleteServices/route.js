import {NextResponse} from "next/server";
import {connectionDb} from "@/db/config";
import EnsureAdmin from "@/utils/admin/ensureAdmin";
import {ApiError} from "@/utils/apiError";
import ServiceSchema from "@/models/portfolio/service.model";

export async function DELETE(request){
    try {
        await connectionDb()
        await EnsureAdmin(request)
        const {searchParams} = new URL(request.url);
        const userid = searchParams.get('userid');
        const reqBody= await request.json()
        const {serviceId, title} = reqBody
        const deleteService = await ServiceSchema.findOneAndDelete({
            userid,
            $or:[
                {title},
                {serviceId},
            ]
        })
        return NextResponse.json({status:true, message:"successfully deleted service", data:deleteService}, {status:200})

    }catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(err.toJSON(), {status: err.statusCode || 500});
        }
        const fallback = ApiError.from(request, 500, err?.message || "Internal server error");
        return NextResponse.json(fallback.toJSON(), {status: 500});
    }
}
