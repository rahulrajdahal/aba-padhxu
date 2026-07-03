import React from "react";

interface EmptyProps {
  title?: string;
  message: string;
  icon?: React.ReactNode;
}

export default function Empty({ icon, message, title }: EmptyProps) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-2">
        {icon && <div className="text-gray-600">{icon}</div>}
        {title && (
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        )}
        <p className="text-gray-600 text-base">{message}</p>
      </div>
    </div>
  );
}
