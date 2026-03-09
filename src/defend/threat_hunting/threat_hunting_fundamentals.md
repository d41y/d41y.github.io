# Threat Hunting Fundamentals

## Introduction

### Definition

Threat hunting is an active, human-led, and often hypothesis-driven practice that systematically combs through network data to identify stealthy, advanced threats that evade existing security solutions. This strategic evolution from a conventionally reactive posture allows you to uncover insidious threats that automated detection systems or external entities such as law enforcement might not discern.

The principal objective of threat hunting is to substantially reduce dwell time by recognizing malicious entities at the earliest stage of the cyber kill chain. This proactive stance has the potential to prevent threat actors from entrenching themselves deeply within your infrastructure and to swiftly neutralize them.

The threat hunting process starts with the identification of assets - systems or data - that could be high-value targets for threat actors. Next, you analyze the TTPs these adversaries are likely to employ, based on current threat intelligence. You subsequently strive to proactively detect, isolate, and validate any artifacts related to the abovementioned TTPs and any anomalous activity that deviates from established baseline norms.

During the hunting endeavor, you regularly emply threat intelligence, a vital component that aids in formulating effective hunting hypotheses, developing counter-tactics, and executing protective measures to prevent system compromise.

Key faces of threat hunting include:

- An offensive, proactive strategy that prioritizes threat anticipation over reaction, based on hypotheses, attacker TTPs, and intelligence.
- An offensive, reactive response that searches across the network for artifacts related to a verified incident, based on evidence and intelligence.
- A solid, practical comprehension of threat landscape, cyber threats, adversial TTPs, and the cyber kill chain.
- Cognitive empathy with the attacker, fostering an understanding of the adversial mindset.
- A profound knowledge of the organization's IT environment, network topology, digital assets, and normal activity.
- Utilization of high-fidelity data and tactical analytics, and leveraging advanced threat hunting tools and platforms.

### A Threat Hunting Team's Structure

The ideal threat hunting team composition typically includes the following roles:

- Threat Hunter
- Threat Intelligence Analyst
- Incident Responders
- Forensics Experts
- Data Analyst/Scientist
- Security Engineer/Architects
- Network Security Analyst
- SOC Manager

### When Should Threat Hunters Hunt?

- when new information on an adversary or vulnerability comes to light
- when new indicators are associated with a known adversary
- when multiple network anomalies are detected
- during an incident response activity
- periodic proactive actions

## The Threat Hunting Process

1) **Setting the Stage**: The initial phase is all about planning and preparation. It includes laying out clear targets based on a deep understanding of the threat landscape, your business's critical requirements, and your threat intelligence insights. The preparation phase also encompasses making certain your environment is ready for effective threat hunting, which might involve enabling extensive logging across your systems and ensuring threat hunting tools, such as SIEM, EDR, IDS, are correctly set up. Additionally, you stay informed about the most recent cyber threats and familiarize yourself with threat actor profiles.
2) **Formulating Hypotheses**: The next step involves making educated predictions that will guide your threat hunting journey. These hypotheses can stem from various sources, like recent threat intelligence, industry updates, alerts from security tools, or even your professional intuition. You strive to make these hypotheses testable to guide you where to search and what to look for.
3) **Designing the Hunt**: Upon crafting a hypothesis, you need to develop a hunting strategy. This includes recognizing the specific data sources that need analysis, the methodologies and tools you'll use, and the particular indicators of compromise or patterns you'll hunt for. At this point, you might also create custom scripts or queries and utilize dedicated threat hunting tools.
4) **Data Gathering and Examination**: This phase is where the active threat hunting occurs. It involves collecting necessary data, such as log files, network traffic data, endpoint data, and then analyzing this data using the predetermined methodologies and tools. Your goal is to find evidence that either supports or refutes your initial hypothesis. This phase is highly iterative, possibly involving refinement of the hypothesis or the investigation approach as you uncover new information.
5) **Evaluating Findings and Testing Hypotheses**: After analyzing the data, you need to interpret the results. This could involve confirming or disproving the hypothesis, understanding the behavior of any detected threats, identifying affected systems, or determining the potential impact of the threat. This phase is crucial, as it will inform the next steps in terms of response adn remediation.
6) **Mitigating Threats**: If you confirm a threat, you must undertake remediation actions. This could involve isolating affected systems, eliminating malware, patching vulnerabilities, or modifying configurations. Your goal is to eradicate the threat and limit any potential damage.
7) **After the Hunt**: Once the threat cycle concludes, it's crucial to document and share the findings, methods, and outcomes. This might involve updating threat intelligence platforms, enhancing detection rules, refining incident response playbooks, or improving security policies. It's also vital to learn from each threat hunting mission to enhance future efforts.
8) **Continuous Learning and Enhancement**: Threat hunting is not a one-time task, but a continuous process of learning and refinement. Each threat hunting cycle should feed into the next, allowing for continuous improvement of hypotheses, methodologies, and tools based on the evolving threat landscape and the organization's changing risk profile.

