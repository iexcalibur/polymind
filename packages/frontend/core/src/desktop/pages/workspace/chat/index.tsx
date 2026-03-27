import { Header } from '@affine/core/components/pure/header';
import {
  ViewBody,
  ViewHeader,
  ViewIcon,
  ViewTitle,
} from '@affine/core/modules/workbench';
import { WorkspaceChatService } from '@affine/core/modules/workspace-chat';
import { useLiveData, useService } from '@toeverything/infra';
import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import * as styles from './index.css';

export const Component = () => {
  const chatService = useService(WorkspaceChatService);
  const messages = useLiveData(chatService.messages$());

  const [input, setInput] = useState('');
  const [streamingContent, setStreamingContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API-key setup state
  const [hasKey, setHasKey] = useState(() => chatService.hasApiKey());
  const [apiKeyInput, setApiKeyInput] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streamingContent]);

  const handleSend = useCallback(() => {
    const msg = input.trim();
    if (!msg || isLoading) return;

    setInput('');
    setError(null);
    setIsLoading(true);
    setStreamingContent('');

    chatService
      .sendMessage(msg, chunk =>
        setStreamingContent(prev => (prev ?? '') + chunk)
      )
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
        setStreamingContent(null);
      });
  }, [input, isLoading, chatService]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleSaveKey = useCallback(() => {
    const key = apiKeyInput.trim();
    if (!key) return;
    chatService.setApiKey(key);
    setHasKey(true);
    setApiKeyInput('');
  }, [apiKeyInput, chatService]);

  const handleResetKey = useCallback(() => {
    chatService.removeApiKey();
    setHasKey(false);
  }, [chatService]);

  // ── API key setup screen ──────────────────────────────────────────────

  if (!hasKey) {
    return (
      <>
        <ViewTitle title="Workspace Chat" />
        <ViewIcon icon="ai" />
        <ViewHeader>
          <Header
            left={
              <span style={{ fontWeight: 700, fontSize: 15 }}>
                Workspace Chat
              </span>
            }
          />
        </ViewHeader>
        <ViewBody>
          <div className={styles.chatRoot}>
            <div className={styles.apiKeySetup}>
              <div className={styles.apiKeyTitle}>Connect Claude</div>
              <p className={styles.apiKeyDesc}>
                Enter your Anthropic API key to enable the Workspace AI Chat.
                Your key is stored locally and never synced.
              </p>
              <input
                className={styles.apiKeyInput}
                type="password"
                placeholder="sk-ant-api03-..."
                value={apiKeyInput}
                onChange={e => setApiKeyInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSaveKey()}
                autoFocus
              />
              <button
                className={styles.apiKeySaveButton}
                onClick={handleSaveKey}
                disabled={!apiKeyInput.trim()}
              >
                Save Key
              </button>
              <a
                className={styles.apiKeyLink}
                href="https://console.anthropic.com"
                target="_blank"
                rel="noreferrer"
              >
                Get an API key →
              </a>
            </div>
          </div>
        </ViewBody>
      </>
    );
  }

  // ── Main chat UI ──────────────────────────────────────────────────────

  return (
    <>
      <ViewTitle title="Workspace Chat" />
      <ViewIcon icon="ai" />
      <ViewHeader>
        <Header
          left={
            <span style={{ fontWeight: 700, fontSize: 15 }}>
              Workspace Chat
            </span>
          }
        />
      </ViewHeader>
      <ViewBody>
        <div className={styles.chatRoot}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <span className={styles.chatHeaderTitle}>
              Chat across all Spaces
            </span>
            <div className={styles.chatHeaderActions}>
              <button
                className={styles.chatActionButton}
                onClick={() => chatService.clearHistory()}
                title="Clear chat history"
                disabled={isLoading}
              >
                Clear
              </button>
              <button
                className={styles.chatActionButton}
                onClick={handleResetKey}
                title="Change API key"
              >
                Key
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className={styles.chatMessages} ref={scrollRef}>
            {messages.length === 0 && streamingContent === null && (
              <div className={styles.chatEmpty}>
                <div className={styles.chatEmptyTitle}>
                  Workspace AI Assistant
                </div>
                <p className={styles.chatEmptyDesc}>
                  I know about all your Spaces, their documents, and memories.
                  Ask me anything across your entire workspace — I&apos;ll
                  identify the relevant Spaces and synthesize answers.
                </p>
              </div>
            )}

            {messages.map(msg => (
              <div
                key={msg.id}
                className={styles.chatMessage}
                data-role={msg.role}
              >
                <div className={styles.chatMessageRole}>
                  {msg.role === 'user' ? 'You' : 'Claude'}
                </div>
                <div className={styles.chatMessageContent}>{msg.content}</div>
              </div>
            ))}

            {/* Streaming response */}
            {streamingContent !== null && (
              <div className={styles.chatMessage} data-role="assistant">
                <div className={styles.chatMessageRole}>Claude</div>
                <div className={styles.chatMessageContent}>
                  {streamingContent || (
                    <span className={styles.typingDots}>
                      <span />
                      <span />
                      <span />
                    </span>
                  )}
                </div>
              </div>
            )}

            {error && <div className={styles.chatError}>{error}</div>}
          </div>

          {/* Input */}
          <div className={styles.chatInputArea}>
            <textarea
              className={styles.chatTextarea}
              placeholder="Ask about anything across your workspace… (Enter to send)"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={3}
            />
            <button
              className={styles.chatSendButton}
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? '…' : 'Send'}
            </button>
          </div>
        </div>
      </ViewBody>
    </>
  );
};
