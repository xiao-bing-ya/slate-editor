import { css, cx } from '@emotion/css';
import React, { PropsWithChildren, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { BaseProps } from "./toobar-types";

type ButtonProps = PropsWithChildren<{
    active: boolean;
    reversed: boolean;
} & BaseProps>;

export const Button = React.forwardRef<HTMLSpanElement,ButtonProps>(
  (
    {
      className,
      active,
      reversed,
      ...props
    },
    ref
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? 'white'
              : '#aaa'
            : active
            ? 'black'
            : '#ccc'};
        `
      )}
    />
  )
)

export const Icon = React.forwardRef<HTMLSpanElement,PropsWithChildren<BaseProps>>(
  (
    { className, ...props },
    ref
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        'material-icons',
        className,
        css`
          vertical-align: middle;
          padding:5px;
          border-radius: 6px;
           &:hover{
             background:#F4F5F5;
           }
        `
      )}
    />
  )
)

export const Instruction = React.forwardRef<HTMLDivElement,PropsWithChildren<BaseProps>>(
  (
    { className, ...props } ,
    ref
  ) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          white-space: pre-wrap;
          margin: 0 -20px 10px;
          padding: 10px 20px;
          font-size: 14px;
          background: #f8f8e8;
        `
      )}
    />
  )
)

export const Menu = React.forwardRef<HTMLDivElement,PropsWithChildren<BaseProps>>(
  (
    { className, ...props },
    ref
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={cx(
        className,
          css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 5px;
          }
        `
      )}
    />
  )
)

export const Portal = ({ children }: { children?: ReactNode }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null
}

export const Toolbar = React.forwardRef<HTMLDivElement,PropsWithChildren<BaseProps>>(
  (
    { className, ...props },
    ref
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
          display:flex;
          align-items:center;
        `
      )}
    />
  )
)