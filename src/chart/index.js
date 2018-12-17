import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import { ChartCanvas, Chart } from 'react-stockcharts'
import {
  BarSeries,
  AlternatingFillAreaSeries,
  CandlestickSeries,
  StraightLine,
} from 'react-stockcharts/lib/series'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates'
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { OHLCTooltip, SingleValueTooltip } from 'react-stockcharts/lib/tooltip'
import { ema, forceIndex } from 'react-stockcharts/lib/indicator'
import { fitWidth } from 'react-stockcharts/lib/helper'
import { last } from 'react-stockcharts/lib/utils'

const risingColor = '#6BA583'
const fallingColor = '#FF0000'

const japaneseCandlesHeight = 300
const valueHeight = 150

class CandleStickChartWithForceIndexIndicator extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['svg', 'hybrid']).isRequired,
  }

  static defaultProps = {
    type: 'svg',
  }

  render() {
    const { type, data: initialData, width, ratio } = this.props

    const fi = forceIndex()
      .merge((d, c) => { d.fi = c })
      .accessor(d => d.fi)

    const fiEMA13 = ema()
      .id(1)
      .options({ windowSize: 13, sourcePath: 'fi' })
      .merge((d, c) => {d.fiEMA13 = c})
      .accessor(d => d.fiEMA13)

    const calculatedData = fiEMA13(fi(initialData))
    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(d => d.date)
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(calculatedData)

    const start = xAccessor(last(data))
    const end = xAccessor(data[Math.max(0, data.length - 150)])
    const xExtents = [start, end]

    console.log('xScale', xScale())

    return (
      <ChartCanvas
        height={550}
        width={width}
        ratio={ratio}
        margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
        type={type}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
        zoomEvent={true}
      >
        <Chart
          id={1}
          height={japaneseCandlesHeight}
          yExtents={d => [d.high, d.low]}
          padding={{ top: 10, right: 0, bottom: 20, left: 0 }}
        >
          <YAxis axisAt="right" orient="right" ticks={5} />
          <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />
          <CandlestickSeries />
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={d => d.close}
            fill={d => d.close > d.open ? risingColor : fallingColor}
          />
          <OHLCTooltip origin={[-40, -10]} />
        </Chart>
        <Chart
          id={2}
          height={valueHeight}
          yExtents={d => d.volume}
          origin={(w, h) => [0, h - japaneseCandlesHeight - 50]}
        >
          <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")} />
          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format(".4s")}
          />
          <BarSeries
            yAccessor={d => d.volume}
            fill={(d) => d.close > d.open ? risingColor : fallingColor}
            opacity={0.5}
          />
        </Chart>
        <Chart
          id={3}
          height={100}
          yExtents={fiEMA13.accessor()}
          origin={(w, h) => [0, h - valueHeight - 50]}
          padding={{ top: 10, right: 0, bottom: 10, left: 0 }}
        >
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="right" orient="right" ticks={4} tickFormat={format(".2s")} />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".4s")}
          />
          <AlternatingFillAreaSeries
            baseAt={0}
            yAccessor={fiEMA13.accessor()}
          />
          <StraightLine yValue={0} />
          <SingleValueTooltip
            yAccessor={fiEMA13.accessor()}
            yLabel={`ForceIndex (${fiEMA13.options().windowSize})`}
            yDisplayFormat={format(".4s")}
            origin={[-40, 15]}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    )
  }
}

export default fitWidth(CandleStickChartWithForceIndexIndicator)
