import cn from 'classnames';
import React, { forwardRef, useRef, ButtonHTMLAttributes, useState, useEffect } from 'react';
import { mergeRefs } from 'react-merge-refs';

import LoadingDots from '@/components/ui/LoadingDots';

import styles from './Button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'slim' | 'flat';
  active?: boolean;
  width?: number;
  loading?: boolean;
  Component?: React.ComponentType;
}

const Button = forwardRef<HTMLButtonElement, Props>((props, buttonRef) => {
  const {
    className,
    variant = 'flat',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props;

  const [shining, setShining] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShining(false);
    }, 1000);
    setShining(true);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShimmer(false);
    }, 1200);
    setShimmer(true);
    return () => clearTimeout(timeout);
  }, []);



  const ref = useRef(null);
  const rootClassName = cn(
    styles.root,
    {
      [styles.slim]: variant === 'slim',
      [styles.loading]: loading,
      [styles.disabled]: disabled,
      [styles.shining]: shining,
      [styles.shimmer]: shimmer
    },
    className
  );
  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      )}
    </Component>
  );
});

export default Button;
