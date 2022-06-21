import cx from 'classnames';
import React from 'react';
import styles from './Button.module.css';

type ButtonSize = 'md' | 'sm';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  secondary?: boolean;
  buttonSize?: ButtonSize;
  iconPrefix?: JSX.Element;
}

export const Button: React.FC<ButtonProps> = ({
  block,
  secondary,
  buttonSize = 'md',
  iconPrefix,
  children,
  className,
  ...props
}) => (
  <button className={cx(styles.button, {
    [styles.block]: block,
    [styles.secondary]: secondary,
    [styles.buttonSizeMd]: buttonSize === 'md',
    [styles.buttonSizeSm]: buttonSize === 'sm'
  }, className)} {...props}>
    {iconPrefix && <div className={styles.prefix}>{iconPrefix}</div>}
    {children}
  </button>
);
