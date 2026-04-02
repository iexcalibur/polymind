import { Button, Input, notify } from '@affine/component';
import {
  SettingHeader,
  SettingRow,
  SettingWrapper,
} from '@affine/component/setting-components';
import { useCallback, useState } from 'react';

const PROVIDERS = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'gemini', label: 'Google Gemini' },
];

export const AISettings = () => {
  const [provider, setProvider] = useState('openai');
  const [apiKey, setApiKey] = useState('');
  const [baseURL, setBaseURL] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(async () => {
    if (!apiKey.trim()) {
      notify.error({ title: 'API key is required' });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/local/ai-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          provider,
          apiKey: apiKey.trim(),
          ...(baseURL.trim() ? { baseURL: baseURL.trim() } : {}),
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(body || res.statusText);
      }
      notify.success({ title: 'AI provider saved. Reload to apply.' });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      notify.error({ title: 'Failed to save', message: msg });
    } finally {
      setSaving(false);
    }
  }, [provider, apiKey, baseURL]);

  const handleProviderChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setProvider(e.target.value);
      setApiKey('');
      setBaseURL('');
    },
    []
  );

  return (
    <>
      <SettingHeader
        title="AI Settings"
        subtitle="Configure your own AI provider API key"
      />
      <SettingWrapper title="Provider">
        <SettingRow name="Provider" desc="Select the AI provider to use">
          <select
            value={provider}
            onChange={handleProviderChange}
            style={{ padding: '4px 8px', borderRadius: 4 }}
          >
            {PROVIDERS.map(p => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </SettingRow>
        <SettingRow
          name="API Key"
          desc="Your API key for the selected provider"
        >
          <Input
            type="password"
            value={apiKey}
            onChange={setApiKey}
            placeholder="sk-..."
            width={280}
          />
        </SettingRow>
        <SettingRow
          name="Base URL (optional)"
          desc="Custom API base URL — leave blank to use default"
        >
          <Input
            value={baseURL}
            onChange={setBaseURL}
            placeholder="https://api.openai.com/v1"
            width={280}
          />
        </SettingRow>
        <SettingRow name="" desc="">
          <Button
            variant="primary"
            onClick={() => void handleSave()}
            disabled={saving}
          >
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </SettingRow>
      </SettingWrapper>
    </>
  );
};
