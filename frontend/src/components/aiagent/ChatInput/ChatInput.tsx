import { useEffect, useRef, useState } from 'react';
import './ChatInput.css';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
  placeholder?: string;
  ideaTitle?: string;
  showQuickActions?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

// Simple inline SVG icons
const IconPlus = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSend = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M2 21L23 12 2 3v7l15 2-15 2z" fill="currentColor" />
  </svg>
);

const IconChart = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 3v18h18M9 9l4 4 4-8" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconRocket = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4.5 16.5c-1.5 1.5-2 5-2 5s3.5-.5 5-2c1.5-1.5 1.5-1.5 1.5-1.5L12 15l3 3 6-6-3-3-6 6-2.5 2.5z" fill="currentColor" />
  </svg>
);

const IconList = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Marketing actions for quick prompts
const marketingActions = [
  { 
    key: 'analyze', 
    icon: <IconChart />, 
    label: 'Phân tích ý tưởng', 
    prompt: (title: string) => `Phân tích ý tưởng "${title}" một cách chi tiết, bao gồm điểm mạnh, điểm yếu, cơ hội và thách thức.` 
  },
  { 
    key: 'strategy', 
    icon: <IconRocket />, 
    label: 'Chiến lược Marketing', 
    prompt: (title: string) => `Đề xuất chiến lược marketing toàn diện cho "${title}". Bao gồm kênh truyền thông, ngân sách và timeline.` 
  },
  { 
    key: 'roadmap', 
    icon: <IconList />, 
    label: 'Lộ trình thực hiện', 
    prompt: (title: string) => `Tạo lộ trình thực hiện chi tiết cho "${title}". Chia thành các giai đoạn với mốc thời gian cụ thể.` 
  },
];

export default function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder = "Nhập câu hỏi...",
  ideaTitle = "dự án của bạn",
  showQuickActions = true,
  value,
  onChange,
  isLoading = false
}: ChatInputProps & { isLoading?: boolean }) {
  // Internal value supports both controlled and uncontrolled use
  const [internalValue, setInternalValue] = useState<string>(value ?? "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof value === "string" && value !== internalValue) {
      setInternalValue(value);
    }
  }, [value, internalValue]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInternalValue(value);
    onChange?.(value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  const submit = () => {
    const trimmed = internalValue.trim();
    if (trimmed && !disabled && !isLoading) {
      onSendMessage(trimmed);
      setInternalValue('');
      onChange?.('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleQuickAction = (actionKey: string) => {
    const action = marketingActions.find(a => a.key === actionKey);
    if (action) {
      const prompt = action.prompt(ideaTitle);
      onSendMessage(prompt);
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input-container">
        {/* Left action (+) */}
        {showQuickActions && (
          <div className="chat-input-left" ref={dropdownRef}>
            <button
              type="button"
              aria-label="More utility"
              onClick={toggleDropdown}
              disabled={disabled || isLoading}
              className={`chat-input-action-btn ${isDropdownOpen ? 'active' : ''}`}
            >
              <IconPlus />
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="chat-input-dropdown">
                {marketingActions.map((action) => (
                  <button
                    key={action.key}
                    type="button"
                    onClick={() => handleQuickAction(action.key)}
                    className="dropdown-item"
                    disabled={isLoading}
                  >
                    <span className="dropdown-item-icon">{action.icon}</span>
                    <span className="dropdown-item-label">{action.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={internalValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !isLoading) {
              e.preventDefault();
              submit();
            }
          }}
          className="chat-input-field"
          placeholder={placeholder}
          disabled={disabled || isLoading}
          aria-label={placeholder}
          rows={1}
          maxLength={1000}
        />
        {/* Send button */}
        <button
          type="submit"
          title="Send"
          onClick={submit}
          disabled={disabled || !internalValue.trim() || isLoading}
          className="chat-input-send-btn"
        >
          <IconSend />
        </button>
      </div>
    </div>
  );
}