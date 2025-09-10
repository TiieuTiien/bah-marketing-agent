import { useEffect, useRef } from 'react';
import { AIMessage } from '@/types/aiagent';
import './ChatWindow.css';

interface ChatWindowProps {
  messages: AIMessage[];
  isLoading: boolean;
  ideaTitle?: string;
  showWelcome?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ 
  messages, 
  isLoading, 
  ideaTitle, 
  showWelcome = false 
}) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="chat-window">
      <div className="chat-window__messages">
        {showWelcome && (
          <div className="chat-window__welcome">
            <div className="welcome-message">
              <h4>👋 Chào mừng bạn!</h4>
              <p>Tôi là AI Marketing Agent, sẵn sàng hỗ trợ bạn phát triển ý tưởng này.</p>
              <div className="quick-suggestions">
                <p><strong>Bạn có thể hỏi tôi về:</strong></p>
                <ul>
                  <li>📊 Phân tích thị trường cho ý tưởng</li>
                  <li>🎯 Xác định đối tượng khách hàng</li>
                  <li>💡 Gợi ý cải tiến và phát triển</li>
                  <li>📈 Chiến lược marketing và quảng bá</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className={`message message--${message.role}`}>
            <div className="message__avatar">
              {message.role === 'user' ? '👤' : '🤖'}
            </div>
            <div
              className="message__content"
              style={{ textAlign: message.role === 'user' ? 'right' : 'left' }}
            >
              <div className="message__text">
                {message.content}
              </div>
              <div className="message__time">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message message--assistant">
            <div className="message__avatar">🤖</div>
            <div className="message__content">
              <div className="message__text">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="typing-text">AI đang suy nghĩ...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;