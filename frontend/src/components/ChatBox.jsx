import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const ws = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
    } else {
      console.warn("No user found in localStorage");
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!userId) return;

    ws.current = new WebSocket("ws://localhost:8000/ws/chat/");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const msgText = data.message ?? data.text;
      if (msgText) {
        setMessages((prev) => [
          ...prev,
          { text: msgText, sender: data.sender || "bot" },
        ]);
      }
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => ws.current?.close();
  }, [userId]);

  const sendMessage = (message) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ user_id: userId, message }));
      setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    } else {
      console.warn("WebSocket not connected");
    }
  };

  const loadHistory = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ user_id: userId, load_history: true }));
    }
  };

  return (
    <div className="w-80 sm:w-96 h-96 bg-white shadow-lg border-2 border-black rounded-lg flex flex-col overflow-hidden">
      <div className="bg-coral-red text-white px-4 py-2 flex justify-between items-center">
        <h4 className="text-lg font-semibold">Chat Assistant</h4>
        <button onClick={onClose} className="text-white font-bold">
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {/* {messages.length === 0 && (
          <div className="p-2 rounded-md max-w-xs bg-gray-200 self-start">
            Welcome! Click "Load Conversation" to view your chat history.
          </div>
        )} */}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-100 self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            {(() => {
              const urlRegex = /(\/store\?[^ ]+|\/products\/\d+)/g;
              const parts = msg.text.split(urlRegex);

              return parts.map((part, i) =>
                urlRegex.test(part) ? (
                  <span
                    key={i}
                    onClick={() => {
                      navigate(part);
                      onClose();
                    }}
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      textDecoration: "underline",
                    }}
                  >
                    {part}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              );
            })()}
          </div>
        ))}
      </div>

      <div className="p-2 border-t flex gap-2">
        <button
          onClick={loadHistory}
          className="bg-green-600 text-white px-3 rounded hover:bg-green-700"
        >
          Load Conversation
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const msg = e.target.elements.message.value;
          if (msg.trim()) {
            sendMessage(msg);
            e.target.reset();
          }
        }}
        className="p-2 border-t flex gap-2"
      >
        <input
          name="message"
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-2 py-1 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
