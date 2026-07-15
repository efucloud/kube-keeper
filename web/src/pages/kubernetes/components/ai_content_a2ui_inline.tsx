import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Flex, Tag, Typography } from 'antd';
import { A2uiSurface, MarkdownContext } from '@a2ui/react/v0_9';
import { injectBasicCatalogStyles } from '@a2ui/web_core/v0_9/basic_catalog';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { A2UIClientAction } from '@/services/ai_copilot.d';
import {
  createSyntheticSurfaceMessage,
  parseA2UIProtocolBlocks,
} from '@/pages/kubernetes/components/ai_content_a2ui_protocol';
import type { AiIntlLike } from '@/pages/kubernetes/components/ai_content_utils';

const a2uiInteractionStyleId = 'kk-a2ui-inline-interaction-style';

export type AiContentA2UIInlineProps = {
  codeBlocks: string[];
  requestId: string;
  processor: any;
  submitAction: (requestId: string, action: A2UIClientAction) => Promise<void>;
  markdownToHtml: (markdown: string) => Promise<string>;
  intl: AiIntlLike;
  fallback: React.ReactNode;
  streaming?: boolean;
};

const A2UILoadingSurface: React.FC<{ intl: AiIntlLike }> = ({ intl }) => (
  <div
    style={{
      borderRadius: 14,
      border: '1px solid #e8edf4',
      background:
        'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, #fafcfe 100%)',
      boxShadow: '0 10px 24px rgba(15, 23, 42, 0.04)',
      overflow: 'hidden',
    }}
  >
    <div style={{ width: '100%', padding: '10px 12px' }}>
      <Flex align="center" justify="space-between" gap={10}>
        <Flex align="center" gap={10} style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 999,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#eef4ff',
              color: '#4f6fa8',
              flexShrink: 0,
            }}
          >
            <LoadingOutlined />
          </div>
          <Flex vertical gap={2} style={{ minWidth: 0, flex: 1 }}>
            <Typography.Text
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#1f2937',
                lineHeight: 1.25,
              }}
            >
              {intl.formatMessage({
                id: 'copilot.a2ui.loading.title',
                defaultMessage: 'Action UI',
              })}
            </Typography.Text>
            <Typography.Text
              type="secondary"
              style={{
                fontSize: 11,
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontFamily:
                  'ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, monospace',
              }}
            >
              {intl.formatMessage({
                id: 'copilot.a2ui.loading.subtitle',
                defaultMessage: 'waiting for interactive controls',
              })}
            </Typography.Text>
          </Flex>
        </Flex>
        <Tag
          color="processing"
          style={{
            marginInlineEnd: 0,
            borderRadius: 999,
            paddingInline: 6,
            fontSize: 10,
            lineHeight: '18px',
          }}
        >
          {intl.formatMessage({
            id: 'copilot.code.streaming',
            defaultMessage: 'streaming',
          })}
        </Tag>
      </Flex>
    </div>
  </div>
);

