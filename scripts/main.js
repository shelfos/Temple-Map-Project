require([
  "esri/Map",
  "esri/layers/GeoJSONLayer",
  "esri/views/MapView",
  "esri/widgets/TimeSlider",
  "esri/widgets/Expand",
  "esri/widgets/Legend",
  "esri/core/reactiveUtils"
], (Map, GeoJSONLayer, MapView, TimeSlider, Expand, Legend, reactiveUtils) => {
  let layerView

  //Use local file - no APIs exist with temple data that I'm aware of
  const url = "./scripts/temples.geojson";

  //Template for the popup window when clicking on a marker
  const template = {
    title: "{name}",
    content: "<div><a href=\"{url}\"><img src=\"{img}\"></a></div><div><b>Address:</b><br>{address}</div>",
    fieldInfos: [
      {
        fieldName: 'date',
        format: {
          dateFormat: 'short-date-short-time'
        }
      }
    ]
  };

  //Renderer for managing temple markers
  const renderer = {
    type: "unique-value",
    field: "status",
    symbol: {
      type: "simple-marker",
      outline: {
        color: "black"
      },
      size: "8px"
    },
    uniqueValueInfos: [
      {
        value: "0",
        label: "Historical",
        symbol: {
          type: "simple-marker",
          color: "grey",
          size: "8px",
          outline: {
            color: "black"
          }
        }
      },
      {
        value: "1",
        label: "Announced",
        symbol: {
          type: "simple-marker",
          color: "yellow",
          size: "8px",
          outline: {
            color: "black"
          }
        }
      },
      {
        value: "2",
        label: "Under Construction",
        symbol: {
          type: "simple-marker",
          color: "red",
          size: "8px",
          outline: {
            color: "black"
          }
        }
      },
      {
        value: "3",
        label: "Dedicated",
        symbol: {
          type: "simple-marker",
          color: "blue",
          size: "8px",
          outline: {
            color: "black"
          }
        }
      }

    ]
  };

  //GeoJSONLayer with template and renderer
  const geojsonLayer = new GeoJSONLayer({
    url: url,
    title: "Temple Status",
    copyright: "Sheldon Foster",
    popupTemplate: template,
    renderer: renderer,
    orderBy: {
      field: "status"
    },
    timeInfo: {
      startField: "date",
      interval: {
        unit: "months",
        value: 1
      },
      fullTimeExtent: {
        start: new Date(1845, 0, 1),
        end: new Date(2025, 3, 1)      
      },
    }
  });

  //Map configuration with basemap and layer information
  const map = new Map({
    basemap: "arcgis/modern-antique",
    layers: [geojsonLayer],
    referenceScale: 250000
  });

  //Map initialization information
  const view = new MapView({
    container: "worldMap",
    center: [360, 10],
    zoom: 3.15,
    map: map
  });

  //Time Slider setup
  const timeSlider = new TimeSlider({
    container: "timeSlider",
    mode: "cumulative-from-start",
    fullTimeExtent: {
      start: new Date(1845, 0, 1),
      end: new Date(2025, 3, 1)      
    },
    timeExtent: { // location of timeSlider thumbs
      start: null,
      end: new Date(2025, 3, 1)
    },
    playRate: 20,
    stops: {
      interval: {
        value: 1,
        unit: "months"
      }
    }
  });
  view.ui.add(timeSlider, "bottom-left");


  // wait until the layer view is loaded
  let timeLayerView;
  view.whenLayerView(geojsonLayer).then((layerView) => {
    timeLayerView = layerView;
  });

  reactiveUtils.watch(
    () => timeSlider.timeExtent,
    (value) => {
      // update layer view filter to reflect current timeExtent
      timeLayerView.filter = {
        timeExtent: value
      };
    }
  );

  //Add legend to the top right and make it expandable
  const legend = new Legend({
    view: view
  });
  
  view.ui.add(
    new Expand({
      view: view,
      content: legend,
      expanded: true
    }),
    "top-right"
  );

});