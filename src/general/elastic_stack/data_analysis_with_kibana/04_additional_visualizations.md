# Additional Visualizations

## Text and Metrics

### Text on Dashboards

- Text can help you to
  - display values
  - describe visualizations
  - navigate to other dashboards
  - brand dashboards
  - add images
  - provide instructions

### Adding Text Panels

- Add Markdown text as a Text panel
  - on the dashboard, click the text icon
  - in the Markdown field, enter the markdown
  - click Update to see a preview

### Markdown Help

- Click "Help" to access GitHub Docs: https://docs.github.com/en/get-started/writing-on-github

### Metric

- Sometimes a simple view is the best way to display data
  - display a Primary metric
  - add an optional Secondary metric which can be useful for time shifts and other relevant information
  - for multiple metrics use "Break down" by field to arrange in a grid

### Displaying one Panel

- Display one numeric value
  - specify the Primary metric
  - use Quick functions for basic metrics
  - "Last value" shows the value of the last document in the data by date

### Adding a Secondary Metric

- Add a secondary metric
  - can be useful for time shifts or supplementary information

### Displaying Multiple Metrics

- Use "Break down" by field for multiple metrics arranged in a grid

### Supporting Visualization

- Add Line or Bar visualizations to the metric chart
  - defined by "Maximum value"
  - specified in "Primary metric" setting

### Partition Charts with Multiple Metrics

- Enable multiple metrics in layer settings
- Drag and Drop two or more fields to partition visualization
- Not a valid option for all chart types

## Tables

### Rows

- When you drag a string into the workspace Lens assumes you want to group your data according to the values of that string field
  - The string field defauls to "Rows"
  - The default metrics is "# Records"
  
### Groups and Subgroups

- Drag another string field and Lens will subdivide the groupings

### Pivot Table

- Use "Split metrics by" to pivot the table

### Metrics

- When you drag a numeric field into an empty Table workspace Lens will group by timestamp
  - The timestamp field defaults to "Rows"
  - The default metrics is "Median"

### Many Metrics

- Keep adding more numeric fields

### Summary Row

- You can add a summary row

### Color by Value

- Conditional coloring by cell or text

### Saved Search

- Save a search
- Add it to your dashboard from Visualization library

## Interactive Dashboards

### Visualizations Can Filter Data

- Visualizations on your dashboard are interactive

### Tables Can Filter Data

- Click a cell to create a filter
- Optionally enable filter on click

### More Filters

- Filter can also be created directly
  - "Add filter" under the query bar

### Controls Can Filter

- Interactive panes to filter and display only the data you want
- Three types of controls:
  - **Options List**: Dropdown menu with multiple options to select
  - **Range Slider**: Slider to filter the data within a specified range
  - **Time Slider**: view the data for a specific time range or playback the data by time

### Range Slider

- Select the field you want to create the filter on
- Customize the slider with Label and size

### Options List

- Allows for multiple selections in the dropdown

### Control Settings

- Multiple Settings available for the created controls:
  - **Label position**
  - **Validate user selection**: ignore actions that result in missing data
  - **Chain controls**: any selection in one control narrows the available options in the next control
  - **Delete all controls**

### Maps Can Filter Data

- Shapes for polygons
- Bounds for rectangles
- Distance for discs
- Time range with the time slider

### Drilldowns

- Drilldowns enable you to customize what happens when someone clicks on a value within the dashboard panel

### URL Drilldowns

- Create an external link using values from the filter

### Dashboard Drilldowns

- Or open a new window to a different dashboard with the filters already applied to it

### Discover Drilldowns

- Or open a new window to the Discover interface with the filter applied from the visualizations