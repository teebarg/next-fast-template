import ErrorPage from "@/components/core/ErrorPage";
import NoRecords from "@/components/core/NoRecords";

export const metadata = {
    title: "Profile | Starter Template",
    description: "Shopit profile starter template built with Tailwind CSS and Next.js.",
};

export default async function Era() {
    return (
        <>
            <ErrorPage></ErrorPage>
            <NoRecords></NoRecords>
        </>
    );
}
