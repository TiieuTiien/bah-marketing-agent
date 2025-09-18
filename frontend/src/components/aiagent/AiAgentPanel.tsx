import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { aiApi, aiAgentApi } from "@/services/aiAgentApi";
import { AIMessage, AgentLog } from "@/types/aiagent";
import ChatWindow from "./ChatWindow/ChatWindow";
import ChatInput from "./ChatInput/ChatInput";
import "./AiAgentPanel.css";
import { FaFile, FaImage, FaMicrophone } from "react-icons/fa";

const actions = [
  {
    id: "upload-image",
    label: "Tải lên hình ảnh",
    icon: <FaImage />,
    onClick: () => console.log("Upload image"),
  },
  {
    id: "upload-file",
    label: "Tải lên file",
    icon: <FaFile />,
    onClick: () => console.log("Upload file"),
  },
  {
    id: "voice-record",
    label: "Ghi âm",
    icon: <FaMicrophone />,
    onClick: () => console.log("Voice record"),
  },
];

interface AIAgentPanelProps {
  ideaId?: number;
  ideaTitle?: string;
  className?: string;
}

const AiAgentPanel: React.FC<AIAgentPanelProps> = ({
  ideaId,
  ideaTitle,
  className = "",
}) => {
  const [userId] = useState(1);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!ideaId) return;
      try {
        const logs = await aiAgentApi.getAgentLogs(ideaId);
        setAgentLogs(logs);

        const chatMessages: AIMessage[] = [];
        logs.forEach((log) => {
          chatMessages.push({
            role: "user",
            content: log.user_prompt,
            timestamp: log.timestamp,
          });
          chatMessages.push({
            role: "assistant",
            content: log.ai_response,
            timestamp: log.timestamp,
          });
        });
        setMessages(chatMessages);
      } catch (err) {
        setError("Không thể tải lịch sử chat.");
      }
    };
    fetchLogs();
    setSessionId(null);
  }, [ideaId]);

  const handleSendMessage = async (content: string) => {
    setIsLoading(true);
    setError(null);

    const userMessage: AIMessage = {
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      let currentSessionId = sessionId;

      if (!currentSessionId) {
        currentSessionId = await aiApi.createAISession(userId, ideaId);
        setSessionId(currentSessionId);
      }

      const aiMessage = await aiApi.sendMessageToAI(
        userId,
        currentSessionId,
        content,
        ideaId
      );

      await aiAgentApi.saveAgentLog(ideaId!, content, aiMessage.content);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiMessage.content,
          timestamp: new Date().toISOString(),
        },
      ]);
      setAgentLogs((prev) => [
        ...prev,
        {
          log_id: 1,
          idea_id: ideaId!,
          user_prompt: content,
          ai_response: aiMessage.content,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      setError("Gửi tin nhắn thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearLogs = async () => {
    if (!ideaId) return;
    setIsLoading(true);
    try {
      await aiAgentApi.clearAgentLogs(ideaId);
      setAgentLogs([]);
      setMessages([]);
      setSessionId(null);
    } catch (err) {
      setError("Không thể xóa lịch sử.");
    } finally {
      setIsLoading(false);
    }
  };

  const showWelcome = agentLogs.length === 0;

  return (
    <div className={`aiagent-panel ${className}`}>
      <div className="aiagent-panel__header">
        <h3>💬 Trò chuyện với AI Marketing Agent</h3>
        {ideaTitle && (
          <p className="aiagent-panel__context">
            Về ý tưởng: <strong>{ideaTitle}</strong>
          </p>
        )}
        <div className="aiagent-panel__controls">
          <button
            className="btn-secondary"
            onClick={handleClearLogs}
            disabled={isLoading || showWelcome}
          >
            Xóa lịch sử
          </button>
        </div>
      </div>
      <div className="aiagent-panel__content">
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          ideaTitle={ideaTitle}
          showWelcome={showWelcome}
        />

        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={false}
          placeholder="Nhập câu hỏi..."
          ideaTitle="E-commerce Marketing Strategy"
          showQuickActions={true}
          value={inputValue}
          onChange={setInputValue}
        />
        {error && <div className="aiagent-panel__error">{error}</div>}
      </div>
    </div>
  );
};

export default AiAgentPanel;
