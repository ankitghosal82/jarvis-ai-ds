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

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Define types for common chart props
interface BaseChartProps {
  data: Record<string, any>[]
  categories: string[]
  index: string
  chartConfig: ChartConfig
  className?: string
  title?: string
  description?: string
}

interface LineChartProps extends BaseChartProps {
  type: "line"
}

interface BarChartProps extends BaseChartProps {
  type: "bar"
}

interface AreaChartProps extends BaseChartProps {
  type: "area"
}

type ChartProps = LineChartProps | BarChartProps | AreaChartProps

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ type, data, categories, index, chartConfig, className, title, description, ...props }, ref) => {
    const renderChart = () => {
      switch (type) {
        case "line":
          return (
            <LineChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={index}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              {categories.map((category) => (
                <Line key={category} dataKey={category} stroke={chartConfig[category]?.color} dot={false} />
              ))}
            </LineChart>
          )
        case "bar":
          return (
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={index}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              {categories.map((category) => (
                <Bar key={category} dataKey={category} fill={chartConfig[category]?.color} />
              ))}
            </BarChart>
          )
        case "area":
          return (
            <AreaChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={index}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              {categories.map((category) => (
                <Area
                  key={category}
                  dataKey={category}
                  fill={chartConfig[category]?.color}
                  stroke={chartConfig[category]?.color}
                />
              ))}
            </AreaChart>
          )
        default:
          return null
      }
    }

    return (
      <Card ref={ref} className={className} {...props}>
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height={300}>
              {renderChart()}
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    )
  },
)

Chart.displayName = "Chart"

export { Chart }
