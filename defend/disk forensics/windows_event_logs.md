- [Windows Event Logs](#windows-event-logs)
  - [Intro](#intro)
    - [Anatomy of an Event Log](#anatomy-of-an-event-log)
    - [Leveraging Custom XML Queries](#leveraging-custom-xml-queries)
    - [Useful Windows Event Logs](#useful-windows-event-logs)

---

# Windows Event Logs

... are an intrinsic part of the Windows OS, storing logs from different components of the system including the system itself, apps running on it, ETW providers, services, and others.

Windows event logging offers comprehensive logging capabilities for application errors, security events, and diagnostic information. As cybersecurity professionals, you leverage these logs extensively for analysis and intrusion detection.

The logs are categorized into different event logs, such as "Application", "System", "Security", and others, to organize events based on their source or purpose.

Event logs can be accesses using the Event Viewer application or programmatically using APIs such as the Windows Event Log API.

Accessing the Windows Event Viewer as an administrative user allows you to explore the various log files available.

![windows event logs 1](../../images/windows_event_logs1.png)

![windows event logs 2](../../images/windows_event_logs2.png)

The default Windows event logs consist of Application, Security, Setup, and Forwarded Events. While the first four logs cover application errors, security events, system setup activities, and general information, the "Forwarded Events" section is unique, showcasing event log data forwarded from other machines. This central logging feature proves valuable for system admins who desire a consolidated view. In your current analysis, you focus on event logs from a single machine.

It should be noted, that the Windows Event Viewer has the ability to open and display previously saved ```.evtx``` files, which can be then found in the "Saved Logs" section.

![windows event logs 3](../../images/windows_event_logs3.png)

## Intro

### Anatomy of an Event Log

When examining Application logs, you encounter two distinct levels of events: information and error.

![windows event logs 4](../../images/windows_event_logs4.png)

Information events provide general usage details about the application, such as its start or stop events. Conversely, error events highlight specific errors and often offer detailed insights into the encountered issues.

![windows event logs 5](../../images/windows_event_logs5.png)


Each entry in the Windows Event Log is an "Event" and contains the following primary components:

1. **Log Name**: The name of the event log.
2. **Source**: The software that logged the event.
3. **Event ID**: A unique identifier for the event.
4. **Task Category**: This often contains a value or name that can help you understand the purpose or use of the event.
5. **Level**: The severity of the event.
6. **Keywords**: Keywords are flags that allow you to categorize events in ways beyond the other classification options. These are generally broad categories, such as "Audit Success" or "Audit Failure" in the Security log.
7. **User**: The user account that was logged on when the event occured.
8. **OpCode**: This field can identify the specific operation that the event reports.
9. **Logged**: The date and time when the event was logged.
10. **Computer**: The name of the computer where the event occured.
11. **XML Data**: All the above information is also included in an XML format along with additional event data.

The Keywords field is particularly useful when filtering event logs for specific types of events. It can significantly enhance the precision of search queries allowing you to specify events of interest, thus making log management more efficient and effective.

Taking a closer look at the event log above, you can observe several crucial elements. The Event ID in the top left corner serves as a unique identifier, which can be further researched on Microsoft's website to gather additional information. The "SideBySide" label next to the event ID represents the event source. Below, you find the general error description, often containing rich details. By clicking on the details, you can further analyze the event's impact using XML or a well-formatted view.

![windows event logs 6](../../images/windows_event_logs6.png)

Additionally, you can extract supplementary information from the event log, such as the process ID where the error occured, enabling more precise analysis.

![windows event logs 7](../../images/windows_event_logs7.png)

Switching your focus to security logs, consider event ID 4624, a commonly occuring event.

![windows event logs 8](../../images/windows_event_logs8.png)

According to Microsoft's documentation, this event signifies the creation of a logon session on the destination machine, originating from the accessed computer where the session was established. Within this log, you find crucial details, including the "Logon ID", which allows you to correlate this logon with other events sharing the same "Logon ID". Another important detail is the "Logon Type", indicating the type of logon. In this case, it specifies a Service logon type, suggesting that "SYSTEM" initiated a new service. However, further investigation is required to determine the specific service involved, utilizing correlation techniques with additional data like the "Logon ID".

### Leveraging Custom XML Queries

To streamline your analysis, you can create custom XML queries to identify related events using the "Logon ID" as a starting point. By navigating to "Filter Current Log" -> "XML" -> "Edit Query Manually", you gain access to a custom XML query language that enables more granular log searches.

![windows event logs 9](../../images/windows_event_logs9.png)

In the example query, you focus on events containing the "SubjectLogonId" field with a value of "0x3E7". The selection of this value stems from the need to correlate events associated with a specific "Logon ID" and understand the relevant details within those events.

![windows event logs 10](../../images/windows_event_logs10.png)

It is worth noting that if assistance is required in crafting the query, automatic filters can be enabled, allowing exploration of their impact on the XML representation. For further guidance, Microsoft offers informative articles on [advanced XML filtering in the Windows Event Manager](https://techcommunity.microsoft.com/t5/ask-the-directory-services-team/advanced-xml-filtering-in-the-windows-event-viewer/ba-p/399761).

By constructing such queries, you can narrow down your focus to the account responsible for initiating the service and eliminate unnecessary details. This approach helps unveil a clearer picture of recent logon activities associated with the specified Logon ID. However, even with this refinement, the amount of data remains significant.

Delving into the log details progressively reveals a narrative. For instance, the analysis begins with Event ID 4907, which signifies an audit policy change.

![windows event logs 11](../../images/windows_event_logs11.png)

Within the event description, you find valuable insights, such as "This event generates when the SACL of an object was changed".

Based on this information, it becomes apparent that the permissions of a file were altered to modify the logging or auditing of access attempts. Further exploration of the event details reveals additional intriguing aspects.

![windows event logs 12](../../images/windows_event_logs12.png)

For example, the process responsible for the change is identified as "SetupHost.exe", indicating a potential setup process. The object name impacted appears to be the "bootmanager", and you can examine the new and old security descriptors to identify the changes. Understanding the meaning of each field in the security descriptor can be accomplished through references such as the article ACE Strings and Understanding SDDL Syntax.

From the observed events, you can infer that a setup process occured, involving the creation of a new file and the initial configuration of security permissions for auditing purposes. Subsequently, you encounter the logon event, followed by a "special logon" event.

![windows event logs 13](../../images/windows_event_logs13.png)

Analyzing the special logon event, you gain insights into token permission granted to the user upon a successful logon.

![windows event logs 14](../../images/windows_event_logs14.png)

A comprehensive list of privileges can be found in the documentation on [privilege constants](https://docs.microsoft.com/en-us/windows/win32/secauthz/privilege-constants). For instance, the "SeDebugPrivilege" privilege indicates that the user possesses the ability to tamper with memory that does not belong to them.

### Useful Windows Event Logs

... can be found [here](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/).

