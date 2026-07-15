import {
  CodeOutlined,
  DownOutlined,
  LoadingOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { GPTVis } from '@antv/gpt-vis';
import { Flex, Tag, Typography } from 'antd';
import MarkdownIt from 'markdown-it';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AiContentA2UIInline } from '@/pages/kubernetes/components/ai_content_a2ui_inline';
import {
  looksLikeA2UIJsonContent,
  parseMaybeJSON,
} from '@/pages/kubernetes/components/ai_content_a2ui_protocol';
import type { AiIntlLike } from '@/pages/kubernetes/components/ai_content_utils';
import type { A2UIClientAction } from '@/services/ai_copilot.d';

type MarkdownRenderOptions = {
  streaming?: boolean;
  requestId?: string;
};

type A2UIRenderOptions = {
  processor: any;
  submitAction: (requestId: string, action: A2UIClientAction) => Promise<void>;
  markdownToHtml: (markdown: string) => Promise<string>;
  intl: AiIntlLike;
};

type MarkdownSegment =
  | { type: 'markdown'; content: string }
  | { type: 'code'; language: string; content: string };

const COLLAPSIBLE_CODE_LANGUAGES = new Set([
  'json',
  'yaml',
  'yml',
  'log',
  'bash',
  'shell',
  'sh',
  'plaintext',
  'text',
]);

const isA2UIJsonCodeBlock = (segment: MarkdownSegment) => {
  if (segment.type !== 'code') {
    return false;
  }
  const normalizedLang = (segment.language || 'plaintext').trim().toLowerCase();
  if (normalizedLang !== 'json') {
    return false;
  }
  return looksLikeA2UIJsonContent(segment.content);
};

const createMarkdownParser = () => {
  const parser = new MarkdownIt({
    html: false,
    linkify: true,
    breaks: true,
  });

  const defaultRender =
    parser.renderer.rules.link_open ||
    ((tokens: any, idx: any, options: any, _env: any, self: any) =>
      self.renderToken(tokens, idx, options));

  parser.renderer.rules.link_open = (tokens: any, idx: any, options: any, env: any, self: any) => {
    const token = tokens[idx];
    token.attrSet('target', '_blank');
    token.attrSet('rel', 'noopener noreferrer');
    return defaultRender(tokens, idx, options, env, self);
  };

  const withStyle =
    (tag: string, style: string) =>
    (
      tokens: any,
      idx: any,
      options: any,
      _env: unknown,
      self: any,
    ) => {
      tokens[idx].attrSet('style', style);
      return self.renderToken(tokens, idx, options);
    };

  parser.renderer.rules.heading_open = withStyle(
    'heading',
    'margin:0 0 8px;line-height:1.45;color:#111827;',
  );
  parser.renderer.rules.paragraph_open = withStyle(
    'paragraph',
    'margin:0 0 8px;',
  );
  parser.renderer.rules.bullet_list_open = withStyle(
    'bullet-list',
    'margin:0 0 8px;padding-left:20px;',
  );
  parser.renderer.rules.ordered_list_open = withStyle(
    'ordered-list',
    'margin:0 0 8px;padding-left:20px;',
  );
  parser.renderer.rules.list_item_open = withStyle(
    'list-item',
    'margin:0 0 4px;',
  );
  parser.renderer.rules.blockquote_open = withStyle(
    'blockquote',
    'margin:0 0 8px;padding-left:12px;border-left:3px solid #dbeafe;color:#475467;',
  );

  return parser;
};

const normalizeStreamingMarkdown = (content: string, streaming = false) => {
  if (!streaming) {
    return content;
  }
  const fenceMatches = content.match(/```/g);
  if ((fenceMatches?.length || 0) % 2 === 1) {
    return `${content}\n\`\`\``;
  }
  return content;
};

const splitMarkdownSegments = (content: string): MarkdownSegment[] => {
  const segments: MarkdownSegment[] = [];
  const pattern = /```([^\n`]*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'markdown',
        content: content.slice(lastIndex, match.index),
      });
    }
    segments.push({
      type: 'code',
      language: (match[1] || 'plaintext').trim().toLowerCase(),
      content: match[2] || '',
    });
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < content.length) {
    segments.push({
      type: 'markdown',
      content: content.slice(lastIndex),
    });
  }

  return segments.filter((segment) => segment.content.trim().length > 0);
};

