import React, { useRef } from "react";
import Plotly from "react-plotly.js";
import { LayoutAxis } from "plotly.js";
import { useColorScheme } from '@mui/joy/styles';
import { PlotSettings, Spectrum } from "../constants";
import { addSubscriptsToMolecule } from "../modules/molecule-subscripts";
import { Species } from "./types";
export interface PlotProps {
  spectra: Spectrum[];
  plotSettings: PlotSettings;
}

const plotColors = [
  "#f50057",
  "#3f51b5",
  "#00bcd4",
  "#ffeb3b",
  "#ff9800",
  "#9c27b0",
  "#2196f3",
  "#009688",
  "#ff5722",
  "#795548",
  "#607d8b",
  "#e91e63",
  "#673ab7",
];
let waveLabel: string; //plot label for x-axis
export const Plot_: React.FC<PlotProps> = ({
  spectra,
  plotSettings: { mode, units },
}) => {
  const { mode: colorMode } = useColorScheme();
  const plotRef = useRef<Plotly.PlotlyHTMLElement>(null);
  const previousXRangeRef = useRef<[number, number] | null>(null);
  const isRevertingRef = useRef<boolean>(false);
  let modeLabel = "";
  if (mode === "absorbance") {
    modeLabel = "Absorbance";
  } else if (mode.startsWith("transmittance")) {
    modeLabel = "Transmittance";
  } else if (mode.startsWith("radiance")) {
    modeLabel = "Radiance";
  }

  const yaxis: Partial<LayoutAxis> = {
    title: {
      text: `${modeLabel}${units.length ? " (" + units + ")" : ""}`,
    },
    type: "linear",
    autorange: true,
    fixedrange: false,
  };

  const darkMode = colorMode === "dark";

  //buttons to switch between log scale and linear scale
  const updatemenus = [
    {
      type: "buttons",
      x: 0,
      y: -0.37,
      xanchor: "left",
      yanchor: "top",
      pad: { r: 10, t: 10 },
      direction: "left",
      showactive: true,
      bgcolor: darkMode ? "#333" : "#eee",
      bordercolor: darkMode ? "#555" : "#ccc",
      borderwidth: 1,
      font: {
        color: darkMode ? "#fff" : "#000",
      },

      buttons: [
        {
          label: "Linear Scale",
          //passing title to every scale
          args: [
            {
              yaxis: {
                ...yaxis,
                type: "linear",
              },
            },
          ],
          method: "relayout",
        },
        {
          label: "Log Scale",
          args: [
            {
              yaxis: {
                ...yaxis,
                type: "log",
              },
            },
          ],
          method: "relayout",
        },
      ],
    },
  ];

  const formatSpectrumName = ({
    database,
    tgas,
    trot,
    tvib,
    pressure,
    species,
    pressure_units,
    wavelength_units,
    label,
  }: {
    database: string;
    tgas: number;
    trot?: number;
    tvib?: number;
    label?: string;
    pressure: number;
    pressure_units: string;
    wavelength_units: string;
    species: Species[];
  }) => {
    if (wavelength_units === "u.nm") {
      waveLabel = "Wavelength (nm)";
    } else {
      waveLabel = "Wavelength (cm⁻¹)";
    }
    const speciesFormatted = species
      .map(
        ({ molecule, mole_fraction }) =>
          `${addSubscriptsToMolecule(molecule)} (X=${mole_fraction})`
      )
      .join(", ");
    if (pressure_units === "cds.atm") {
      pressure_units = "atm";
    } else {
      pressure_units = pressure_units.substring(2);
    }
    let formatted = `${speciesFormatted} ${database.toUpperCase()}, Pressure=${pressure} ${pressure_units}, Tgas=${tgas} K`;
    if (trot) {
      formatted += `, Trot=${trot} K, Tvib=${tvib} K`;
    }
    if (label) {
      formatted = `${label} - ${formatted}`;
    }
    return formatted;
  };
  const generateFileName = (spectra: Spectrum[]) =>
    `${spectra
      .map(s => `${s.species.map(specie => specie.molecule).join("_")}_${s.database}`)
      .join("_")}`;

  const isMobile = typeof window !== "undefined" && /iPhone|Android|Mobile|iPad|iPod/i.test(navigator.userAgent);
  const plotWidth = isMobile ? 650 : 1050;
  const plotHeight = isMobile ? 450 : 650;

  return (
    <div style={{ overflowX: 'auto' }}>
      <style>
        {`
        .js-plotly-plot .updatemenu-button rect {
          fill: ${darkMode ? "#333" : "#eee"} !important;
        }
        .js-plotly-plot .updatemenu-button rect[style*="rgb(244, 250, 255)"] {
          fill: ${darkMode ? "#555" : "#ddd"} !important;
        }
        .js-plotly-plot .updatemenu-button text {
          fill: ${darkMode ? "#fff" : "#000"} !important;
        }
      `}
      </style>
      <Plotly
        className="Plot"
        data={spectra.map(
          (
            {
              x,
              y,
              species,
              database,
              tgas,
              trot,
              tvib,
              pressure,
              pressure_units,
              wavelength_units,
              label,
            },
            index
          ) => ({
            x,
            y,
            type: "scatter",
            marker: { color: plotColors[index % plotColors.length] },
            name: formatSpectrumName({
              database,
              species,
              tgas,
              trot,
              tvib,
              pressure,
              pressure_units,
              wavelength_units,
              label,
            }),
          })
        )}
        layout={{
          width: plotWidth,
          height: plotHeight,
          title: spectra.length === 1 ? "Spectrum" : "Spectra",
          font: { family: "Roboto", color: darkMode ? "#fff" : "#000" },
          plot_bgcolor: darkMode ? "#121212" : "#fff",
          paper_bgcolor: darkMode ? "#121212" : "#fff",
          xaxis: {
            autorange: true,
            title: { text: waveLabel },
            color: darkMode ? "#fff" : "#000",
            gridcolor: darkMode ? "#444" : "#ccc",
            rangeslider: {
              // TODO: Update typing in DefinitelyTyped
              // @ts-ignore
              autorange: true,
              // @ts-ignore
              yaxis: { rangemode: "auto" },
            },
            type: "linear",
          },
          yaxis: {
            ...yaxis,
            color: darkMode ? "#fff" : "#000",
            gridcolor: darkMode ? "#444" : "#ccc",
          },
          updatemenus,
          showlegend: true,
          legend: { orientation: "h", y: -0.6, x: 0 },
          margin: { l: 90, r: 10 },
        }}
        config={{
          toImageButtonOptions: {
            filename: generateFileName(spectra),
          },
          modeBarButtonsToRemove: [
            'select2d',
            'lasso2d',
            'autoScale2d',
            'hoverClosestCartesian',
            'hoverCompareCartesian',
          ],
          // Disable horizontal span zoom by removing zoom buttons that could trigger it
          // and ensure only box zoom and vertical span are available
        }}
        onRelayout={(event) => {
          // Skip handling if we're programmatically reverting a zoom to prevent infinite loops
          if (isRevertingRef.current) {
            isRevertingRef.current = false;
            return;
          }

          // Prevent horizontal-only zoom by detecting when only x-axis range changes
          // without a corresponding y-axis range change
          if (event['xaxis.range[0]'] !== undefined && event['xaxis.range[1]'] !== undefined) {
            // Check if y-axis range was NOT changed (indicating horizontal-only zoom)
            if (event['yaxis.range[0]'] === undefined && event['yaxis.range[1]'] === undefined) {
              // This is a horizontal-only zoom - revert it
              isRevertingRef.current = true;
              if (plotRef.current && previousXRangeRef.current) {
                Plotly.relayout(plotRef.current, {
                  'xaxis.range': previousXRangeRef.current,
                  'xaxis.autorange': false,
                });
              } else if (plotRef.current) {
                // If we don't have a previous range, reset to autorange
                Plotly.relayout(plotRef.current, {
                  'xaxis.autorange': true,
                });
              }
              return;
            }
            // Store the x-axis range if both axes changed (box zoom) or only y changed (vertical zoom)
            previousXRangeRef.current = [
              event['xaxis.range[0]'] as number,
              event['xaxis.range[1]'] as number,
            ];
          } else if (event['yaxis.range[0]'] !== undefined && event['yaxis.range[1]'] !== undefined) {
            // Vertical-only zoom is allowed - just store the current x range if available
            if (plotRef.current) {
              const currentLayout = (plotRef.current as any).layout;
              if (currentLayout?.xaxis?.range) {
                previousXRangeRef.current = currentLayout.xaxis.range;
              }
            }
          } else if (event['xaxis.autorange'] === true) {
            // Autorange reset - clear stored range
            previousXRangeRef.current = null;
          }
        }}
        onInitialized={(figure, graphDiv) => {
          plotRef.current = graphDiv as Plotly.PlotlyHTMLElement;
        }}
        onUpdate={(figure, graphDiv) => {
          plotRef.current = graphDiv as Plotly.PlotlyHTMLElement;
        }}
      />
    </div>
  );
};

export const Plot = React.memo(Plot_);