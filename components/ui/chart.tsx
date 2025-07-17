"use client"

import * as React from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import type { TooltipProps, LegendProps } from "recharts"

import { Card } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer as ChartContainerAlias,
  ChartLegend as ChartLegendAlias,
  ChartLegendContent as ChartLegendContentAlias,
  ChartTooltip as ChartTooltipAlias,
  ChartTooltipContent as ChartTooltipContentAlias,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

// Define a type for common chart props
interface CommonChartProps {
  data: Record<string, any>[]
  chartConfig: ChartConfig
  className?: string
  children?: React.ReactNode
}

// Line Chart Component
interface LineChartProps extends CommonChartProps {
  syncId?: string
}

const ChartLine = ({ data, chartConfig, className, children, syncId }: LineChartProps) => {
  return (
    <ChartContainerAlias config={chartConfig} className={className}>
      <LineChart accessibilityLayer data={data} syncId={syncId}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <ChartTooltipAlias cursor={false} content={<ChartTooltipContentAlias />} />
        <ChartLegendAlias content={<ChartLegendContentAlias />} />
        {Object.entries(chartConfig).map(([key, { color, label, type }]) => {
          if (type === "line") {
            return <Line key={key} dataKey={key} stroke={`hsl(${color})`} dot={false} name={label} />
          }
          return null
        })}
        {children}
      </LineChart>
    </ChartContainerAlias>
  )
}

// Bar Chart Component
interface BarChartProps extends CommonChartProps {
  syncId?: string
}

const ChartBar = ({ data, chartConfig, className, children, syncId }: BarChartProps) => {
  return (
    <ChartContainerAlias config={chartConfig} className={className}>
      <BarChart accessibilityLayer data={data} syncId={syncId}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <ChartTooltipAlias cursor={false} content={<ChartTooltipContentAlias />} />
        <ChartLegendAlias content={<ChartLegendContentAlias />} />
        {Object.entries(chartConfig).map(([key, { color, label, type }]) => {
          if (type === "bar") {
            return <Bar key={key} dataKey={key} fill={`hsl(${color})`} radius={4} name={label} />
          }
          return null
        })}
        {children}
      </BarChart>
    </ChartContainerAlias>
  )
}

// Area Chart Component
interface AreaChartProps extends CommonChartProps {
  syncId?: string
}

const ChartArea = ({ data, chartConfig, className, children, syncId }: AreaChartProps) => {
  return (
    <ChartContainerAlias config={chartConfig} className={className}>
      <AreaChart accessibilityLayer data={data} syncId={syncId}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <ChartTooltipAlias cursor={false} content={<ChartTooltipContentAlias />} />
        <ChartLegendAlias content={<ChartLegendContentAlias />} />
        {Object.entries(chartConfig).map(([key, { color, label, type }]) => {
          if (type === "area") {
            return <Area key={key} dataKey={key} fill={`hsl(${color})`} stroke={`hsl(${color})`} name={label} />
          }
          return null
        })}
        {children}
      </AreaChart>
    </ChartContainerAlias>
  )
}

export { ChartLine, ChartBar, ChartArea }

export type { ChartConfig }

// Chart components from shadcn/ui
// This part is directly from shadcn/ui documentation
// components/ui/chart.tsx
// This file is part of the shadcn/ui chart component.
// It is not meant to be modified.

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

interface ChartContextProps {
  config: ChartConfig
}

interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig
  children: React.ReactNode
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, className, children, ...props }, ref) => {
    const newConfig = React.useMemo(() => {
      const newConfig: ChartConfig = {}
      for (const key in config) {
        const value = config[key]
        if (value && typeof value === "object") {
          newConfig[key] = {
            ...value,
            color: `hsl(${value.color})`,
          }
        }
      }
      return newConfig
    }, [config])

    return (
      <ChartContext.Provider value={{ config: newConfig }}>
        <div
          ref={ref}
          className={cn("flex h-[400px] w-full flex-col items-center justify-center", className)}
          {...props}
        >
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    )
  },
)
ChartContainer.displayName = "ChartContainer"

interface ChartTooltipProps extends React.ComponentProps<typeof Tooltip> {
  hideContent?: boolean
  showIndex?: boolean
  customTooltip?: React.ComponentType<any>
}

const ChartTooltip = ({
  hideContent = false,
  showIndex = true,
  customTooltip,
  children,
  ...props
}: ChartTooltipProps) => {
  const { config } = useChart()

  return (
    <Tooltip {...props}>
      {hideContent ? null : customTooltip ? (
        React.createElement(customTooltip, { config })
      ) : (
        <ChartTooltipContent config={config} showIndex={showIndex} />
      )}
      {children}
    </Tooltip>
  )
}
ChartTooltip.displayName = "ChartTooltip"

interface ChartTooltipContentProps extends React.ComponentProps<typeof Card> {
  config: ChartConfig
  showIndex?: boolean
  indicator?: "dot" | "dashed" | "line"
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  ({ config, showIndex = true, indicator = "dot", className, ...props }, ref) => {
    const { activePayload, activeLabel } = Tooltip.useTooltip() as unknown as TooltipProps

    if (!activePayload) return null

    const items = activePayload.map((item: any) => {
      const key = item.dataKey as keyof ChartConfig
      const chartItem = config[key]

      return {
        key,
        color: chartItem?.color,
        value: item.value,
        label: chartItem?.label || item.name,
      }
    })

    return (
      <Card ref={ref} className={cn("px-2 py-1 text-sm", className)} {...props}>
        <div className="grid gap-1.5">
          {showIndex && <p className="font-medium text-muted-foreground">{activeLabel}</p>}
          <div className="grid gap-1.5">
            {items.map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-x-4">
                <div className="flex items-center gap-x-2">
                  {indicator === "dot" && (
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  )}
                  {indicator === "dashed" && (
                    <div className="h-2 w-2 border-2 border-dashed" style={{ borderColor: item.color }} />
                  )}
                  {indicator === "line" && (
                    <div className="h-2 w-2 border-t-2 border-solid" style={{ borderColor: item.color }} />
                  )}
                  <p className="text-muted-foreground">{item.label}</p>
                </div>
                <p className="font-medium text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    )
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

interface ChartLegendProps extends React.ComponentProps<typeof Legend> {
  hideContent?: boolean
  customLegend?: React.ComponentType<any>
}

const ChartLegend = ({ hideContent = false, customLegend, children, ...props }: ChartLegendProps) => {
  const { config } = useChart()

  return (
    <Legend {...props}>
      {hideContent ? null : customLegend ? (
        React.createElement(customLegend, { config })
      ) : (
        <ChartLegendContent config={config} />
      )}
      {children}
    </Legend>
  )
}
ChartLegend.displayName = "ChartLegend"

interface ChartLegendContentProps extends React.ComponentProps<typeof ChartLegend> {
  config: ChartConfig
}

const ChartLegendContent = React.forwardRef<HTMLDivElement, ChartLegendContentProps>(
  ({ config, className, ...props }, ref) => {
    const { payload } = Legend.useLegend() as unknown as LegendProps

    if (!payload) return null

    return (
      <div ref={ref} className={cn("flex flex-wrap items-center justify-center gap-4", className)} {...props}>
        {payload.map((item: any) => {
          const key = item.dataKey as keyof ChartConfig
          const chartItem = config[key]

          return (
            <div key={item.value} className="flex items-center gap-x-1.5">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: chartItem?.color }} />
              <p className="text-sm text-muted-foreground">{chartItem?.label || item.value}</p>
            </div>
          )
        })}
      </div>
    )
  },
)
ChartLegendContent.displayName = "ChartLegendContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent }
