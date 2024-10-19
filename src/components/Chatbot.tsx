import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";

type Message =
  | string
  | { type: "link"; href: string; text: string }
  | JSX.Element;

const Chatbot: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    "AgentAI is here to assist you in finding RFPs that suit your interests and answering any questions you have about the application process. It utilizes OpenAI's technology in combination with a custom-built database to provide you with the most relevant information.",
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);

  const chatbotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    if (input.trim() !== "") {
      if (introVisible) {
        setIntroVisible(false);
        setMessages([
          <span>
            <strong>You:</strong> {input}
          </span>,
          "AgentAI is thinking...",
        ]);
      } else {
        setMessages([
          ...messages,
          <span>
            <strong>You:</strong> {input}
          </span>,
          "AgentAI is thinking...",
        ]);
      }
      setInput("");

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          <span>
            <strong>AgentAI:</strong> Here are 3 updated RFP applications for
            you to review:
          </span>,
          {
            type: "link",
            href: "https://procurement.opengov.com/portal/middlesexcountynj/projects/116497",
            text: "Middlesex County Project",
          },
          {
            type: "link",
            href: "https://www.arizonabids.net/government-agencies/maricopa/phoenix-union-high-school-district-12050/13476903-student-mentoring-services-rfp.html",
            text: "Phoenix Union High School District",
          },
          {
            type: "link",
            href: "https://www.demandstar.com/app/limited/bids/474655/details",
            text: "DemandStar Bid Details",
          },
        ]);
      }, 2500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setHasClicked(true);
  };

  return (
    <>
      <button
        onClick={toggleChatbot}
        className={`fixed bottom-4 right-4 bg-mylightblue text-myoffwhite p-4 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 ${
          !hasClicked ? "animate-bounce" : ""
        } ${isOpen ? "transform rotate-45" : ""}`}
      >
        <MessageCircle size={24} />
      </button>

      {isOpen && (
        <div
          ref={chatbotRef}
          className="fixed bottom-20 right-4 bg-myblack p-4 rounded-lg w-96 h-[32rem] shadow-lg flex flex-col transition-opacity duration-300"
          style={{ opacity: isOpen ? 1 : 0 }}
        >
          <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-2">
            <h2 className="font-bold text-xl text-myoffwhite font-['Outfit']">
              AgentAI 👋
            </h2>
            <button onClick={toggleChatbot} className="text-myoffwhite">
              <X size={24} />
            </button>
          </div>
          <div className="bg-gray-800 p-2 rounded-lg mb-2 flex-grow overflow-auto">
            {messages.map((message, index) => {
              if (typeof message === "string") {
                return (
                  <div key={index} className="mb-1 text-myoffwhite">
                    {message}
                  </div>
                );
              } else if ((message as { type: "link" }).type === "link") {
                const linkMessage = message as {
                  type: "link";
                  href: string;
                  text: string;
                };
                return (
                  <div key={index} className="mb-1 text-myoffwhite">
                    <a
                      href={linkMessage.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-mylightblue underline"
                    >
                      {linkMessage.text}
                    </a>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="mb-1 text-myoffwhite">
                    {message as React.ReactNode}
                  </div>
                );
              }
            })}
          </div>
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-grow p-2 rounded-l-lg border border-gray-600 bg-gray-700 text-myoffwhite focus:outline-none focus:ring-2 focus:ring-mylightblue font-['Outfit']"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="bg-mylightblue text-myoffwhite p-2 rounded-r-lg font-bold hover:bg-mydarkblue transition-colors font-['Outfit']"
            >
              Send
            </button>
          </div>
          <p className="text-myoffwhite text-sm mt-2 text-center font-['Outfit']">
            Powered by OpenAI
          </p>
        </div>
      )}
    </>
  );
};

export default Chatbot;
