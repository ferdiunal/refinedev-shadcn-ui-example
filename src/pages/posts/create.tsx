import { Create } from "@ferdiunal/refinedev-shadcn-ui";
import { PostForm } from "../../components/form";
export const PostCreate: React.FC = () => {
    return (
        <Create>
            <PostForm redirect="edit" />
        </Create>
    );
};