const ensureA2UIStyles = () => {
  if (typeof window === 'undefined') {
    return;
  }
  injectBasicCatalogStyles();
  if (document.getElementById(a2uiInteractionStyleId)) {
    return;
  }
  const style = document.createElement('style');
  style.id = a2uiInteractionStyleId;
  style.textContent = `
    .kk-a2ui-inline {
      --a2ui-color-background: #f6f8fb;
      --a2ui-color-surface: #ffffff;
      --a2ui-color-on-surface: #0f172a;
      --a2ui-color-border: #e6ebf2;
      --a2ui-border-radius: 12px;
      --a2ui-spacing-m: 8px;
      --a2ui-spacing-l: 10px;
      --a2ui-card-padding: 14px;
      --a2ui-card-margin: 0;
      --a2ui-card-border: 1px solid #e7edf5;
      --a2ui-card-border-radius: 14px;
      --a2ui-card-box-shadow: 0 10px 24px rgba(15, 23, 42, 0.04);
      --a2ui-card-background: #ffffff;
    }

    .kk-a2ui-inline * {
      box-sizing: border-box;
    }

    .kk-a2ui-inline button {
      appearance: none;
      display: inline-grid;
      grid-auto-flow: column;
      align-items: center;
      justify-content: center;
      min-height: 40px;
      padding: 0 18px;
      border-radius: 10px;
      border: 1px solid #d6deea;
      background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
      color: #18212f;
      font-size: 13px;
      font-weight: 600;
      line-height: 1.1;
      text-align: center;
      white-space: nowrap;
      letter-spacing: 0;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85);
      cursor: pointer;
      transition: transform 0.16s ease, box-shadow 0.16s ease,
        border-color 0.18s ease, background-color 0.18s ease,
        color 0.18s ease;
    }

    .kk-a2ui-inline button > * {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 100%;
    }

    .kk-a2ui-inline button .a2uiText,
    .kk-a2ui-inline button .a2uiText p,
    .kk-a2ui-inline button [class*="a2uiText"] {
      display: flex !important;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 100%;
      margin: 0 !important;
      line-height: 1.1 !important;
      text-align: center;
    }

    .kk-a2ui-inline button .a2uiText > *,
    .kk-a2ui-inline button [class*="a2uiText"] > * {
      margin: 0 !important;
    }

    .kk-a2ui-inline button p,
    .kk-a2ui-inline button .body,
    .kk-a2ui-inline button .body p {
      margin: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      text-align: center !important;
      line-height: 1.1 !important;
    }

    .kk-a2ui-inline button .body {
      width: 100%;
      min-height: 100%;
    }

    .kk-a2ui-inline button:hover {
      transform: translateY(-1px);
      border-color: #bec9d8;
      background: linear-gradient(180deg, #ffffff 0%, #f3f6fa 100%);
      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
    }

    .kk-a2ui-inline button:active {
      transform: translateY(0);
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.06);
    }

    .kk-a2ui-inline button:disabled {
      cursor: not-allowed;
      opacity: 0.58;
      transform: none;
      box-shadow: none;
    }

    .kk-a2ui-inline button:first-of-type {
      background: linear-gradient(180deg, #3f7bf3 0%, #2e63d6 100%);
      border-color: #2f66dc;
      color: #ffffff;
      box-shadow: 0 10px 20px rgba(46, 99, 214, 0.2);
    }

    .kk-a2ui-inline button:first-of-type:hover {
      border-color: #2a5dca;
      background: linear-gradient(180deg, #3974ea 0%, #285ac5 100%);
      box-shadow: 0 12px 24px rgba(46, 99, 214, 0.24);
    }

    .kk-a2ui-inline .a2uiText h4,
    .kk-a2ui-inline .a2uiText h3,
    .kk-a2ui-inline .a2uiText h2 {
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 6px 0;
      font-size: 15px;
      letter-spacing: -0.01em;
      line-height: 1.28;
    }

    .kk-a2ui-inline .a2uiText p,
    .kk-a2ui-inline .a2uiText {
      color: #526071;
      font-size: 13px;
      line-height: 1.5;
    }

    .kk-a2ui-inline .a2uiCard,
    .kk-a2ui-inline [class*="a2uiCard"] {
      padding: 14px !important;
      border-radius: 14px !important;
      border: 1px solid #e7edf5 !important;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, #fbfcfd 100%) !important;
      box-shadow:
        0 12px 28px rgba(15, 23, 42, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
      position: relative;
      overflow: hidden;
    }

    .kk-a2ui-inline .a2uiCard::before,
    .kk-a2ui-inline [class*="a2uiCard"]::before {
      content: '';
      position: absolute;
      inset: 0 auto 0 0;
      width: 3px;
      border-radius: 999px;
      background: linear-gradient(180deg, #4a7df0 0%, #2f63d7 100%);
      opacity: 0.92;
    }

    .kk-a2ui-inline .a2uiColumn,
    .kk-a2ui-inline [class*="a2uiColumn"] {
      gap: 10px !important;
    }

    .kk-a2ui-inline .a2uiRow,
    .kk-a2ui-inline [class*="a2uiRow"] {
      gap: 10px !important;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    .kk-a2ui-inline .a2uiRow > button,
    .kk-a2ui-inline [class*="a2uiRow"] > button {
      min-width: 112px;
      flex: 0 0 auto;
    }

    .kk-a2ui-inline > div,
    .kk-a2ui-inline > div > div {
      width: 100%;
    }

    @media (max-width: 640px) {
      .kk-a2ui-inline .a2uiRow > button,
      .kk-a2ui-inline [class*="a2uiRow"] > button {
        flex: 1 1 0;
        min-width: 0;
      }
    }
  `;
  document.head.appendChild(style);
};

