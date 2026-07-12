interface ChatBubbleProps {
  message: string;
  timestamp: string;
  isSender: boolean;
  avatarUrl?: string;
  senderName?: string;
}

export default function ChatBubble({
  message,
  timestamp,
  isSender,
  avatarUrl,
  senderName,
}: ChatBubbleProps) {
  return (
    <div
      className={`flex items-end gap-2 my-2 ${isSender ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={senderName || "User avatar"}
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-600 uppercase">
          {senderName ? senderName.charAt(0) : "?"}
        </div>
      )}

      {/* Bubble Container */}
      <div
        className={`flex flex-col max-w-[70%] ${isSender ? "items-end" : "items-start"}`}
      >
        {/* Sender Name (Optional, usually for group chats) */}
        {senderName && !isSender && (
          <span className="text-xs text-gray-500 mb-1 ml-1">{senderName}</span>
        )}

        {/* Content Bubble */}
        <div
          className={`px-4 py-2 rounded-2xl text-sm shadow-sm break-words ${
            isSender
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          }`}
        >
          {message}
        </div>

        {/* Timestamp */}
        <span className="text-[10px] text-gray-400 mt-1 px-1">{timestamp}</span>
      </div>
    </div>
  );
}
