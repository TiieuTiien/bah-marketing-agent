import { useEffect, useState } from "react";
import { aiApi } from "@/services/aiAgentApi";
import { AIMessage } from "@/types/aiagent";
import {
  FaEllipsisV,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";

import ChatWindow from "./ChatWindow/ChatWindow";
import ChatInput from "./ChatInput/ChatInput";
import "react-toastify/dist/ReactToastify.css";
import "./AiAgentPanel.css";

// const actions = [
//   {
//     id: "upload-image",
//     label: "Tải lên hình ảnh",
//     icon: <FaImage />,
//     onClick: () => console.log("Upload image"),
//   },
//   {
//     id: "upload-file",
//     label: "Tải lên file",
//     icon: <FaFile />,
//     onClick: () => console.log("Upload file"),
//   },
//   {
//     id: "voice-record",
//     label: "Ghi âm",
//     icon: <FaMicrophone />,
//     onClick: () => console.log("Voice record"),
//   },
// ];

interface AIAgentPanelProps {
  userId: number;
  ideaId?: number;
  className?: string;
  showAIPanel: boolean;
}

const AiAgentPanel: React.FC<AIAgentPanelProps> = ({
  userId,
  ideaId,
  className = "",
  showAIPanel,
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionExists, setSessionExists] = useState(false);

  useEffect(() => {
    const loadInitialLogs = async () => {
      if (!showAIPanel || !userId || !ideaId) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Chỉ thử lấy logs.
        const logs = await aiApi.getSessionLogs(userId, ideaId.toString());
        setMessages(logs);
        // Nếu lấy logs thành công, nghĩa là session đã tồn tại.
        setSessionExists(true);
      } catch (error) {
        // Nếu có bất kỳ lỗi nào (kể cả 404 Not Found),
        // chỉ cần hiển thị một cửa sổ trống và không báo lỗi.
        console.warn("Could not fetch session logs (maybe it's new):", error);
        setMessages([]);
        setSessionExists(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialLogs();
  }, [showAIPanel, ideaId, userId]);

  const handleSendMessage = async (content: string) => {
    if (!ideaId) return;

    setError(null);
    setIsLoading(true);

    // Thêm tin nhắn của người dùng vào giao diện ngay lập tức
    const userMessage: AIMessage = {
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // KIỂM TRA: Nếu session chưa tồn tại, hãy tạo nó TRƯỚC KHI gửi tin nhắn.
      if (!sessionExists) {
        console.log("Session does not exist. Creating one now...");
        await aiApi.createAISession(userId, ideaId);
        // Đánh dấu là session đã tồn tại cho các lần gửi sau.
        setSessionExists(true);
        console.log("Session created successfully.");
      }

      // Gửi tin nhắn (luôn chạy sau khi đã đảm bảo session tồn tại)
      const aiResponses = await aiApi.sendMessageToAI(userId, ideaId, content);
      setMessages((prev) => [...prev, ...aiResponses]);
    } catch (err) {
      setError("Gửi tin nhắn thất bại. Vui lòng thử lại.");
      // Nếu có lỗi, xóa tin nhắn tạm của người dùng khỏi giao diện
      setMessages((prev) => prev.slice(0, prev.length - 1));
      // Nếu lỗi là do tạo session, reset lại để lần sau có thể thử lại
      setSessionExists(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearLogs = async () => {
    if (!ideaId) return;
    toast.warn(
      <div
        style={{
          background: "var(--color-warning-light)",
          color: "var(--color-warning)",
          padding: "16px",
          borderRadius: "8px",
          fontSize: "var(--font-size-sm)",
          border: "1px solid var(--color-warning)",
          boxShadow: "var(--shadow-md)",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 8 }}>
          <strong>Cảnh báo:</strong> Lịch sử chat sẽ bị xóa vĩnh viễn và không
          thể khôi phục!
        </div>
        <button
          style={{
            background: "var(--color-warning)",
            color: "var(--color-text-inverse)",
            borderRadius: "4px",
            border: "none",
            padding: "6px 16px",
            marginRight: "8px",
            cursor: "pointer",
            fontSize: "var(--font-size-sm)",
          }}
          onClick={async () => {
            toast.dismiss();
            setIsLoading(true);
            setError(null);
            try {
              await aiApi.deleteSession(userId, ideaId);
              setMessages([]);
            } catch (err) {
              setError("Không thể xóa lịch sử.");
            } finally {
              setIsLoading(false);
            }
          }}
        >
          Xác nhận xóa
        </button>
        <button
          style={{
            background: "transparent",
            color: "var(--color-warning)",
            border: "none",
            padding: "6px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "var(--font-size-sm)",
          }}
          onClick={() => toast.dismiss()}
        >
          Hủy
        </button>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: "top-center",
      }
    );
  };

  const showWelcome = messages.length === 0;

  return (
    <div className={`aiagent-panel ${className}`}>
      <div className="aiagent-panel__header">
        <div className="aiagent-panel__info">
          <h3>💬 Trò chuyện với AI Marketing Agent</h3>
        </div>

        <div className="aiagent-panel__controls">
          <button
            className="btn-icon btn"
            onClick={() => setMenuOpen(!menuOpen)}
            title="Tùy chọn"
            disabled={isLoading || showWelcome}
          >
            <FaEllipsisV />
          </button>

          {menuOpen && (
            <div className="dropdown-menu">
              <button className="btn" onClick={handleClearLogs}>
                <FaTrash style={{ marginRight: 8 }} /> Xóa lịch sử
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="aiagent-panel__content">
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          showWelcome={showWelcome}
        />

        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          placeholder="Nhập câu hỏi..."
          value={inputValue}
          onChange={setInputValue}
          isLoading={isLoading}
        />
      </div>

      {error && <div className="aiagent-panel__error">{error}</div>}
    </div>
  );
};

export default AiAgentPanel;
