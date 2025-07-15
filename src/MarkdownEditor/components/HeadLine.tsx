import { CheckOutlined } from '@ant-design/icons';
import { css, cx } from '@emotion/css';
import { Dropdown, Space } from 'antd';
import React, { PropsWithChildren } from 'react';
import { Icon } from './index';
import { BaseProps } from './toobar-types';

// Define font sizes for different headings
const FONT_SIZES = {
  h1: '28px',
  h2: '24px',
  h3: '20px',
  h4: '16px',
  h5: '14px',
};

// Define the type for the hotkeys
const HeadHotKeys = [
 { key: '正文', hotkey: '⌥ ⌘ 0', fontSize: FONT_SIZES.h4 },
  { key: '标题1', hotkey: '⌥ ⌘ 1', fontSize: FONT_SIZES.h1 },
  { key: '标题2', hotkey: '⌥ ⌘ 2', fontSize: FONT_SIZES.h2 },
  { key: '标题3', hotkey: '⌥ ⌘ 3', fontSize: FONT_SIZES.h3 },
  { key: '标题4', hotkey: '⌥ ⌘ 4', fontSize: FONT_SIZES.h4 },
  { key: '标题5', hotkey: '⌥ ⌘ 5', fontSize: FONT_SIZES.h5 },
  { key: '标题6', hotkey: '⌥ ⌘ 6', fontSize: FONT_SIZES.h5 },
];

type HeadLineProps = PropsWithChildren<{ selectedKey: string } & BaseProps>;

// Function to get the label for each item in the dropdown
const getItemLabel = (key: string, hotkey: string, fontSize: string, checked: boolean) => (
  <div
    className={css`
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 30px;
    `}
  >
    <div
      className={css`
        width: 30px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {checked && <CheckOutlined style={{ fontSize: 14 }} />}
    </div>
    <div
      className={css`
        margin-left: 5px;
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
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
          margin-left: 60px;
          color: #bec0bf;
          font-size: 12px;
          font-weight: 400;
        `}
      >
        {hotkey}
      </span>
    </div>
  </div>
);

const HeadLine = React.forwardRef<
  HTMLSpanElement,
  HeadLineProps
  >(({
    className,
    selectedKey = "正文",
    ...props
  }, ref) => {
    
  const items = HeadHotKeys.map(({ key, hotkey, fontSize }) => ({
    key,
    label: getItemLabel(key, hotkey, fontSize, selectedKey === key),
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
          {selectedKey} 
          <Icon>arrow_drop_down</Icon>
        </Space>
      </span>
    </Dropdown>
  );
});

export default HeadLine;
