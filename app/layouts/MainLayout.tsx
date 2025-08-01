import { Outlet } from "@rur/navigation";
import { FC } from "react";
import { Header } from "../components/header";

const MainLayout: FC = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default MainLayout;