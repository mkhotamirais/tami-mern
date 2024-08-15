import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => (
  <section className="max-w-5xl mx-auto px-3 h-full">{children}</section>
);
