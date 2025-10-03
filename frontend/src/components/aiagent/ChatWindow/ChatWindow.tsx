import { useEffect, useRef } from 'react';
import { AIMessage } from '@/types/aiagent';
import { Idea } from '@/types/idea';
import ReactMarkdown from 'react-markdown';
import './ChatWindow.css';

interface ChatWindowProps {
  messages: AIMessage[];
  isLoading: boolean;
  ideaTitle?: string;
  showWelcome?: boolean;
  idea?: Idea;
  onSendMessage?: (message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
  showWelcome = false,
  idea,
  onSendMessage,
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
                <p><strong>Hành động nhanh:</strong></p>
                <div className="quick-actions">
                  <button
                    className="quick-action-btn"
                    onClick={() => onSendMessage?.(`Cho tôi thêm thông tin về ${idea?.title || 'ý tưởng này'}`)}
                  >
                    Thêm thông tin: {(idea?.title || 'ý tưởng này').length > 30 ? (idea?.title || 'ý tưởng này').substring(0, 30) + '...' : (idea?.title || 'ý tưởng này')}
                  </button>
                  <button
                    className="quick-action-btn"
                    onClick={() => onSendMessage?.(`Tạo đánh giá sách cho: ${idea?.title || 'ý tưởng này'} - ${(idea?.description || '').length > 100 ? (idea?.description || '').substring(0, 100) + '...' : (idea?.description || '')}`)}
                  >
                    Đánh giá sách: {(idea?.title || 'ý tưởng này').length > 15 ? (idea?.title || 'ý tưởng này').substring(0, 15) + '...' : (idea?.title || 'ý tưởng này')} - {(idea?.description || '').length > 30 ? (idea?.description || '').substring(0, 30) + '...' : (idea?.description || '')}
                  </button>
                </div>
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
                <ReactMarkdown>{message.content}</ReactMarkdown>
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
                <span className="typing-text">Agents đang suy nghĩ...</span>
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