import React from "react";
import SettingsSidebar from "./components/SettingsSidebar/SettingsSidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex relative gap-4 px-2">
      <SettingsSidebar />
      <section className="flex-1 w-full px-8 mt-4 bg-white py-4 rounded-lg">
        {children}
      </section>
    </div>
  );
}
