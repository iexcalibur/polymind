import { SignalWatcher, WithDisposable } from '@blockmind/polymind/global/lit';
import { scrollbarStyle } from '@blockmind/polymind/shared/styles';
import { unsafeCSSVarV2 } from '@blockmind/polymind/shared/theme';
import { type EditorHost } from '@blockmind/polymind/std';
import { InformationIcon, ToggleDownIcon } from '@blocksuite/icons/lit';
import { signal } from '@preact/signals-core';
import { baseTheme } from '@toeverything/theme';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import {
  type AIError,
  AIProvider,
  GeneralNetworkError,
  PaymentRequiredError,
  RequestTimeoutError,
  UnauthorizedError,
} from '../provider';

export class AIErrorWrapper extends SignalWatcher(WithDisposable(LitElement)) {
  static override styles = css`
    .error-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 8px;
      align-self: stretch;
      border-radius: 4px;
      padding: 8px 8px 12px 8px;
      background-color: ${unsafeCSSVarV2('aI/errorBackground')};
      font-family: ${unsafeCSS(baseTheme.fontSansFamily)};

      .content {
        align-items: flex-start;
        display: flex;
        gap: 8px;
        align-self: stretch;
        color: ${unsafeCSSVarV2('aI/errorText')};
        font-feature-settings:
          'clig' off,
          'liga' off;
        /* light/sm */
        font-size: var(--affine-font-sm);
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 157.143% */

        .icon svg {
          position: relative;
          top: 3px;
        }
      }

      .text-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .detail-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: 100%;
      }
      .detail-title {
        display: flex;
        align-items: center;
      }
      .detail-title:hover {
        cursor: pointer;
      }
      .detail-content {
        padding: 8px;
        border-radius: 4px;
        background-color: ${unsafeCSSVarV2('aI/errorDetailBackground')};
        overflow: auto;
      }
      ${scrollbarStyle('.detail-content')}

      .toggle {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .toggle.up svg {
        transform: rotate(180deg);
        transition: all 0.2s ease-in-out;
      }

      .action {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
      }
      .action-button {
        cursor: pointer;
        color: ${unsafeCSSVarV2('text/primary')};
        background: ${unsafeCSSVarV2('button/secondary')};
        border-radius: 8px;
        border: 1px solid ${unsafeCSSVarV2('button/innerBlackBorder')};
        padding: 4px 12px;
        font-size: var(--affine-font-xs);
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
      }
      .action-button:hover {
        transition: all 0.2s ease-in-out;
        background-image: linear-gradient(
          rgba(0, 0, 0, 0.04),
          rgba(0, 0, 0, 0.04)
        );
      }
    }
  `;

  private readonly _showDetailContent = signal(false);

  protected override render() {
    return html` <div class="error-wrapper">
      <div class="content">
        <div class="icon">${InformationIcon()}</div>
        <div class="text-container">
          <div>${this.text}</div>
          ${this.showDetailPanel
            ? html`<div class="detail-container">
                <div
                  class="detail-title"
                  @click=${() =>
                    (this._showDetailContent.value =
                      !this._showDetailContent.value)}
                >
                  <span>Show detail</span>
                  <span
                    class="toggle ${this._showDetailContent.value
                      ? 'down'
                      : 'up'}"
                  >
                    ${ToggleDownIcon({ width: '16px', height: '16px' })}
                  </span>
                </div>
                ${this._showDetailContent.value
                  ? html`<div class="detail-content">${this.errorMessage}</div>`
                  : nothing}
              </div>`
            : nothing}
        </div>
      </div>
      <div class="action">
        <span
          class="action-button"
          @click=${this.onClick}
          data-testid="ai-error-action-button"
        >
          ${this.actionText}
          ${this.actionTooltip
            ? html`<polymind-tooltip tip-position="top">
                ${this.actionTooltip}
              </polymind-tooltip>`
            : nothing}
        </span>
      </div>
    </div>`;
  }

  @property({ attribute: false })
  accessor text: string = '';

  @property({ attribute: false })
  accessor onClick: () => void = () => {};

  @property({ attribute: false })
  accessor errorMessage: string = '';

  @property({ attribute: false })
  accessor actionText: string = 'Contact us';

  @property({ attribute: false })
  accessor actionTooltip: string = '';

  @property({ attribute: false })
  accessor showDetailPanel: boolean = false;

  @property({ attribute: 'data-testid', reflect: true })
  accessor testId = 'ai-error';
}

