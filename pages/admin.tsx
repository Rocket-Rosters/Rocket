import PageWrapper from "@/lib/pageWrapper";

export default function AdminPage(){
    return (
        <PageWrapper allowedRoles={["admin"]}>
            <>
                <h1>Admin Page</h1>
                <p>This is for admins</p>
            </>
        </PageWrapper>
    )
}