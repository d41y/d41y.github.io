# Network Foundations

## Fundamentals

### Introduction

#### What is a Network?

A network is a collection of interconnected devices that can communicate - sending an receiving data, and also sharing resources with each other. These individual endpoint devices, often called nodes, include computers, smartphones, printers, and servers. However, nodes alone do not comprise the entire network.

| Concepts | Description |
| -------- | ----------- |
| Nodes | Individual devices connected to a network. |
| Links | Communication pathways that connect nodes. |
| Data Sharing | The primary purpose of a network is to enable data exchange. |

#### Why are Networks Important?

Networks, particularly since the advent of the Internet, have radically transformed society, enabling the multitude of possibilites that are now essential to our lives.

A few benefits:

| Function | Description |
| -------- | ----------- |
| Resource Sharing | Multiple devices can share hardware and software resources. |
| Communication | Instant messaging, emails, and video calls rely on networks. |
| Data Access | Access files and databases from any connected device. |
| Collaboration | Work together in real-time, even when miles apart. |

#### Types of Networks

##### Local Area Network (_LAN_)

... connects devices over a short distance, such as within a home, school, or small office building.

| Characteristic | Description |
| -------------- | ----------- |
| Geographical Scope | Covers a small area. |
| Ownership | Typically owned and managed by a single person or organization. |
| Speed | High data transfer rates. |
| Media | Uses wired or wireless connections. | 

![network foundations 1](../../../../images/network_foundations1.png)

##### Wide Area Network (_WAN_)

... spans a large geographical area, connecting multiple LANs.

| Characteristic | Description |
| -------------- | ----------- |
| Geographical Scope | Covers cities, countries, or continents. |
| Ownership | Often a collective or distributed ownership. |
| Speed | Slower data transfer rates compared to LANs due to long-distance data travel. |
| Media | Utilize fiber optics, satellite links, and leased telecommunication lines. |

The Internet is the largest example of a WAN, connecting millions of LANs globally.

![network foundations 2](../../../../images/network_foundations2.png)

#### How do LANs and WANs Work Together?

LANs can connect to WANs to access broader networks beyond their immediate scope. This connectivity allows for expanded communication and resource sharing on a much larger scale.

For instance, when accessing the Internet, a home LAN connects to an ISP's WAN, which grants Internet access to all devices within the home network. An ISP is a company that provides individuals and organizations with access to the Internet. In this setup, a device called a modem (_modulator-demodulator_) plays a crucial role. The modem acts as a bridge between your home network and the ISP's infrastructure, converting digital signals from your router into a format suitable for transmission over various media like telephone lines, cable systems, and fiber optics. This connection transforms a simple local network into a gateway to the resource available online.

### Network Concepts

#### OSI Model

The Open Systems Interconnection (_OSI_) model is a conceptual framework that standardizes the functions of a telecommunication or computing system into seven abstract layers. This model helps vendors and devs create interoperable network devices and software.

![network foundations 3](../../../../images/network_foundations3.png)

#### TCP/IP Model

The Transmission Control Protocol / Internet Protocol (_TCP/IP_) model is a condensed version of the OSI model, tailored for practical implementation on the internet and other networks.

![network foundations 4](../../../../images/network_foundations4.png)

#### OSI vs. TCP/IP

The TCP/IP model simplifies the complex structure of the OSI model by combining certain layers for practical implementation. Specifically designed around the protocols used on the internet, the TCP/IP model is more application-oriented, focusing on the needs of real-world network communication. This design makes it more effective for internet-based data exchange, meeting modern technological needs.

![network foundations 5](../../../../images/network_foundations5.png)

#### Protocols

... are standardized rules that determine the formatting and processing of data to fascilitate communication between devices in a network. These protocols operate at different layers within network models, each tailored to handle specific types of data and communication needs.

**Common Network Protocols**:

- HTTP
- FTP
- SMTP
- TCP
- UDP
- IP

#### Transmission

... in networking refers to the process of sending data signals over a medium from one device to another.

##### Transmission Types

Transmission in networking can be categorized into two main types: **analog** and **digital**. Analog transmission uses continuous signals to represent information, commonly seen in traditional radio broadcasts. In contrast, digital transmission employs discrete signals to encode data, which is typical in modern communication technologies like computer networks and digital telephony.

##### Transmission Modes

... define how data is sent between two devices. **Simplex** mode allows one-way communication only, such as from a keyboard to a computer, where signals travel in a single direction. **Half-duplex** mode permits two-way communication but not simultaneously; examples include walkie-talkies where users must take turns speaking. **Full-duplex** mode, used in telephone calls, suppports two-way communication simultaneously, allowing both parties to speak and listen at the same time.

##### Transmission Media

The physical means by which data is transmitted in a network is known as transmission media, which can be wired or wireless. Wired media includes **twisted pair** cables, commonly used in Ethernet networks and LAN connections; **coaxial** cables, used for cable TV and early Ethernet; and **fiber optic** cables, which transmit data as light pulses and are essential for high-speed internet backbones. Wireless media, on the other hand, encompasses **radio waves** for Wi-Fi and cellular networks, **microwaves** for satellite communications, and **infrared** technology used for short-range communications like remote controls. Each type of media has its specific use cases depending on the requirements of the network environment.

### Components of a Network

#### End Devices

An end device, also known as a host, is any device that ultimately ends up sending or receiving data within a network. Personal computers and smart devices are common and devices; users routinely interact with them directly to perform tasks like browsing the web, sending messages, and creating documents. In most networks, such devices play a crucial role in both data generation and data consumption, like when users stream videos or read web content. End devices serve as the primary user interface to the world wide web, enabling users to access network resources and services seamlessly, through both wired and wireless connections. Another typical example of this would be a student using a notebook to connect to a school's Wi-Fi network, allowing them to access online learning materials, submit assignments, and communicate with instructors.

