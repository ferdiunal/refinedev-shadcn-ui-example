import { IResourceComponentsProps } from "@refinedev/core";
import { Edit } from "@ferdiunal/refinedev-shadcn-ui";
import { PostForm } from "../../components/form";
export const PostEdit: React.FC<IResourceComponentsProps> = () => {
    return (
        <Edit>
            <PostForm redirect="show" />
        </Edit>
    );
};