Threat hunting is a delicate balance of art and science. It demands technical prowess, creativity, and a profound understanding of both the organization's environment and the broader threat landscape. The most successful threat hunting teams are those that learn from each hunt and constantly hone their skills and processes.

## Threat Hunting Glossary

### Adversary

An adversary, within the realm of Cyber Threat Intelligence, refers to an entity by shared objectives as your organization, albeit unauthorized, seeking to infiltrate your business and satisfy their collection requirements, which may include financial gains, insider information, or valuable intellectual property. These adversaries possess varying levels of technical expertise and are more motivated to circumvent your security measures.

Adversaries can be classified into distinct categories, including cyber criminals, insider threats, hacktivists, or state-sponsored operators.

### APT

APTs are typically associated with highly organized groups or nation-state entities that possess extensive resources, thereby enabling them to carry out their malicious activities over prolonged periods. While APTs target various sectors, they show a marked preference for high-value targets, which can include governmental organizations, healthcare infra, and defense systems. Contrary to what the name might suggest, being labeled as an APT doesn't necessarily imply that the group utilizes technologically advanced techniques. Rather, the "advanced" aspect can refer to the sophisticated strategic planning, and "persistent" alludes to their dogged perspective in achieving their objectives, backed by substantial resources including, but not limited to, financial backing, manpower, and time.

### Tactics, Techniques, and Procedures (_TTPs_)

A term borrowed from the military, TTPs symbolize the distinct operational patterns or "signature" of an adversary.

- **Tactics**: This term describes the strategic objectives and high-level concepts of operations employed by the adversary. Essentially, it addresses the "why" behind their actions.
- **Techniques**: These are the specific methods utilized by and aversary to accomplish their tactical objectives, providing the "how" behind their actions. Techniques don't provide step-by-step instructions but rather describe the general approach to achieving a goal.
- **Procedures**: These are the granular, step-by-step instructions, essentially the "recipe" for the implementation of each technique.

Analyzing TTPs offers deep insights into how an adversary penetrates a network, moves laterally within it, and achieves their objectives. Understanding TTPs allows for the creation of IoC, which can help detect and thwart future attacks.

### Indicator

An indicator, when analyzed in CTI, encompasses both technical data and contextual information. Isolated technical data lacking relevant context holds limited or negligible value for network defenders. Contextual details allow for a comprehensive understanding of the indicator's significance, enabling effective threat analysis and response.

### Threat

A threat is a multifaceted concept, consisting of three fundamental factors, intent, capability, and oppurtunity.

Firstly, **intent** signifies the underlying rationale driving adversaries to target and exploit your network infra. This intent can range from corporate espionage to financial gains through cybercrime, or even targeting your business relationships with other entities.

Secondly, **capability** denotes the tools, resources, and financial backing that adversaries possess to carry out their operations successfully. Their skill level in penetrating your network and the availability of sufficient financial resources determine their capability to sustain ongoing attacks against your organization.

Lastly, **opportunity** refers to conditions or events that provide favorable circumstances for adversaries to execute their operations. This encompasses instances where adversaries acquire relevant email addresses or credentials from your network, as well as their awareness of vulnerabilities in specific software systems.

### Campaign

A campaign refers to a collection of incidents that share similar TTPs and are believed to have comparable collection requirements. This type of intelligence necessitates substantial time and effort to aggregate and analyze, as businesses and organizations progressively report and uncover related malicious activities.

### IoCs

IoCs are digital traces or artifacts derived from active or past intrusions. They serve as "signposts" of a specific adversary or malicious activity. IoCs can include a wide array of elements such as the hashes of malicious files, suspicious IP addresses, URLs, domain names, and names of malicious executables or scripts. Continually tracking, cataloging, and analyzing IoCs can greatly enhance your threat detection capabilities, leading to faster and more effective responses to cyber threats.

### Pyramid of Pain

Pyramid of Pain is a critical visualization which presents a hierarchy of indicators that can support you in detecting adversaries. It also showcases the degree of difficulty in acquiring these specific indicators and the subsequent impact of gathering intelligence on them. As you ascend the Pyramid of Pain, obtaining adversary-specific IoCs becomes increasingly challenging. However, the flip side is that acquiring these specific IoCs forces the adversary to alter their attack methodologies, a task that is far from simple for them.

![threat hunting fundamentals 1](../../../images/threat_hunting_fundamentals1.png)

### Diamond Model

The Diamond Model of Intrusion Analysis is a conceptual framework designed to illustrate the fundamental aspects of a cyber intrusion. This model aims to provide a more structured approach to understand, analyze, and respond to cyber threats. The model is structured around for key components, represented as vertices of a diamond.

![threat hunting fundamentals 2](../../../images/threat_hunting_fundamentals2.png)

## Threat Intelligence Fundamentals