#### Intermediary Devices

An intermediary device has the unique role of facilitating the flow of data between end devices, either within a local area network, or between different networks. These devices include routers, switches, modems, and access points, all of which play crucial roles in ensuring efficient and secure data transmission. Intermediary devices are responsible for packet forwarding, directing data packets to their destinations by reading network address information and determining the most efficient paths. They connect networks and control traffic to enhance performance and reliability. By managing data flow with protocols, they ensure smooth transmission and prevent congestion. Additionally, intermediary devices often incorporate security features like firewalls to protect certain networks from unauthorized access and potential threats. Operating at different layers of the OSI model use routing tables and protocols to make informed decisions about data forwarding. A common example is a home network where intermediary devices like routers and switches connect all household devices to the internet, enabling communication and access to online resources.

##### Network Interface Cards (_NICs_)

A NIC is a hardware component installed in a computer, or other device, that enables connection to a network. It provides the physical interface between the device and the network media, handling the sending and receiving of data over the network. Each NIC has a unique MAC address, which is essential for devices to identify each other, and facilitate communication at the data link layer. NICs can be designed for wired connections, such as Ethernet cards that connects via cables, or for wireless connections, like Wi-Fi adapters utilizing radio waves.

##### Routers

A router is an intermediary device that plays a hugely important role: the forwarding of data packets between networks, and ultimately directing internet traffic. Operating at the network layer of the OSI model, routers read the network address information in data packets to determine their destinations. They use routing tables and routing protocols such as OSPF or BGP to find the most efficient path for data to travel across interconnected networks, including the internet.

They fulfill this role by examining incoming data packets and forwarding them toward their destinations, based on IP addresses. By connecting multiple networks, routers enable devices on different networks to communicate. They also manage network traffic by selecting optimal paths for data transmission, which helps prevent congestion - a process known as traffic management. Additionally, routers enhance security by incorporating features like firewalls and access control lists, protecting the network from unauthorized access and potential threats.

##### Switches

The switch is another integral component, with its primary job being to connect multiple devices within the same network, typically a LAN. Operating at the data link layer of the OSI model, switches use MAC addresses to forward data only to the intended recipient. By managing data traffic between connected devices, switches reduce network congestion and improve overall performance. They enable devices like computers, printers, and servers to communicate directly with eath other within the network. For instance, in a corporate office, switches connect employees' computers, allowing for quick file sharing and access to shared resources like printers and servers.

##### Hubs

A hub is a basic networking device. It connects multiple device in a network segment and broadcasts incoming data to all connected ports, regardless of the destination. Operating at the physical layer of the OSI model, hubs are simpler than switches and do not manage traffic intelligently. This indiscriminate data broadcasting can lead to network inefficiencies and collisions, making hubs less suitable for modern networks.

#### Network Media and Software Components

... are vital elements that enables seamless communication and operation within a network. Network media, such as cables and wireless signals, provide the physical pathways that connect devices and allow data to be transmitted between them. This includes wired media like Ethernet cables and fiber-optic cables, which offer high-speed connections, as well as wireless media like Wi-Fi and Bluetooth, which provide mobility and flexibility. On the other hand, software components like network protocols and management software define the rules and procedures for data transmission, ensuring that information is correctly formatted, addressed, transmitted, routed, and received. Network protocols such as TCP/IP, HTTP, and FTP enable devices to communicate over the network, while network management software allows administrators to monitor network performance, configure devices, and enhance security through tools like software firewalls.

##### Cabling and Connectors

... are the physical materials used to link devices within a network, forming the pathways through which data is transmitted. This includes the various types of cables mentioned previously, but also connectors like the RJ-45 plug, which is used to interface cables with network devices such as computers, switches, and routers. The quality and type of cabling and connectors can affect network performance, reliability, and speed.

##### Network Protocols

... are the set of rules and conventions that control how data is formatted, transmitted, received, and interpreted across a network. They ensure that devices from different manufacturers, and with varying configurations, can adhere to the same standard and communicate effectively.

##### Network Management Software

... consists of tools and applications used to monitor, control, and maintain network components and operations. These software solutions provide functionalities for:

- performance monitoring
- configuration management
- fault analysis
- security management

They help network administrators ensure that the network operates efficiently, remains secure, and can quickly address any issues that arise.

##### Software Firewalls

A software firewall is a security application installed on individual computers or devices that monitors and controls incoming and outgoing network traffic based on predetermined security rules. Unlike hardware firewalls that protect entire networks, software firewalls provide protection at the device level, guarding against threats that may bypass the network perimeter defenses. They help prevent unauthorized access, reject incoming packets that contain suspicious or mailicious data, and can be configured to restrict access to certain applications or services.

#### Servers

A server is a powerful computer designed to provide services to other computers, known as clients, over a network. Servers are the backbone behind websites, emails, files, and applications. In the realm of computer networking, servers play a crucial role by hosting services that clients access, facilitating service provision. They enable resource sharing by allowing multiple users to access resources like files and printers. Servers also handle data management by storing and managing data centrally, which simplifies backup processes and enhances security management. Additionally, they manage authentication by controlling user access and permissions, across multiple components in the network. Servers often run specialized operating systems optimized for handling multiple, simultaneous requests in what is known as the Client-Server-Model, where the server waits for requests from clients and responds accordingly. Whether you knew it or not, this is what was happening under-the-hood the last time you accessed a website from your notebook. Your browser sends a request to the web server hosting the site, and the server subsequently processes the request and sends back the web page data in its response.

## Communication and Addressing

## Internet Architecture and Wireless Technologies

## Network Security and Data Flow Analysis