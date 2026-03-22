'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  XCircleIcon,
  SpinnerIcon,
} from '@phosphor-icons/react'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CheckCircleIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <WarningIcon className="size-4" />,
        error: <XCircleIcon className="size-4" />,
        loading: <SpinnerIcon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--background)',
          '--normal-text': 'var(--foreground)',
          '--normal-border': 'var(--foreground)',
          '--border-radius': '0px',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-foreground group-[.toaster]:border-2 group-[.toaster]:shadow-[4px_4px_0px_0px] group-[.toaster]:shadow-foreground group-[.toaster]:rounded-none',
          description: 'group-[.toast]:text-foreground font-mono',
          actionButton:
            'group-[.toast]:bg-foreground group-[.toast]:text-background group-[.toast]:rounded-none group-[.toast]:border-2 group-[.toast]:border-foreground',
          cancelButton:
            'group-[.toast]:bg-background group-[.toast]:text-foreground group-[.toast]:rounded-none group-[.toast]:border-2 group-[.toast]:border-foreground',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
