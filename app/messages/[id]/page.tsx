import ChatBubble from "../components/ChatBubble";

export default function ChatPage() {
  const mockMessages = [
    {
      id: 1,
      message: "Hey there! Did you finish the Next.js setup?",
      timestamp: "10:42 AM",
      isSender: false,
      senderName: "Alex",
    },
    {
      id: 2,
      message: "Yeah, just finished it! Tailwind is integrated smoothly.",
      timestamp: "10:43 AM",
      isSender: true,
      senderName: "You",
    },
    {
      id: 3,
      message: "Awesome! Let's deploy it to Vercel next. 🚀",
      timestamp: "10:45 AM",
      isSender: false,
      senderName: "Alex",
    },
  ];

  return (
    <div className="max-w-md mx-auto my-10 p-4 border rounded-xl bg-white shadow-lg h-[500px] flex flex-col justify-between">
      {/* Chat History Container */}
      <div className="flex-1 overflow-y-auto pr-2">
        {mockMessages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.message}
            timestamp={msg.timestamp}
            isSender={msg.isSender}
            senderName={msg.senderName}
          />
        ))}
      </div>

      {/* Input box placeholder */}
      <div className="mt-4 pt-2 border-t flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          Send
        </button>
      </div>
    </div>
  );
}
