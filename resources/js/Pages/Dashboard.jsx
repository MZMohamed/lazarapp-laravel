import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard() {
    const routes = [
        { name: "Drivers", route: "drivers.index" },
        { name: "Locations", route: "locations.index" },
        { name: "Districts", route: "districts.index" },
        { name: "Jobs", route: "jobs.index" },
        { name: "Users", route: "users.index" },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {routes.map((item) => (
                        <div key={item.route} className="my-4 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                {/* eslint-disable-next-line no-undef */}
                                <Link href={route(item.route)}>{item.name}</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
