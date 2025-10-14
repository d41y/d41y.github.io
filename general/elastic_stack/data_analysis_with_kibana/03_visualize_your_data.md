- [Visualize Your Data](#visualize-your-data)

---

# Visualize Your Data

## Create Visualizations

### Lens Review

- Lens is the default editor for creating new visualizations
  - direct access from dashboards
  - most data types from Discover

### Lens Advantages

- Switch anytime
  - visualization type
  - data view
- Suggestions based on daty type
- Compare different data sources
- Combine multiple fields

 ### Fields List

 - Fields list
   - similar to Discover
   - search field names
   - filter by type
   - click to view top values
 - To add to Workspace
   - drag and drop field
   - click ```+```

### Visualization Type and Options

1. Visualization Type
   - Tabular
   - Bar
   - Goal and single value
   - Magnitude
   - Map
   - Proportion
2. Visual options and legend
3. Axis settings

### Layer Pane

- The layer pane lets you customize the data
  - generally defaults to count based on date or top values
  - limited switching of the visualization can be done as well
- Various visualization types have different field groups

### Add Multiple Layers

- Add layers with same or different Data Views
- Change visualization
  - options change based on type
- Can also clone layers

### Axis Settings

- For bar, line and area charts
- Functions / Formula
  - Aggregation / Grouping
  - Math on Aggregated data
- Display settings
  - Name
  - Value format
  - Series color
  - Axis side

### Quick Functions

- Use quick functions to apply aggregations to data
  - summarize your data as metrics, statistics, or other analytics
  - available functions depend on the selected field

### Suggestions

- Based on selected fields
- Automatically created
- Collapsible

### Contextual Configuration Options

- A change in one panel will impact the other panes
  - using a Suggestion updates the workspace and layers pane
  - changing the visualization type in the workspace changes the suggestions and layers pane
  - changes in the layers pane are immediately visible in the workspace
- Quick functions in the layers pane are driven by the data type

## Adjust Visualizations

### Visual Options

- For the line visualization type, you will have the option to draw a smooth curve

### Legend

- Options for the placement and look of your legend

### Left and Right Axis

- Adjust vertical axis bounds using left and right axis options
- Vertical axes can be separated and options can be applied separately

### Bottom Axis

- Change axes labels, tick labels, and tick label orientation

### Value Format

- Change the way the ticks values are displayed

### Time Shift

- If the horizontal axis uses a date type field, you can set a time shift factor to compare graphs over a fixed time interval

### Dashboard Options

- Change how visualizations are displayed on dashboards

### Annotations

- Annotations are used to call out significant changes and trends in your time-based visualizations
  - can also incorporate all of your global filter
- Specified by adding a layer to a visualization

### Creating Annotations

- Static annotation - directly specify
- Custom query - query usin KQL

### Reference Lines

- Specified by adding a layer to a visualization
- Three types:
  - **Static**: directly specify
  - **Quick function**: select the field and relevant quick function
  - **Formual**: create the custom mathematical formula to apply

### Using Quick Functions for Reference Lines

- Select the function and field to apply for the reference line

## Create Maps

### Maps

- Maps from geographical data
- Animate data
  - temporal + spatial
- Upload
  - GeoJSON
  - shape files

### Map Layers

- Maps start with a world Basemap layer
- Add multiple layers
  - from multiple sources
    - ES indices

### Plotting Data

- Plot individual documents or use aggregations

### Choropleth

- Uses Shading
  - to compare statistis
  - across geographic boundaries

### Boundaries Source

- Elastic Maps Service (_EMS_)
  - https://maps.elastic.co
  - Join field
    - format must match source
- ES indices

### Point to Point

- Data paths between the source and the destination
- Thicker / darker <=> more connections
- Use cases
  - network traffic
  - flight connections
  - import / export
  - pick-up / drop-off

### Settings & Style

- Layer settings
- Metrics
- Clusters
- Filtering
- Layer Style

### Managing Layers

- After a layer is created, it can be manipulated
  - "Fit to data" zoms the map
  - "Hide layer"
  - "Edit layer settings" to make changes
  - "Clone layer" makes a copy
  - "Remove layer"
- Can also organize layers into groups

### Synchronize Maps on a Dashboard

- Zoom or move in one map and all maps together