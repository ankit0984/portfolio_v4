import PostEducation from "@/app/(admin)/components/certification/postData/postCertification";

export default function page(){
    return(
        <div className='max-h-screen pt-4'>
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <PostEducation/>
            </div>
        </div>
    )
}