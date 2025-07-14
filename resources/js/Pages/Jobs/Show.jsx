import JobSheetTable from "@/Components/app/jobsheet/JobSheetTable";
import MaterialUiLayout from "@/Layouts/MaterialUiLayout";
import { usePage, Head } from "@inertiajs/react";

const Show = () => {
    const { id } = usePage().props;

  return (
    <>
        <Head title='Job' />
        <div>Show Job {id}</div>

        <JobSheetTable jobid={id} />
    </>
  )
}

// eslint-disable-next-line react/no-children-prop
Show.layout = (page) => <MaterialUiLayout children={page} />;

export default Show