const PaymentRequiredErrorRenderer = (host?: EditorHost | null) => html`
  <ai-error-wrapper
    .text=${"AI request failed. Check your API key in Settings \u2192 AI Settings."}
    .actionText=${'Settings'}
    .onClick=${() => AIProvider.slots.requestUpgradePlan.next({ host })}
  ></ai-error-wrapper>
`;

const LoginRequiredErrorRenderer = (host?: EditorHost | null) => html`
  <ai-error-wrapper
    .text=${"AI request failed. Check your API key in Settings \u2192 AI Settings."}
    .actionText=${'Settings'}
    .onClick=${() => AIProvider.slots.requestLogin.next({ host })}
  ></ai-error-wrapper>
`;

type ErrorProps = {
  text?: string;
  errorMessage?: string;
  actionText?: string;
  actionTooltip?: string;
};

const GeneralErrorRenderer = (props: ErrorProps = {}) => {
  const onClick = props.actionText === 'AI Settings'
    ? () => AIProvider.slots.requestUpgradePlan.next({ host: null })
    : () => {};

  return html`<ai-error-wrapper
    .text=${props.text ?? 'An unexpected error occurred.'}
    .errorMessage=${props.errorMessage ?? ''}
    .showDetailPanel=${!!props.errorMessage}
    .actionText=${props.actionText ?? 'Dismiss'}
    .onClick=${onClick}
  ></ai-error-wrapper>`;
};

export function AIChatErrorRenderer(error: AIError, host?: EditorHost | null) {
  if (error instanceof PaymentRequiredError) {
    return PaymentRequiredErrorRenderer(host);
  } else if (error instanceof UnauthorizedError) {
    return LoginRequiredErrorRenderer(host);
  } else if (error instanceof RequestTimeoutError) {
    return GeneralErrorRenderer({
      text: 'AI request timed out. Please check your network connection and try again.',
      errorMessage: error.message,
      actionText: 'Dismiss',
    });
  } else if (error instanceof GeneralNetworkError) {
    const msg = error.message?.toLowerCase() ?? '';
    const isApiKeyIssue =
      msg.includes('api key') ||
      msg.includes('apikey') ||
      msg.includes('unauthorized') ||
      msg.includes('401') ||
      msg.includes('403') ||
      msg.includes('not configured');

    if (isApiKeyIssue) {
      return GeneralErrorRenderer({
        text: 'AI API key is missing or invalid. Go to Settings \u2192 AI Settings to configure your API key.',
        errorMessage: error.message,
        actionText: 'AI Settings',
      });
    }

    return GeneralErrorRenderer({
      text: 'AI request failed: ' + (error.message || 'Network error'),
      errorMessage: error.message,
    });
  } else {
    // Unknown error — show the actual message
    const msg = error.message?.toLowerCase() ?? '';
    const isApiKeyIssue =
      msg.includes('api key') ||
      msg.includes('not configured') ||
      msg.includes('401') ||
      msg.includes('403');

    return GeneralErrorRenderer({
      text: isApiKeyIssue
        ? 'AI API key is missing or invalid. Go to Settings \u2192 AI Settings to configure your API key.'
        : 'AI error: ' + (error.message || 'Something went wrong.'),
      errorMessage: error.message,
      actionText: isApiKeyIssue ? 'AI Settings' : 'Dismiss',
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-error-wrapper': AIErrorWrapper;
  }
}
