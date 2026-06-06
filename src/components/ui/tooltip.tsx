import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  closeOnClickOutside = false,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root> & { closeOnClickOutside?: boolean }) {
  const isControlled = props.open !== undefined
  const [openState, setOpenState] = React.useState(false)

  const open = isControlled ? (props.open as boolean) : openState
  const setOpen = isControlled
    ? (next: boolean) => props.onOpenChange?.(next)
    : setOpenState

  React.useEffect(() => {
    if (!closeOnClickOutside || !open) return
    const handler = (e: PointerEvent) => {
      const content = document.querySelector('[data-slot="tooltip-content"]')
      const trigger = document.querySelector('[data-slot="tooltip-trigger"]')
      if (content && content.contains(e.target as Node)) return
      if (trigger && trigger.contains(e.target as Node)) return
      setOpen(false)
    }
    document.addEventListener("pointerdown", handler)
    return () => document.removeEventListener("pointerdown", handler)
  }, [open, closeOnClickOutside])

  const passedProps: any = { ...props }
  if (!isControlled) {
    passedProps.open = openState
    passedProps.onOpenChange = setOpenState
  }

  return <TooltipPrimitive.Root data-slot="tooltip" {...passedProps} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-foreground text-background dark:bg-slate-800 dark:text-white animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground dark:bg-slate-800 dark:fill-slate-800 z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
