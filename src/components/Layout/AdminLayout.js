import {Outlet} from "react-router-dom";
import ResponsiveAppBar from "../core/ResponsiveAppBar";

function AdminLayout() {
    return (
        <>
            <ResponsiveAppBar/>
            <Outlet/>
        </>
    )
}

export default AdminLayout;
