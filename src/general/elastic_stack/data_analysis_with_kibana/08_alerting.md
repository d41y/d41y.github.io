- [Alerting](#alerting)
  - [Rules and Connectors](#rules-and-connectors)
    - [Alerting](#alerting-1)
    - [Anatomy or Rules](#anatomy-or-rules)
    - [Connectors](#connectors)
    - [Getting Started](#getting-started)
    - [Create a Rule](#create-a-rule)
    - [Set a Name](#set-a-name)
    - [Select a Rule Type](#select-a-rule-type)
    - [Define a Condition](#define-a-condition)
    - [Preview the Condition](#preview-the-condition)
    - [Add One or More Actions](#add-one-or-more-actions)
    - [Configure the Action and Connector](#configure-the-action-and-connector)
    - [Managing your Rules](#managing-your-rules)
    - [Managing your Connectors](#managing-your-connectors)
    - [Watcher](#watcher)
  - [Creating In-App Alers](#creating-in-app-alers)
    - [Integrations with Kibana Apps](#integrations-with-kibana-apps)
    - [Alerting in Discover](#alerting-in-discover)
    - [Alerting in Maps](#alerting-in-maps)
    - [Tracking Containment Requirements](#tracking-containment-requirements)
    - [Defining an Action](#defining-an-action)
    - [Alerting in ML](#alerting-in-ml)
    - [Creating Anomaly Detection Alert](#creating-anomaly-detection-alert)
    - [Creating Anomaly Detection Alert](#creating-anomaly-detection-alert-1)
  - [Managing Alerts](#managing-alerts)
    - [Central View](#central-view)
    - [Managing a Rule](#managing-a-rule)
    - [Drill-Down to Rule Details](#drill-down-to-rule-details)
    - [Which Status a Rule can have?](#which-status-a-rule-can-have)
    - [Rule History](#rule-history)
    - [Snooze a Rule](#snooze-a-rule)
    - [Maintenance Windows](#maintenance-windows)
    - [Troubleshooting](#troubleshooting)
    - [Limitations](#limitations)

---

# Alerting

## Rules and Connectors

### Alerting

- Define rules
  - detect complex conditions
  - trigger actions with built-in connectors
- Integrated with
  - Observability
  - Security
  - Maps
  - Machine Learning

### Anatomy or Rules

- Alerting works by running checks on a schedule to detect conditions defined by a rule
- When a conditio is met, the rule tracks it as an alert and responds by triggering one or more actions
- Actions typically involve interaction with Kibana services or third party integrations


### Connectors

- Actions often involve connecting with services inside Kibana or integrating with third-party systems
- Connectors provide a central place to store connection information for services and integrations

### Getting Started

- Create generic rules through the Alerts and Insights section
- More specific rules must be created within the context of a Kibana app

### Create a Rule

- Click "Create rule" to start creating one alerting rule

### Set a Name

- Set a name and optionally set a tag

### Select a Rule Type

- Depending upon the context, you might be prompted to choose the type of rule to create
- Some apps will pre-select the type of rule for you

### Define a Condition

- Each rule type provides its own way of defining the conditions
- An expression formed by a series of clauses is a common pattern

### Preview the Condition

- Define how often to evaluate the condition

### Add One or More Actions

- To receive notifications when a rule meets the defined conditions, you must add one or more actions
- Extend your alerts by connecting them to actions that use built-in integrations
- Each action must specify a connector
- If no connector exists, create one

### Configure the Action and Connector

- Each action type exposes different properties
- For example, an email action allows you to set the recipients, the subject, and a message body in markdown format
- After you configure your actions you can save the rule

### Managing your Rules

- After your rules are created you can manage them through Kibana

### Managing your Connectors

- You can also manage the connectors available for creating new rules

### Watcher

- Can also be used to detect conditions and trigger actions in response
- It's a different alerting system though
- The scheduled checks for Watcher are run on ES instead on Kibana
- https://www.elastic.co/guide/en/kibana/current/alerting-getting-started.html#alerting-concepts-differences

## Creating In-App Alers

### Integrations with Kibana Apps

- Alerting allows rich integrations across various Kibana apps
  - Discover
  - Maps
  - Machine Learning
  - Observability
  - Security
  - and more

### Alerting in Discover

- Create a rule to periodically check when data goes above or below a certain threshold within a given time interval
- Ensure that your data view, query, and filters fetch the data for which you want an alert
- The form is pre-filled with the query present in the query bar

### Alerting in Maps

- Maps offers the Tracking containment rule type
- It runs an ES query over indices
- The point is to determine whether any documents are currently contained within any boundaries from the specified boundary index

### Tracking Containment Requirements

- Tracks index or data view
- Boundaries index or data view

### Defining an Action

- Conditions for how a rule is tracked can be specified uniquely for each individual action

### Alerting in ML

- Kibana alerting features include support for ML rules

### Creating Anomaly Detection Alert

- Create alert rules from any anomaly detection jobs

### Creating Anomaly Detection Alert

- Set general rule details
- Select result type and severity level
  - Bucket
  - Record
  - Influencer

## Managing Alerts

### Central View

- The Stack Management > Rules UI provides a cross-app view of alerting
- It's a central place to
  - create and edit rules
  - manage rules
  - drill-down to rule details
  - configure settings that apply to all rules in the space

### Managing a Rule

- The rule listing enabled you to quickly disable, enable and delete individual rules

### Drill-Down to Rule Details

- Select one specific rule from the list to check its details
- For example, you might want to check the status of the rule

### Which Status a Rule can have?

- **Active**: The conditions for the rule have been met, and the associated actions should be invoked
- **OK**: The conditions for the rule have not been met, and the associated actions are not invoked
- **Error**: An error was encountered by the rule
- **Pending**: The rule has not yet run. The rule was either just created, or enabled after being disabled
- **Unknown**: A problem occured when calculating the status. Most likely, something went wrong with the alerting code

### Rule History

- You can also check the history of the rule

### Snooze a Rule

- Accessing one specific rule also allows you to snooze it
- When you snooze a rule, the rule checks continue to run on a schedule, but the alert will not trigger any actions
- You can either snooze for specified period of time or indefinitely 

### Maintenance Windows

- You can schedule single or recurring maintenance windows to temporarily reduce rule notifications

### Troubleshooting

- Test the connectors and rules
- Check the Kibana logs
- Use Task Manager diagnostics
- Use REST APIs
- Look for error banners
- https://www.elastic.co/guide/en/kibana/current/alerting-troubleshooting.html

### Limitations

- Known limitations until Kibana version 8.8
- Alerts are not visible in Stack Management > Rules
  - when you create a rule in Observability or Elastic Security apps
- You can view them only in the Kibana app where you created the rule