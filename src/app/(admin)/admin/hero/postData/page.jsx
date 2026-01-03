import HeroPostData from "@/components/admin/hero/postData/heroPost";

export default function page(){
    return(
        <div className='max-h-screen pt-4'>
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <HeroPostData/>
            </div>
        </div>
    )
}
