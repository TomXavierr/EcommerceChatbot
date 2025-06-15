import { useState } from "react";
import ChatBox from "./ChatBox";
import { chatbot } from "../assets/images";
import { useAuth } from "../context/AuthContext";
import LoginPromptDialog from "./LoginPromptDialog";

const ChatWidget = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleToggle = () => {
    if (!user) {
      setShowPrompt(true);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && <ChatBox onClose={() => setIsOpen(false)} />}
      {showPrompt && <LoginPromptDialog onClose={() => setShowPrompt(false)} />}
      <button
        onClick={handleToggle}
        className="bg-coral-red text-white p-4 rounded-full border border-slate-950 shadow-lg hover:bg-orange-400 transition"
        aria-label="Toggle Chat"
      >
        <img src={chatbot} alt="Chatbot" className="w-8 h-8" />
      </button>
    </div>
  );
};

export default ChatWidget;
