# Search Your Data

## Discover and Data Visualizer

### Documents

- In the ES Stack, data is stored in ES indices
- ES is a document store
- it stores data as JSON objects, called documents
- Kibana data view specifies which ES data you want to access

### Fields and Values

- Documents have fields
- Ever field:
  - can have 0 or more values
  - has a data type

### ES Data Types

- Numeric
  - Long
  - Double
- Text
- Keyword
- Date
  - Date
  - Date nanos
- Boolean
- Geo Types
- IP
- Range
  - Date
  - IP
  - Numeric
- ...

### Text vs. Keyword

- Strings can be indexed as both types
- Sometimes it is useful to have both types

| Text | Keyword |
| ---- | ------- |
| Analyzed | Left as-is |
| Full text search | Filtering, Sorting, Grouping |
| email body, product description, etc. | IDs, email, hostnames, zip codes, tags, etc. |

### Data Visualizer

- Understand your data
  - fields and associated data types
  - range
  - distribution
- Input
  - data view or saved search
  - file
- Filter for fields
  - by Name
  - by Type
- View Statistics
  - Document
  - Fields
  - Values Distribution

### Discover

- Explore and query data
  - search and filter the data
  - specify the time range
  - get information about the structure of the fields
- Create tables that summarize the contents of the data
- Customize and present your findings in a visualization on a dashboard
- Input
  - data view

### Context: time and data view

- No results?
- Always check the time filter and data view
  - The combination of these is your context

### Working with Fields

- Filter for field
  - by name
  - by type
- View top values
- Field areas
  - **Selected Fields**: fields added to document table
  - **Popular Fields**: commonly used fields
  - **Available Fields**: all fields
  - **Empty Fields**: fields that have no data in the seleced time range
  - **Meta Fields**: fields that contain metadata

### Document Table

- To create columns in the document table
  - drag and drop fileds from the fields list
  - click the ```+``` next to the field

### Organize the Table

- Organize table columns
  - move
  - resize
  - copy
  - sort
  - edit
- Set display settings

### Document Table

- Expand for details
- View as
  - Table
  - JSON
- Single document
- Surrounding documents

### Interactive Histogram

- The time filter can be visually changed by:
  - click and dragging across the histogram
  - clicking on a single bar

## KQL and Filters

### Search Recap

- A search is executed by sending a query to ES
  - a query can answer many different types of questions
- In Kibana, a search can be executed using KQL, the Kibana Query Language

### Query Context

- Search result quality depends on the quality of query
  - crafting a good question gets good results
- Establish context
  - Data view
  - Time range
- Define Query

### Better Queries, Better Results

- Your search returns a lot of results
  - But not the exact results
- By default, the query logic is going to look in all fields, and for any values, leading to results

### Queries Precision

- Free Text Search
  - Matched by all fields by default
  - Inefficient
  - Imprecise results
- Field Specific Search
  - Only fields specified will be matched
  - More efficient
  - Will yield precise results
  - Can take advantage of KQL suggestions

### Boolean Operators

- and, or, not
- and takes precedance over or
- Group operators and terms using parantheses

### KQL Suggestions

- KQL auto-suggests
  - field names
  - values
  - operators
  - previously used queries

### Wildcard Query

- Wildcard * used to
  - search by a term prefix
  - search multiple fields

### Range Query

- For numeric and data types
  - >, >=, < and <= are supported
  - data math expressions are supported

### Query Bar Limitations

Example:

```
customer_full_name : "Selena Banks"
taxful_total_price >= 50
geoip.city_name : Los Angeles
category : Women's Shoes
```

- You may want to use different combinations of these clauses
- With the query bar, you will have to do a lot of typing and deleting
- Filters are sticky queries
  - individual query clauses that can be turned on and off

### Define a Filter

- There are two ways to define a filter from Discover
  - ```Add filter (+)``` link will open a dialog
  - ```+``` or ```-``` symbol on any list creates a filter for that value

### Define Complex Filters

- Create and apply multiple filters simultaneously
  - use for nested queries
  - select logical OR and AND operators

### Filter Operations

- Once defined, a filter can be:
  - pinned
  - edited
  - negated
  - disabled
  - deleted
- Filters can be collectively managed

### Editing Filters

- Internally filter are transformed into a query
- You can change the filter by editing the query
- You can add a custom label to the filter to quickly identify it

### Filter and Query Bar

- You can use filters and KQL together
  - use KQL for broad search
  - use filter to zero in on subset
    - enable, include, exclude as needed

### Break down Histogram by Value

- Break down fields by value
- Creates a filter in the filter list
- Click on a bar section to select filters

### Saved Searches

- Reuse of search in Discover
- Add search results to dashboard
- Use a source for visualization
- Stores
  - query text
  - filter
  - time
  - Discover view
    - data view
    - columns selected
    - sort order

### Saved Queries

- Reuse queries anywhere a query bar is present
- Saves
  - query text
  - filters (_optional_)
  - time range (_optional_)

### Saved Query vs. Saved Search

| Saved Search | Saved Query |
| ------------ | ----------- |
| Includes Discover view 1) columns in document table, 2) sort order, 3) data view | Discover view is not included |
| Can be added as a panel to a dashboard | Can be loaded where a query bar is present including dashboard |
| Can store KQL queries, filters, time filter, and refresh interval | Can store KQL queries, filters and time filter |
| Can be shared (_copied_) between spaces | Can be shared (_copied_) between spaces |

## Field Focus

### Visualization Basics

- Visualize straight from fields list
  - Lens
    - explore suggestions
    - change visualization type
    - change layer settings
    - and more ...
  - maps for Geo data
- Save to panels on the dashboard
- Use filters in the dashboard
- Change time filter interactively

### The Shortest Path to Visualization

- Visualizations can be created directly from Discover or Data Visualizer
- Select a field, and click ```Visualize``` or icon
  - geo point fields will open in Maps
  - all other field types will open in Lens

### Focus with Lens

- You will use Lens to focus on a single field (e.g. geoip.city_name)
- If you visualize this field, you are presented with this view:
  - Vertical bar chart
  - Simple count of records
  - Split by city name
  - Sorted descending
  - Top 5 shown
  - With an "Other"

### Change the Visual

- Bar charts are nice, but sometimes it helps to see a proportion
- Change the view to a Donut

### Change the Values

- Maybe you don't want Other, or want more than 5 cities
- In the layer pane, click ```Slice by``` to adjust the slices

### Get Suggestions

- Everyone loves donuts, but maybe a tree map looks better
- See a preview in the Suggestions panel
- Select the view that works best for you

### Map your Data

- Visualize a geo point field to open the Map editor

### Using Visualizations

- Visualizations can be saved
  - and automatically added to a dashboard
- Lens and Maps visualizations can create filters
  - filter can be pinned and used in Discover
- Click and drag in time based visualizations to change the time filter
  - just like the Discover histogram