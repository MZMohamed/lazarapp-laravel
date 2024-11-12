import Header from "@/Components/app/Header";
import MaterialUiLayout from "@/Layouts/MaterialUiLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Admin() {
    const user = usePage().props.auth.user;
    return (
        <MaterialUiLayout>
            <Head title="Admin" />

            <Header user={user} />
        </MaterialUiLayout>
    );
}