const looksLikeVisChartBlock = (codeStr: string) => {
  const trimmed = String(codeStr || '').trim();
  if (!trimmed) {
    return false;
  }
  return trimmed.startsWith('{') || trimmed.startsWith('[');
};

const AiContentVis: React.FC<{ codeStr: string }> = ({ codeStr }) => {
  const source = useMemo(() => codeStr.trim(), [codeStr]);
  if (!looksLikeVisChartBlock(source)) {
    return null;
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: 360,
        borderRadius: 12,
        border: '1px solid #e5edf5',
        background: '#fff',
        overflow: 'hidden',
      }}
    >
      <GPTVis>{`\n\`\`\`vis-chart\n${source}\n\`\`\``}</GPTVis>
    </div>
  );
};

const createCodePreview = (content: string, maxLen = 96) => {
  const normalized = content.replace(/\s+/g, ' ').trim();
  if (!normalized) {
    return 'waiting for code output';
  }
  if (normalized.length <= maxLen) {
    return normalized;
  }
  return `${normalized.slice(0, maxLen)}...`;
};

const formatCodeLabel = (language: string) => {
  const normalized = (language || 'code').toLowerCase();
  switch (normalized) {
    case 'json':
      return 'json';
    case 'yaml':
    case 'yml':
      return 'yaml';
    case 'log':
      return 'logs';
    case 'bash':
    case 'sh':
    case 'shell':
      return 'toolOutput';
    case 'plaintext':
    case 'text':
      return 'toolOutput';
    default:
      return 'toolOutput';
  }
};

