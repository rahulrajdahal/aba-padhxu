"use client";

import { useRef, useState } from "react";

interface AvatarUploadProps {
  initialAvatarUrl?: string;
  onAvatarChange: (avatar: File | null) => void;
}

export default function AvatarUpload({
  initialAvatarUrl,
  onAvatarChange,
}: AvatarUploadProps) {
  const [previewUrl, setPreviewUrl] = useState(initialAvatarUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }

      // Generate local preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Pass the actual file up to the parent component/API handler
      if (onAvatarChange) {
        onAvatarChange(file);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the file input click
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (onAvatarChange) onAvatarChange(null);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm max-w-sm mx-auto">
      <label className="block text-sm font-semibold text-gray-700">
        Profile Picture
      </label>

      {/* Avatar Container */}
      <div
        onClick={triggerFileInput}
        className="group relative h-32 w-32 rounded-full border-4 border-white shadow-md cursor-pointer overflow-hidden bg-gray-100 ring-2 ring-indigo-100 hover:ring-indigo-300 transition-all duration-300"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Avatar preview"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          // Fallback Initials / Placeholder SVG
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-3xl font-bold">
            U
          </div>
        )}

        {/* Hover Overlay Layer */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-xs font-medium">Change Photo</span>
        </div>
      </div>

      {/* Hidden Native Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Helper Action Buttons */}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={triggerFileInput}
          className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
        >
          Choose File
        </button>
        {previewUrl && (
          <button
            type="button"
            onClick={handleRemove}
            className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      <p className="text-xxs text-gray-400 text-center max-w-[200px]">
        JPG or PNG. Recommended size squared (e.g., 400x400px).
      </p>
    </div>
  );
}
