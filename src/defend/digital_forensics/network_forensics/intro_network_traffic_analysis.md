# Introduction to Network Traffic Analysis

## Introduction

### What is Network Traffic Analysis

Network Traffic Analysis (_NTA_) can be described as the act of examining network traffic to characterize common ports and protocols utilized, establish a baseline for your environment, monitor and respond to threats, and ensure the greatest possible insight into you organization's network.

This process helps security specialists determine anomalies, including security threats in the network, early and effectively pinpoint threats. Network Traffic Analysis can also facilitate the process of meeting security guidelines. Attackers update their tactics frequently to avoid detection and leverage legitimate credentials with tools that most companies allow in their networks, making detection and, subsequently, response challenging for defenders. In such cases, Network Traffic Analysis can again prove helpful. Everyday use cases of NTA include:

- Collecting real-time traffic within the network to analyze upcoming threats.
- Setting a baseline for day-to-day network communications.
- Identifying and analyzing traffic from non-standard ports, suspicious hosts, and issues with networking protocols such as HTTP errors, problems with TCP, or other networking misconfigs.
- Detecting malware on the wire, such as ransomware, exploits, and non-standard interactions.

### BPF Syntax

[Berkeley Packet Filter (_BPF_)](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) is a technology that enables a raw interface to read and write from the Data-Link layer. With all this in mind, you care for BPF because of the filtering and decoding abilities it provides you. Check out [this reference](https://www.ibm.com/docs/en/qsip/7.4?topic=queries-berkeley-packet-filters).

### Performing Network Traffic Analysis

At a minimu, to listen passively, you need to be connected to the network segment you wish to listen on. This is especially true in a switched environment where VLANs and switch ports will not forward traffic outside their broadcast domain. With that in mind, if you wish to capture traffic from a specific VLAN, your capture device should be connected to that same network. Devices like network taps, switch or router configurations like span ports, and port mirroring can allow you to get a copy of all traffic traversing a specific link, regardless of what network segment or destination it belongs to.

#### NTA Workflow

Traffic analysis is not an exact science. NTA can be a very dynamic process and is not a direct loop. It is greatly influenced by what you are looking for and where you have visibility into your network. Performing traffic analysis can distill down to a few basic tenants.

![intro network traffic analysis 1](../../../images/intro_network_traffic_analysis1.png)

1. **Ingest Traffic**: Once you have decided on your placement, begin capturing traffic. Utilize capture filters if you already have an idea of what you are looking for.
2. **Reduce Noise by Filtering**: Capturing traffic of a link, especially one in a production environment, can be extremely noisy. Once you complete the initial capture, an attempt to filter out unnecessary traffic from your view can make analysis easier.
3. **Analyze and Explore**: Now is the time to start carving out data pertinent to the issue you are chasing down. Look at specific hosts, protocols, even things as specific as flags set in the TCP header. The following questions will help you:
	1. Is the traffic encrypted or plain text? Should it be?
	2. Can you see users attempting to access resources to which they shouldn't have access?
	3. Are different hosts talking to each other that typically do not?
4. **Detect and Alert**:
	1. Are you seeing any errors? Is a device not responding that should be?
	2. Use your analysis to decide if what you see is benign or potentially malicious.
	3. Other tools like IDS and IPS can come in handy at this point. They can run heuristics and signatures against the traffic to determine if anything within is potentially malicious.
5. **Fix and Monitor**: Fix and monitor is not a part of the loop but should be included in any workflow you perform. If you make a change or fix an issue, you should continue to monitor the source for a time to determine if the issue has been resolved.

## Analysis

### The Analysis Process

Network Traffic Analysis is a dynamic process that can change depending on the tools you have on hand, permissions given to you by the organization, and your network's visibility. Your goal is to provide a repeatable process you can begin to utilize when performing traffic analysis.

Traffic analysis is a detailed examination of an event or process, determining its origin and impact, which can be used to trigger specific precautions and/or actions to support or prevent future occurences. With network traffic, this means breaking down the data into understandable chunks, examining it for anything that derivates from regular network traffic, for potentially malicious traffic such as unauthorized remote communications from the internet over RDP, SSH, or Telnet, or unique instances preceding network issues. While performing your analysis, you are also looking to see what the trends look like within the traffic and determine if it matches a baseline of typical operational traffic.

#### Analysis Dependencies

Traffic capturing and analysis can be performed in two different ways, active or passive. Each has its dependencies. With passive, you are just copying data that you can see without directly interacting with the packets. For active traffic capture and analysis, the needs are a bit different. Active capture requires you to take a more hands-on approach. This process can also be referred to as in-line traffic captures. With both, how you analyze thet data is up to you. You can perform the capture and analysis once done, or you can perform analysis in real-time while the traffic is live. The table below lays out the dependencies for each:

| Dependencies                           | Passive | Active | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------- | ------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Permission                             | X       | X      | Depending on the organization you are working in, capturing data can be against policy or even against the law in some sensitive areas like healthcare or banking. Be sure always to obtain permission in writing from someone with the proper authority to grant it to you.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Mirrored Port                          | X       |        | A switch or router network interface configured to copy data from other sources to that specific interface, along with the capability to place your NIC into promiscuous mode. Having packets copied to your port allows you to inspect any traffic destined to the other links you could normally not have visibility over. Since VLANs and switch ports will not forward traffic outside of their broadcast domain, you have to be connected to the segment or have that traffic copied to your specific port. When dealing with wireless, passive can be a bit more complicated. You must connect to the SSID you wish to capture traffic off of. Just passively listening to the airwaves around you will present you with many SSID broadcast advertisements, but noch much else. |
| Capture Tool                           | X       | X      | A way to ingest the traffic. A computer with access to tools like TCPDump, Wireshark, Netminer, or others is sufficient. Keep in mind that when dealing with PCAP data, these files can get pretty large quickly. Each time you apply a filter to it in tools like Wireshark, it causes the application to parse that data again. This can be a resource-intensive process, so make sure the host has abundant resources.                                                                                                                                                                                                                                                                                                                                                              |
| In-Line Placement                      |         | X      | Placing a Tap-in-line requires a topology change for the network you are working in. The source and destination hosts will not notice a difference in the traffic, but for the sake of routing and switching, it will be an invisible next hop the traffic passes through on its way to the destination.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Network Tap or Host with Multiple NICs |         | X      | A computer with two NICs, or a device such as a Network Tap is required to allow the data you are inspecting to flow still. Think of it as adding another route in the middle of a link. To actively capture the traffic, you will be duplicating data directly from the sources. The best placement for a tap is in a layer three link between switched segments. It allows for the capture of any traffic routing outside of the local network. A switched port or VLAN segmentation does not filter your view here.                                                                                                                                                                                                                                                                 |
| Storage and Processing Power           | X       | X      | You will need plenty of storage space and processing power for traffic capture off a tap. Much more traffic is traversing a layer three link than just inside a switched LAN. Think of it like this: When you passively capture traffic inside a LAN, it's like pouring water into a cup from a water fountain. It's a steady stream but manageable. Actively grabbing traffic from a routed link is more like using a water hose to fill up a teacup. There is a lot more pressure behind the flow, and it can be a lot for the host to process and store.                                                                                                                                                                                                                            |

### Analysis in Practice

#### Descriptive Analysis

... is an essential step in any data analysis. It serves to describe a data set based on individual characteristics. It helps to detect possible errors in data collection and/or outliers in the data set.

1. What is the issue?
2. Define your scope and the goal
3. Define your target(s)

That covers the issue, what you are looking for, when, and where to find it.

#### Diagnostic Analysis

... clarifies the causes, effects, and interactions of conditions. In doing so, it provides insights that are obtained through correlations and interpretation. Characteristics here is a backward-looking view, as in the closely related descriptive analytics, with the subtle difference that it tries to find reasons for events and developments.

4. Capture network traffic
5. Identification of required network traffic components
6. An understanding of captured network traffic

By capturing traffic around the source of your issue, clearing out any known good data, and then taking the time to inspect and understand what is left, you can determine if it is the cause of your problem. In doing so, you just performed diagnostic analysis. You are validating the cause of your problems and examining the events surrounding them.

#### Predictive Analysis

By evaluating historical and current data, predictive analysis creates a predictive model for future probabilities. Based on the results of descriptive and diagnostic analyses, this method of data analysis makes it possible to identify trends, detect deviations from expected values at an early stage, and predict future occurences as accurately as possible.

7. Note-taking and mind mapping of the found results
8. Summary of the analysis

By performing an evaluation of the data you have found, comparing it to your baseline traffic, and known bad data such as markers of infiltration or exploitation, you are performing predictive analysis. In this process, you paint a clear picture so that appropriate actions can be taken in response.

#### Prescriptive Analysis

... aims to narrow down what actions to take to eliminate or prevent a future problem or trigger a specific activity or process. Using the results of your workflow, you can make sound decisions as to what actions are required to solve the problem and prevent it from happening again. To prescribe a solution is the culmination of this workflow. Once done and the problem is solved, it is prudent to reflect on the entire process and develop lessons learned. These lessons, when documented, will enable you to make your processes stronger - document what was done correctly, what actions failed to help, and what could improve.

This workflow is an example of how to begin the analysis process on captured traffic. Above you broke it down into its parts to explain where they fit within the analysis process and with which type of analysis it belongs.

Often this process is not a once-and-done kind of thing. It is usually cyclic, and you will need to rerun steps based on your analysis of the original capture to build a bigger picture.

#### Key Components of an Effective Analysis

1. **Know your environment**: There are several key components to perform traffic analysis effectively. First, know the environment. If you are unsure if a host belongs in the network, how can you determine if it is rogue or not? Keeping asset inventories and network maps is vital. These will aid in the analysis process.
2. **Placement is key**: Next, the placement of your host for capturing traffic is a critical thing. Closest to the source of the issue is the ideal placement of your capturing tool. If the traffic in question is coming from the internet, listening to the inbound links is a great way to see the complete picture. It is as close to the source as you can get. If the problem seems to be isolated to one host on your internal network, try placing the capture tools in the same segment as the problem host and see what traffic is happening within the segment.
3. **Persistence**: Persistence is the next critical component for you. The issue will not always be easy to spot. It may not even be a frequent event on the network. For example, an attacker's C2 server reaching out to the victim's computers may only happen on a time interval once every several hours, or even once a day or less. This means that if you did not catch it the first time around, it might be a while before it appears in your logs. Don't lose the drive to find the problem. It could mean the difference between stopping the attacker and a full-scale breach like a ransomware attack.