const CollapsedCodeBlock: React.FC<{
  language: string;
  codeStr: string;
  streaming?: boolean;
  intl?: AiIntlLike;
  children: React.ReactNode;
}> = ({ language, codeStr, streaming, intl, children }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (streaming) {
      setExpanded(false);
    }
  }, [streaming, codeStr]);

  const preview = useMemo(() => createCodePreview(codeStr), [codeStr]);
  const labelKey = formatCodeLabel(language);
  const labelMap: Record<string, { id: string; defaultMessage: string }> = {
    json: { id: 'copilot.code.label.json', defaultMessage: 'JSON' },
    yaml: { id: 'copilot.code.label.yaml', defaultMessage: 'YAML' },
    logs: { id: 'copilot.code.label.logs', defaultMessage: 'Logs' },
    toolOutput: {
      id: 'copilot.code.label.toolOutput',
      defaultMessage: 'Tool output',
    },
  };
  const label = intl
    ? intl.formatMessage(labelMap[labelKey] || labelMap.toolOutput)
    : labelMap[labelKey]?.defaultMessage || labelMap.toolOutput.defaultMessage;

  return (
    <div
      style={{
        borderRadius: 12,
        border: '1px solid #eef2f6',
        background: '#fafbfc',
        overflow: 'hidden',
      }}
    >
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        style={{
          width: '100%',
          border: 'none',
          background: 'transparent',
          padding: '8px 10px',
          textAlign: 'left',
          cursor: 'pointer',
        }}
      >
        <Flex align="center" justify="space-between" gap={10}>
          <Flex align="center" gap={8} style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: streaming ? '#eef4ff' : '#f3f4f6',
                color: streaming ? '#4f6fa8' : '#7c8797',
                flexShrink: 0,
              }}
            >
              {streaming ? <LoadingOutlined /> : <CodeOutlined />}
            </div>
            <Flex vertical gap={2} style={{ minWidth: 0, flex: 1 }}>
              <Flex align="center" gap={8} wrap={false}>
                <Typography.Text
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#1f2937',
                    lineHeight: 1.2,
                  }}
                >
                  {label}
                </Typography.Text>
                <Typography.Text
                  type="secondary"
                  style={{
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {language || 'code'}
                </Typography.Text>
              </Flex>
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
                {preview}
              </Typography.Text>
            </Flex>
          </Flex>
          <Flex align="center" gap={8} style={{ flexShrink: 0 }}>
            {streaming ? (
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
                {intl?.formatMessage({
                  id: 'copilot.code.streaming',
                  defaultMessage: 'streaming',
                }) || 'streaming'}
              </Tag>
            ) : null}
            <Typography.Text type="secondary" style={{ fontSize: 11 }}>
              {expanded
                ? intl?.formatMessage({
                    id: 'copilot.code.hide',
                    defaultMessage: 'Hide',
                  }) || 'Hide'
                : intl?.formatMessage({
                    id: 'copilot.code.view',
                    defaultMessage: 'View',
                  }) || 'View'}
            </Typography.Text>
            <span style={{ color: '#a8b1be', display: 'inline-flex', fontSize: 11 }}>
              {expanded ? <DownOutlined /> : <RightOutlined />}
            </span>
          </Flex>
        </Flex>
      </button>
      {expanded ? (
        <div
          style={{
            padding: '0 10px 10px',
            borderTop: '1px solid #eef2f7',
            background: '#ffffff',
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};

const PlainCodeBlock: React.FC<{
  codeStr: string;
  language?: string;
  label?: string;
  intl?: AiIntlLike;
}> = ({ codeStr, language, label, intl }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    {(label || language) && (
      <Flex justify="space-between" align="center" wrap gap={8}>
        {label ? (
          <Tag
            color="processing"
            style={{ width: 'fit-content', marginInlineEnd: 0 }}
          >
            {label}
          </Tag>
        ) : null}
        {language ? (
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {language}
          </Typography.Text>
        ) : null}
      </Flex>
    )}
    <pre
      style={{
        margin: 0,
        padding: '10px 12px',
        borderRadius: 12,
        background: '#f8fafc',
        color: '#0f172a',
        border: '1px solid #e5edf5',
        overflowX: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontSize: 12,
        lineHeight: 1.65,
      }}
    >
      <code>{codeStr}</code>
    </pre>
  </div>
);

const A2UIJsonPreview: React.FC<{ codeStr: string; intl: AiIntlLike }> = ({
  codeStr,
  intl,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Tag
      color="processing"
      style={{ width: 'fit-content', marginInlineEnd: 0 }}
    >
      {intl.formatMessage({
        id: 'copilot.a2ui.preview',
        defaultMessage: 'a2ui payload',
      })}
    </Tag>
    <PlainCodeBlock codeStr={codeStr} language="json" intl={intl} />
  </div>
);

const A2UILoadingBlock: React.FC<{ intl: AiIntlLike }> = ({ intl }) => (
  <div
    style={{
      borderRadius: 12,
      border: '1px solid #eef2f6',
      background: '#fafbfc',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        width: '100%',
        padding: '8px 10px',
      }}
    >
      <Flex align="center" justify="space-between" gap={10}>
        <Flex align="center" gap={8} style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              width: 22,
              height: 22,
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
                lineHeight: 1.2,
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

const MarkdownHtmlBlock: React.FC<{ html: string }> = ({ html }) => (
  <div
    style={{
      color: '#111827',
      fontSize: 14,
      lineHeight: 1.85,
      wordBreak: 'break-word',
      margin: 0,
    }}
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

const shouldCollapseCodeBlock = (lang: string, a2uiPayload = false) => {
  if (a2uiPayload) {
    return false;
  }
  return COLLAPSIBLE_CODE_LANGUAGES.has((lang || 'plaintext').toLowerCase());
};

const renderSpecialCodeBlock = (
  lang: string,
  codeStr: string,
  a2ui?: A2UIRenderOptions,
  requestId?: string,
  streaming = false,
) => {
  const normalizedLang = (lang || 'plaintext').toLowerCase();
  const normalizedCode =
    normalizedLang === 'vis' || normalizedLang === 'mermaid'
      ? codeStr.trim()
      : codeStr.replace(/\n$/, '');

  if (normalizedLang === 'vis') {
    return <AiContentVis codeStr={normalizedCode} />;
  }

  if (normalizedLang === 'log') {
    const block = (
      <PlainCodeBlock
        codeStr={normalizedCode}
        language="log"
        intl={a2ui?.intl}
      />
    );
    return (
      <CollapsedCodeBlock
        language={normalizedLang}
        codeStr={normalizedCode}
        streaming={streaming}
        intl={a2ui?.intl}
      >
        {block}
      </CollapsedCodeBlock>
    );
  }

  if (normalizedLang === 'mermaid') {
    return (
      <PlainCodeBlock
        codeStr={normalizedCode}
        language="mermaid"
        label={
          a2ui?.intl.formatMessage({
            id: 'copilot.code.label.mermaid',
            defaultMessage: 'mermaid source',
          }) || 'mermaid source'
        }
        intl={a2ui?.intl}
      />
    );
  }

  if (normalizedLang === 'json') {
    const parsed = parseMaybeJSON(normalizedCode);
    const looksLikeA2UI = looksLikeA2UIJsonContent(normalizedCode);

    if (looksLikeA2UI) {
      if (!parsed && streaming) {
        return (
          <A2UILoadingBlock
            intl={
              a2ui?.intl || {
                formatMessage: ({ defaultMessage }: any) => defaultMessage || '',
              }
            }
          />
        );
      }
      return a2ui ? (
        <AiContentA2UIInline
          codeBlocks={[normalizedCode]}
          requestId={requestId || 'inline-a2ui'}
          processor={a2ui.processor}
          submitAction={a2ui.submitAction}
          markdownToHtml={a2ui.markdownToHtml}
          intl={a2ui.intl}
          streaming={streaming}
          fallback={<A2UIJsonPreview codeStr={normalizedCode} intl={a2ui.intl} />}
        />
      ) : (
        <A2UIJsonPreview
          codeStr={normalizedCode}
          intl={{
            formatMessage: ({ defaultMessage }: any) => defaultMessage || '',
          }}
        />
      );
    }
  }

  const block = (
    <PlainCodeBlock
      codeStr={normalizedCode}
      language={normalizedLang || 'plaintext'}
      intl={a2ui?.intl}
    />
  );

  if (shouldCollapseCodeBlock(normalizedLang)) {
    return (
      <CollapsedCodeBlock
        language={normalizedLang}
        codeStr={normalizedCode}
        streaming={streaming}
        intl={a2ui?.intl}
      >
        {block}
      </CollapsedCodeBlock>
    );
  }

  return block;
};

export const createAiMarkdownRenderer = (a2ui?: A2UIRenderOptions) => {
  const parser = createMarkdownParser();

  return (content: string, options?: MarkdownRenderOptions) => {
    const normalized = normalizeStreamingMarkdown(
      content,
      Boolean(options?.streaming),
    );
    const segments = splitMarkdownSegments(normalized);

    if (segments.length === 0) {
      return null;
    }

    const nodes: React.ReactNode[] = [];
    for (let index = 0; index < segments.length; index += 1) {
      const segment = segments[index];
      if (isA2UIJsonCodeBlock(segment)) {
        const groupedBlocks = [segment.content];
        let cursor = index + 1;
        while (cursor < segments.length && isA2UIJsonCodeBlock(segments[cursor])) {
          groupedBlocks.push(segments[cursor].content);
          cursor += 1;
        }
        nodes.push(
          <React.Fragment key={`a2ui-${index}`}>
            {a2ui ? (
              <AiContentA2UIInline
                codeBlocks={groupedBlocks}
                requestId={options?.requestId || 'inline-a2ui'}
                processor={a2ui.processor}
                submitAction={a2ui.submitAction}
                markdownToHtml={a2ui.markdownToHtml}
                intl={a2ui.intl}
                streaming={Boolean(options?.streaming)}
                fallback={
                  <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                  >
                    {groupedBlocks.map((block, blockIndex) => (
                      <A2UIJsonPreview
                        key={`a2ui-preview-${index}-${blockIndex}`}
                        codeStr={block}
                        intl={a2ui.intl}
                      />
                    ))}
                  </div>
                }
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {groupedBlocks.map((block, blockIndex) => (
                  <A2UIJsonPreview
                    key={`a2ui-preview-${index}-${blockIndex}`}
                    codeStr={block}
                    intl={{
                      formatMessage: ({ defaultMessage }: any) =>
                        defaultMessage || '',
                    }}
                  />
                ))}
              </div>
            )}
          </React.Fragment>,
        );
        index = cursor - 1;
        continue;
      }

      if (segment.type === 'code') {
        nodes.push(
          <React.Fragment key={`code-${index}`}>
            {renderSpecialCodeBlock(
              segment.language,
              segment.content,
              a2ui,
              options?.requestId,
              Boolean(options?.streaming),
            )}
          </React.Fragment>,
        );
        continue;
      }

      const html = parser.render(segment.content);
      if (!html.trim()) {
        continue;
      }
      nodes.push(<MarkdownHtmlBlock key={`md-${index}`} html={html} />);
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {nodes}
      </div>
    );
  };
};
