"use client";

/* Core */
import React from "react"
import { Provider } from "react-redux";

/* Instruments */
import { store } from "@/api/redux/store";

export const Providers = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>;
};
