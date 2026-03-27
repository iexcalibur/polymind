import { Header } from '@affine/core/components/pure/header';
import { AISearchService } from '@affine/core/modules/ai-search';
import {
  ViewBody,
  ViewHeader,
  ViewIcon,
  ViewTitle,
} from '@affine/core/modules/workbench';
import { useService } from '@toeverything/infra';
import { type KeyboardEvent, useCallback, useRef, useState } from 'react';

import * as styles from './index.css';

export const Component = () => {
  const aiSearchService = useService(AISearchService);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(() => {
    const q = query.trim();
    if (!q || isSearching) return;

    setError(null);
    setIsSearching(true);
    setResults('');
    setHasSearched(true);

    aiSearchService
      .searchWithAI(q, chunk => {
        setResults(prev => prev + chunk);
        // Auto-scroll as results stream in
        const el = resultsRef.current;
        if (el) el.scrollTop = el.scrollHeight;
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Search failed.');
      })
      .finally(() => {
        setIsSearching(false);
      });
  }, [query, isSearching, aiSearchService]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch]
  );

  const hasKey = aiSearchService.hasApiKey();

  return (
    <>
      <ViewTitle title="AI Search" />
      <ViewIcon icon="search" />
      <ViewHeader>
        <Header
          left={
            <span style={{ fontWeight: 700, fontSize: 15 }}>AI Search</span>
          }
        />
      </ViewHeader>
      <ViewBody>
        <div className={styles.searchPage}>
          {/* Search input */}
          <div className={styles.searchInputArea}>
            <input
              className={styles.searchInput}
              placeholder="Search across all your Spaces with AI…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSearching || !hasKey}
              autoFocus
            />
            <button
              className={styles.searchButton}
              onClick={handleSearch}
              disabled={isSearching || !query.trim() || !hasKey}
            >
              {isSearching ? 'Searching…' : 'Search'}
            </button>
          </div>

          {!hasKey && (
            <div className={styles.noKeyMessage}>
              Configure your Claude API key in any Space Chat to enable AI
              Search.
            </div>
          )}

          {/* Results */}
          <div className={styles.resultsArea} ref={resultsRef}>
            {!hasSearched && hasKey && (
              <div className={styles.emptyState}>
                <div className={styles.emptyTitle}>
                  Search with AI reasoning
                </div>
                <p className={styles.emptyDesc}>
                  Type a question or topic. Claude will search across all your
                  Spaces and documents, ranking results by relevance with
                  explanations.
                </p>
              </div>
            )}

            {results && <div className={styles.resultsContent}>{results}</div>}

            {error && <div className={styles.searchError}>{error}</div>}
          </div>
        </div>
      </ViewBody>
    </>
  );
};
