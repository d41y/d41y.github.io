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
4) **Data Gathering and Examination**: 