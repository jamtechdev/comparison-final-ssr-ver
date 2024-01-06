"use client";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import store from "../redux/store";
import { Provider } from "react-redux";
export default async function Layout({ children, footerData, headerData }) {
    return (<>
        <Provider store={store}>
            <Header headerData={headerData} />
            {children}
            <Footer footerData={footerData} />
        </Provider>
    </>)
}
