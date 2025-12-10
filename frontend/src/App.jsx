import React from "react";
import Home from "./pages/Home";

export default function App(){
  return (
    <div style={{maxWidth:900, margin:"24px auto", padding:16}}>
      <h1>Todo List</h1>
      <Home />
    </div>
  );
}