export const AiContentA2UIInline: React.FC<AiContentA2UIInlineProps> = ({
  codeBlocks,
  requestId,
  processor,
  submitAction,
  markdownToHtml,
  intl,
  fallback,
  streaming,
}) => {
  const [error, setError] = useState<string>('');
  const [surfaceId, setSurfaceId] = useState<string>('');
  const [appliedFingerprint, setAppliedFingerprint] = useState<string>('');
  const processedPayloadKeysRef = useRef<Set<string>>(new Set());
  const submittedActionKeysRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    ensureA2UIStyles();
  }, []);

  const parsedProtocol = useMemo(
    () => parseA2UIProtocolBlocks(codeBlocks, intl),
    [codeBlocks, intl],
  );

  useEffect(() => {
    setError('');
    if (!parsedProtocol.ok) {
      if (!streaming) {
        setError(parsedProtocol.error);
      }
      return;
    }

    const nextSurfaceId = parsedProtocol.surfaceId;
    const currentSurface = processor?.model?.getSurface?.(nextSurfaceId);
    const payloads: Record<string, unknown>[] = [];

    if (!parsedProtocol.containsCreateSurface && !currentSurface) {
      payloads.push(createSyntheticSurfaceMessage(nextSurfaceId));
    }

    for (const message of parsedProtocol.protocolMessages) {
      const actionKey = Object.keys(message)[1] || Object.keys(message)[0] || 'unknown';
      const dedupeKey = `${nextSurfaceId}:${actionKey}:${JSON.stringify(message)}`;
      if (processedPayloadKeysRef.current.has(dedupeKey)) {
        continue;
      }
      processedPayloadKeysRef.current.add(dedupeKey);
      payloads.push(message);
    }

    if (payloads.length > 0) {
      processor.processMessages(payloads as never);
    }
    setSurfaceId(nextSurfaceId);
    setAppliedFingerprint(parsedProtocol.fingerprint);
  }, [parsedProtocol, processor, streaming]);

  const surface = surfaceId
    ? processor?.model?.getSurface?.(surfaceId)
    : undefined;

  useEffect(() => {
    if (!surface) {
      return;
    }
    const subscription = surface.onAction.subscribe((action: any) => {
      const actionKey = JSON.stringify({
        surfaceId: action?.surfaceId,
        sourceComponentId: action?.sourceComponentId,
        name: action?.name,
        context: action?.context,
      });
      if (submittedActionKeysRef.current.has(actionKey)) {
        return;
      }
      submittedActionKeysRef.current.add(actionKey);
      void submitAction(requestId, action);
    });
    return () => subscription?.unsubscribe();
  }, [requestId, submitAction, surface]);

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Alert type="warning" showIcon message={error} />
        {fallback}
      </div>
    );
  }

  if (!parsedProtocol.ok && streaming) {
    return <A2UILoadingSurface intl={intl} />;
  }

  if (!surface) {
    return streaming ? <A2UILoadingSurface intl={intl} /> : <>{fallback}</>;
  }

  return (
    <div
      key={`${surfaceId}:${appliedFingerprint}`}
      className="kk-a2ui-inline"
      style={{ width: '100%' }}
    >
      <MarkdownContext.Provider value={markdownToHtml}>
        <A2uiSurface surface={surface} />
      </MarkdownContext.Provider>
    </div>
  );
};
