import { Analytics } from "@vercel/analytics/react";

import { GitHubBanner, Refine } from "@refinedev/core";
import routerProvider, {
    DocumentTitleHandler,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import "@ferdiunal/refinedev-shadcn-ui/dist/globals.css";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { ThemedLayoutV2, Providers } from "@ferdiunal/refinedev-shadcn-ui";
import { PostCreate } from "./pages/posts/create";
import { PostEdit } from "./pages/posts/edit";
import { PostList } from "./pages/posts/list";
import { PostShow } from "./pages/posts/show";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <DevtoolsProvider>
            <BrowserRouter>
                <GitHubBanner />
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
                    notificationProvider={Providers.notificationProvider}
                    resources={[
                        {
                            name: "posts",
                            list: "/posts",
                            show: "/posts/show/:id",
                            create: "/posts/create",
                            edit: "/posts/edit/:id",
                            meta: {
                                canDelete: true,
                            },
                        },
                    ]}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                <ThemedLayoutV2
                                    darkModeProvider={
                                        Providers.ViteDarkModeProvider
                                    }
                                    defaultDarkMode="system"
                                    storageKey="darkMode"
                                    Title={() => (
                                        <div className="inline-flex items-center gap-x-4">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18V6Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <span className="text-lg font-bold">
                                                refine
                                            </span>
                                        </div>
                                    )}
                                >
                                    <Outlet />
                                    <Analytics />
                                </ThemedLayoutV2>
                            }
                        >
                            <Route index element={<NavigateToResource />} />

                            <Route path="/posts">
                                <Route index element={<PostList />} />
                                <Route path="create" element={<PostCreate />} />
                                <Route path="edit/:id" element={<PostEdit />} />
                                <Route path="show/:id" element={<PostShow />} />
                            </Route>
                        </Route>
                    </Routes>

                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
                <DevtoolsPanel />
            </BrowserRouter>
        </DevtoolsProvider>
    );
};

export default App;
