import {NextResponse} from "next/server";
import {connectionDb} from "@/db/config";
import EnsureAdmin from "@/utils/admin/ensureAdmin";
import {JwtTokenData} from "@/utils/tokendata";
import {ApiError} from "@/utils/apiError";
import ContactModel from "@/models/portfolio/contact.model";


export async function PATCH(request) {
    try {
        await connectionDb()
        await EnsureAdmin(request)
        const { searchParams } = new URL(request.url);
        const contactId = searchParams.get("contactId");

        const updates = await request.json()

        const {id: userId} = JwtTokenData(request)
        if (!userId) {
            return NextResponse.json(
                {success: false, error: "userid not found"},
                {status: 401}
            );
        }
        if (!contactId){
            const fallbackError = ApiError.from(request,404, "contactId query parameter is required",["please enter contactId"])
            return NextResponse.json(fallbackError.toJSON(),{status:404})
        }
        delete updates.contactId
        delete updates.userid
        delete updates._id
        const updateContact = await ContactModel.findOneAndUpdate({contactId}, {$set:updates},{ new: true, runValidators: true }).lean()
        if (!updateContact) {
            return NextResponse.json(
                { success: false, error: "Contact data not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Contact data updated", data: updateContact },
            { status: 200 }
        );


    }catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(err.toJSON(), {status: err.statusCode || 500});
        }

        const fallback = ApiError.from(request, 500, err?.message || "Internal server error");
        return NextResponse.json(fallback.toJSON(), {status: 500});
    }

}