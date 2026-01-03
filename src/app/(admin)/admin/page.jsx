import DashboardPage from "@/app/(admin)/admin/dataTable";

export default function Page(){
    return(
        <div className='max-h-screen pt-4'>
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <DashboardPage/>
            </div>
        </div>
    )

}


