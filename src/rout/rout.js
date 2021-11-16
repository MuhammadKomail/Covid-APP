import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {Main, Sub} from ".";


export default function AppRouter() {
    return (
        <Router >
            <div>
                <Routes>
                    <Route index path="/" element={<Main />} />
                    <Route index path="/Sub" element={<Sub />} />
                </Routes>
            </div>
        </Router>
    )
}
