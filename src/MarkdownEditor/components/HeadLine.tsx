import { css, cx } from '@emotion/css';
import { Dropdown, Space } from 'antd';
import React, { PropsWithChildren } from 'react';
import { Icon } from './index';
import { BaseProps } from './toobar-types';

const H1FontSize = '28px';

const H2FontSize = '24px';

const H3FontSize = '20px';

const H4FontSize = '16px';

const H5FontSize = '14px';

const HeadHotKeys = [
  {
    key: '正文',
    hotkey: '⌥ ⌘ 0',
    fontSize: H4FontSize,
  },
  { key: '标题1', hotkey: '⌥ ⌘ 1', fontSize: H1FontSize },
  { key: '标题2', hotkey: '⌥ ⌘ 2', fontSize: H2FontSize },
  { key: '标题3', hotkey: '⌥ ⌘ 3', fontSize: H3FontSize },
  { key: '标题4', hotkey: '⌥ ⌘ 4', fontSize: H4FontSize },
  { key: '标题5', hotkey: '⌥ ⌘ 5', fontSize: H5FontSize },
  { key: '标题6', hotkey: '⌥ ⌘ 6', fontSize: H5FontSize },
];

const HeadLine = React.forwardRef<
  HTMLSpanElement,
  PropsWithChildren<BaseProps>
>(({ className, ...props }, ref) => {
  const items = HeadHotKeys.map(({ key, hotkey, fontSize }) => ({
    key,
    label: (
      <div className={ css``}>
        <div></div>
      <Space>
        <span
          className={css`
            font-weight: 700;
            line-height: 1.6;
            font-size: ${fontSize};
          `}
        >
          {key}
        </span>
        <span
          className={css`
            margin-left: 65px;
          `}
        >
          {hotkey}
        </span>
      </Space>
      </div>
    ),
  }));

  return (
    <Dropdown menu={{ items }}>
      <span
        {...props}
        ref={ref}
        className={cx(
          className,
          css`
            cursor: pointer;
            padding: 5px 5px 5px 10px;
            border-radius: 6px;
            &:hover {
              background: #f4f5f5;
            }
          `,
        )}
      >
        <Space>
          正文
          <Icon>arrow_drop_down</Icon>
        </Space>
      </span>
    </Dropdown>
  );
});

export default HeadLine;
