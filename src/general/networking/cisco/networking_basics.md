# Networking Basics

## Communication in a Connected World

### Network Types

#### Local Networks

| Network | Description |
| ------- | ----------- |
| Small Home Network | connect a few computers to each other and to the internet |
| Small Office and Home Office Networks (_SOHO_) | allows computers in a home office or remote office to connect to a corporate network, or access centralized shared resources |
| Medium to Large Networks | such as those used by corporations or schools can have many locations with hundreds or thousands of interconnected hosts |
| Word Wide Networks | the internet is a network of networks that connects hundreds of millions of computers world-wide |

#### Mobile Devices

| Device | Description |
| ------ | ----------- |
| Smartphone | Smartphones are able to connect to the internet from almost everywhere. Smartphones combine the functions of many different products together, such as a telephone, camera, GPS receiver, media player, and touch screen computer. |
| Tablet | Tables also have functionality of multiple devices. With the additional screen size, they are ideal for watching videos and reading magazines or books. With on-screen keyboards, users are able to do many of the things they used to do on their laptop computer, such as composing emails or browsing the web. |
| Smartwatch | A smartwatch can connect to a smartphone to provide the user with alerts and messages. Additional functions, such as heart rate monitoring and counting steps, like a pedometer, can help people who are wearing the device to track their health. |
| Smart Glasses | A wearable computer in form of glasses, such as Google Glass, contains a tiny screen that displays information to the wearer in a similar fashion to the HUD of a fighter pilot. A small touch pad on the side allows the user to navigate menus while still being able to see through the smart glasses. |

#### Connected Home Devices

| Device | Description |
| ------ | ----------- |
| Security System | Many of the items in a home, such as security systems, lighting, and climate controls, can be monitored and configured remotely using a mobile device. |
| Appliances | Household appliances such as fridges, ovens, and dishwashers can be connected to the internet. This allows the homeowner to power them on or off, monitor the status of the appliance, and also be alerted to preset conditions, such as when the temperature in the fridge rises above an acceptable level. |
| Smart TV | A smart TV can be connected to the internet to access content without the need for TV service provider equipment. Also, a smart TV can allow a user to browse the web, compose email, or display video, audio, or photos stored on a computer. |
| Gaming Console | Gaming consoles can connect to the internet to download games and play with friends online. |

#### Other Connected Devices

| Device | Description |
| ------ | ----------- |
| Smart Cars | Many modern cars can connect to the internet to access maps, audio and video content, or information about a destination. They can even send a text message or email if there is an attempted theft or call for assistance in case of an accident. These cars can also connect to smartphones and tablets to display information about the different engine systems, provide maintenance alerts, or display the status of the security system. |
| RFID Tags | Radio frequency identification tags can be placed in or on objects to track them or monitor sensors for many conditions. |
| Sensors and Actuators | Connected sensors can provide temperature, humidity, wind speed, barometric pressure, and soil moisture data. Actuators can then be automatically triggered based on current conditions. For example, a smart sensor can periodically send soil moisture data to a monitoring station. The monitoring station can then send a signal to an actuator to begin watering. The sensor will continue to send soil moisture data allowing the monitoring station to determine when to deactivate the actuator. |
| Medical Devices | Medical devices such as pacemakers, insulin pumps, and hospital monitors provide users or medical professionals with direct feedback or alerts when vital signs are at specific levels. |

### Data Transmission

#### Types of Personal Data

- **Volunteered data**: This is created and explicitly shared by individuals, such as social network profiles. This type of data might include video files, picture, text, or audio files.
- **Observed data**: This is captured by recording the actions of individuals, such as location data when using cell phones.
- **Inferred data**: This is data such as a credit score, which is based on analysis of volunteered or observed data.

#### Common Methods of Data Transmission

- **Electrical signals**: Transmission is achieved by representing data as electrical pulses on copper wire.
- **Optical signals**: Transmission is achieved by converting the electrical signals into light pulses.
- **Wireless signals**: Transmission is achieved by using infrared, microwave, or radio waves through the air.

### Bandwith and Throughput

#### Bandwith

... is the capacity of a medium to carry data. Digital bandwith measures the amount of data that can flow from one place to another in a given amount of time. Bandwith is typically measured in the number of bits that can be sent across the media in a second.

#### Throughput

... is the measure of the transfer of bits across the media over a given period of time. However, due to a number of factors, throughput does not usually match the specified bandwith. Many factors influence throughput including:

- The amount of data being sent and received over the connection
- The types of data being transmitted
- The latency created by the number of network devices encountered between source and destination

Latency refers to the amount of time, including delays, for data to travel from one given point to another.

Throughput measurements do not take into account the validity or usefulness of the bits being transmitted and received. Many messages received through the network are not destined for specific user applications. An example would be network control messages that regulate traffic and correct errors.

In an internetwork or network with multiple segments, throughput cannot be faster than the slowest link of the path from sending device to the receiving device. Even if all or most of the segments have high bandwith, it will only take one segment in the path with lower bandwith to create a slowdown of the throughput of the entire network.

