import React, { PropsWithChildren } from "react";
import "./Container.scss";

export const Container = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <>
      <div className="container-background" />
      <div className="container">{children}</div>
    </>
  );
};
