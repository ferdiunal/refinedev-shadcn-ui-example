import { useTable } from "@refinedev/react-table";
import {
    Shadcn,
    List,
    Table,
    TableFilterProps,
} from "@ferdiunal/refinedev-shadcn-ui";

import { Edit, Eye, Trash2 } from "lucide-react";
import { FC } from "react";

export const PostList: FC = () => {
    const table = useTable({
        columns: [],
        enableSorting: true,
        enableFilters: true,
    });

    return (
        <List>
            <Table table={table}>
                <Table.Column
                    accessorKey="id"
                    header={({ table }) => <Table.CheckAll table={table} />}
                    cell={({ row }) => (
                        <Shadcn.Checkbox
                            className="translate-y-[2px]"
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) =>
                                row.toggleSelected(!!value)
                            }
                            aria-label="Select row"
                        />
                    )}
                />
                <Table.Column
                    header={"ID"}
                    accessorKey="id"
                    enableSorting
                    enableHiding
                />
                <Table.Column
                    header={"Title"}
                    accessorKey="title"
                    enableSorting
                    enableHiding
                    filter={(props: TableFilterProps) => (
                        <Table.Filter.Search {...props} title="Search Title" />
                    )}
                />
                <Table.Column
                    header={"Status"}
                    accessorKey="status"
                    enableSorting
                    enableHiding
                    filter={(props: TableFilterProps) => (
                        <Table.Filter.Dropdown
                            {...props}
                            options={[
                                {
                                    label: "Published",
                                    value: "published",
                                },
                                {
                                    label: "Draft",
                                    value: "draft",
                                },
                                {
                                    label: "Rejected",
                                    value: "rejected",
                                },
                            ]}
                        />
                    )}
                />
                <Table.Column
                    header={"CreatedAt"}
                    accessorKey="createdAt"
                    enableSorting
                    enableHiding
                    filter={(props: TableFilterProps) => (
                        <Table.Filter.DateRangePicker {...props} align="end" />
                    )}
                />
                <Table.Column
                    accessorKey={"id"}
                    cell={({ row: { original } }) => (
                        <Table.Actions>
                            <Table.ShowAction
                                title="Detail"
                                row={original}
                                resource="posts"
                                icon={<Eye size={16} />}
                            />
                            <Table.EditAction
                                title="Edit"
                                row={original}
                                resource="posts"
                                icon={<Edit size={16} />}
                            />
                            <Table.DeleteAction
                                title="Delete"
                                row={original}
                                withForceDelete={true}
                                resource="posts"
                                icon={<Trash2 size={16} />}
                            />
                        </Table.Actions>
                    )}
                />
            </Table>
        </List>
    );
};
