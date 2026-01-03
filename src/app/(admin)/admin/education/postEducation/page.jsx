import PostEdu from "@/components/admin/education/postEdu";

export default function page(){
    return(
        <div className='max-h-screen pt-4'>
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <PostEdu/>
            </div>
        </div>
    )
}