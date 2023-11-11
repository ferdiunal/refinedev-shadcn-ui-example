import { zodResolver } from "@hookform/resolvers/zod";
import { useSelect, RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Form, Shadcn } from "@ferdiunal/refinedev-shadcn-ui";
import * as z from "zod";
import { ICategory } from "../interfaces";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    content: z.string().min(2, {
        message: "Content must be at least 2 characters.",
    }),
    status: z.enum(["published", "draft", "rejected"], {
        errorMap: () => ({
            message: "Status must be published, draft, or rejected.",
        }),
    }),
    category: z.string().or(z.number()),
});

export const PostForm = ({
    redirect = "edit",
}: {
    redirect: RedirectAction;
}) => {
    const { ...form } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            status: "",
            content: "",
            category: {
                id: "",
            },
        },
        refineCoreProps: {
            autoSave: {
                enabled: true,
            },
            redirect,
        },
        warnWhenUnsavedChanges: true,
    });

    const postData = form.refineCore.queryResult?.data?.data;
    const category = useSelect<ICategory>({
        resource: "categories",
        // @ts-ignore
        defaultValue: postData?.category?.id || "",
    });

    return (
        <>
            <Form {...form}>
                <Form.Field {...form} name="title" label="Title">
                    <Shadcn.Input placeholder="Title" />
                </Form.Field>
                <div className="inline-flex flex-row items-center justify-start gap-x-4">
                    <Form.Field {...form} name="category" label="Category">
                        <Form.Combobox {...category} />
                    </Form.Field>
                    <Form.Field {...form} name="status" label="Status">
                        <Form.Select
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
                    </Form.Field>
                </div>
                <Form.Field {...form} name="content" label="Content">
                    <Shadcn.Textarea placeholder="Content" rows={10} />
                </Form.Field>
            </Form>
        </>
    );
};
