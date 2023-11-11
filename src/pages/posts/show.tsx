import { IResourceComponentsProps, useOne, useShow } from "@refinedev/core";
import { Show } from "@ferdiunal/refinedev-shadcn-ui";
import { ICategory, IPost } from "../../interfaces";
export const PostShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IPost>();
    const { data } = queryResult;
    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } =
        useOne<ICategory>({
            resource: "categories",
            id: record?.category.id || "",
            queryOptions: {
                enabled: !!record,
            },
        });

    return (
        <Show>
            <Show.Row title="ID" content={record?.id as number} />
            <Show.Row title="Title" content={record?.title} />
            <Show.Row
                title="Category"
                content={
                    categoryIsLoading ? "Loading..." : categoryData?.data.title
                }
            />
            <Show.Row title="Content" content={record?.content} />
        </Show>
    );
};
