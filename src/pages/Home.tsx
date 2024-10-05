import React from "react";
import { UIStore } from "../Store";

function Home() {
  const uiStore = UIStore.useState();
  return (
    <>
      <div>Home</div>
      <div>{uiStore.message}</div>
    </>
  );
}

export default Home;
