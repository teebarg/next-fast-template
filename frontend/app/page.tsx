import React from "react";
import HomeComponent from "@/components/home/HomeComponent";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar2";

export default async function Home() {
    return (
        <main className="">
            <Navbar />
            <HomeComponent />
            <Footer />
        </main>
    );
}
