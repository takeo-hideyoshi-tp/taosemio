import React from "react"
import DocumentComponent from "../layout/DocumentComponent"
import DotPlotRaw from "./DotPlotRaw"

const components = []

components.push({
  name: "DotPlot"
})

export default class DotPlotDocs extends React.Component {
  render() {
    const examples = []
    examples.push({
      name: "Basic",
      demo: DotPlotRaw,
      source: `
    const colors = {
      "y1990": '#00a2ce',
      "y2013": '#4d430c'
    }

    const dotRadius = 8

    const baseData = [
      { region: "Developed regions", y1990: 7.6, y2013: 3.4 },
      { region: "Developing regions", y1990: 36.4, y2013: 22 },
      { region: "Northern Africa", y1990: 30, y2013: 13.3 },
      { region: "Sub-Saharan Africa", y1990: 45.5, y2013: 31.1 },
      { region: "Latin America and the Caribbean", y1990: 22.1, y2013: 9.2 },
      { region: "Caucasus and Central Asia", y1990: 25.7, y2013: 14.8 },
      { region: "Eastern Asia", y1990: 24.5, y2013: 7.7 },
      { region: "Eastern Asia excluding China", y1990: 11.6, y2013: 7.5 },
      { region: "Southern Asia", y1990: 50.6, y2013: 29.5 },
      { region: "Southern Asia excluding India", y1990: 49.3, y2013: 30.1 },
      { region: "South-eastern Asia", y1990: 27.4, y2013: 14.4 },
      { region: "Western Asia", y1990: 27.5, y2013: 13.7 },
      { region: "Oceania", y1990: 26.3, y2013: 21.3 },
      { region: "World", y1990: 33.3, y2013: 20}
    ]

    const data = [ 
      ...baseData.map(d => ({ region: d.region, type: "y1990", value: d.y1990 })),
      ...baseData.map(d => ({ region: d.region, type: "y2013", value: d.y2013 }))
      ]

    const lineAnnotations = baseData.map(d => Object.assign({ type: "range" }, d))

    function drawRange({ d, rScale, orFrameState }) {
      if (d.type === "range") {
        const start = rScale(d.y1990) - dotRadius
        const end = rScale(d.y2013) + dotRadius
        const y = orFrameState.projectedColumns[d.region].middle
        return <line
          x1={start}
          x2={end}
          y1={y}
          y2={y}
          style={{ stroke: "black", strokeWidth: 2 }}
        />
      }
      return null
    }

    <ORFrame
      title={"Neonatal Mortality Rate by Region"}
      size={[ 700,500 ]}
      data={data}
      rAccessor={d => d.value}
      oAccessor={d => d.region}
      style={(d,i) => ({ fill: colors[d.type], stroke: "white", strokeWidth: 1 })}
      type={{ type: "point", r: dotRadius }}
      projection={"horizontal"}
      axis={{ orient: 'bottom', tickFormat: d => ${"`${d}%`"} }}
      margin={{ left: 205, top: 50, bottom: 40, right: 10 }}
      oPadding={10}
      svgAnnotationRules={drawRange}
      annotations={lineAnnotations}
      oLabel={d => <text style={{ textAnchor: "end" }} transform="translate(0,6)">{d}</text>}
    />
      `
    })

    return (
      <DocumentComponent
        name="Dot Plot"
        components={components}
        examples={examples}
        buttons={[]}
      >
        <p>
          The Dot Plot compares changes between two values across categories.
          The initial data array needs to be turned into an array of points at
          the start and end, which can then be connected with a custom
          annotation rule.
        </p>
        <p>
          Because annotations are drawn on top of the visualization layer, we
          need to account for the size of each dot in where we draw the lines so
          they don't overlap. We also adjust the labels a bit so they line up
          with the dots.
        </p>
      </DocumentComponent>
    )
  }
}

DotPlotDocs.title = "Dot Plot"
