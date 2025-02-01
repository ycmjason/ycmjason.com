import type { HTMLAttributes, ReactNode } from 'react';
import { clsx } from '../utils/clsx';

export const VintagePaper = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): ReactNode => {
  return (
    <div
      className={clsx(
        'aspect-297/420 bg-[url("./assets/vintage-paper-compressed.webp")] bg-[var(--color-diary-opened-bg)] bg-cover bg-blend-multiply shadow-lg',
        className,
      )}
      {...props}
    />
  );
};
