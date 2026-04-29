# Phishing Fundamentals

Phishing attacks are categorized into two main types: **broad phishing** and **spear phishing**. A typical phishing campaign targets many people at once with generic messages designed for broad appeal. In contrast, spear phishing targets specific individuals with personalized attacks, requiring detailed research. A spear phishing attack requires research into targets' behaviors, preferences, and vulns to create convincing messages. This information is crucial for creating a convincing campaign and pretext that targets are like to fail for.

Attackers now leverage Generative AI to improve social engineering tactics. By using AI-augmented technologies such as LLMs, process large amounts of public data to identify potential phishing targets. This approach helps attackers streamline the research process and personalize their attacks.

Attackers have also begun leveraging Gen AI audio models to clone voices and generative video models to create deepfake videos that convincingly replicate an individual's facial expressions, movements, and voice patterns.

## Phishing 101

### Email

The email text is often crafted with a particular goal, such as convincing the target to perform an action that will execute code. In this case, the attacker will likely include a malicious attachment in the email and persuade the target to open it, which triggers the execution of a specific payload. Malicious attachments can take different forms, including Office documents, PDFs, 7zip/zip archives, shortcut files, and calendar invites.

Attackers may embed a link that leads to an exploit-laden website. Clicking on these links can lead to the exploitation of vulns in specific browsers, enabling the attacker to run code on the target's machine.

Alternatively, the email text might attempt to persuade the user to clink a link which connects them to a malicious website which closely resembles a site the user often logs into. If the user logs in, the attacker gains possession of those credentials.

In phishing, a pretext is a fake story designed to convince someone to open a link or attachment. A successful attack relies on a believable pretext. Small details matter - typos, bad grammar, and formatting mistakes can expose the scam. The pretext should be as believable and as seamless as possible to avoid raising suspicion.

This requires solid social engineering skills, a strong command of the target's primary language, and details collected through research to add realism to the attack and convince the target to take the desired action.

Despite this information, crafting a convincing remains complex. For example, your email must come from a familiar, or at least a seemingly benign source and you should align other email-based metadata with something the target might expect. For example, if you send an email from an unfamiliar domain, the recipient is less likely to open it and engage with it. To address this, attackers often purchase look-alike domains resembling the target's organization, its vendors, or other familiar companies.

Along these lines, if an attacker gains access to a legitimate email account from the target's organization or one of the target's clients, they will use that account as it significantly improves their chances of success.

As for the pretext, it must align with the expectations of a target. If, for example, you're attempting to run a phishing campaign against the HR department of an organization, you should align your pretext with the kinds of emails an HR department is used to receiving. Getting this right takes some research, and often some working knowledge of the target's department and job rules.

It's also worth mentioning **whaling**, a form of spear phishing that focuses on high-profile individuals. These targeted attacks require more care and attention than a typical phishing campaign. These pretexts are often highly customized and require significant  research or inside knowledge of the target.

There are also very generic approaches you might take in phishing. One generic approach involves mimicking an email from a commonly used service like Slack, Zoom, Google's Gmail, or Microsoft Teams, which links to a cloned website which resembles that particular service. This is sometimes known as clone phishing. This approach can be useful for large-scale phishing campaigns.

### Smishing, Vishing, and Chatting

In addition to more-traditional email-based phishing campaigns, attackers can also leverage **smishing** to phish a target through SMS or other mobile messaging platforms.

SMS is a more personal and direct than email communication. The effectiveness of a smishing attack depends on the target. For example, a phishing message sent to a work phone should have a work-related context, while one sent to a personal phone would seem more authentic if it includes references to specific friends or family. In addition, since the target will not have the source phone number in their contact list, an attacker must add pretext to address this. These are crucial considerations when attempting to smish a target.

For example, in a popular "CEO gift card scam", the attacker poses as a senior executive trying to send an employee a gift card. This could sway a target, especially if they believe the message came from a company executive.

Another category of phishing is voice phishing, sometimes called **vishing**, in which an attacker calls a target on the phone, and speaks to them directly. Traditional vishing relies on more on social engineering skill rather than technical skilll.

You cann also use [caller ID spoofing techniques](https://usa.kaspersky.com/resource-center/preemptive-safety/phone-number-spoofing) in smishing and vishing campaigns to alter the sender or caller's source number. This has become more common because of the prevalence of VoIP tech.

In an adjacent style of social engineering attack known as SIM swapping, attackers call a mobile network provider and claim to be the owner of a specific mobile phone account. They then convince the network provider to transfer the phone number from the target's SIM card to a SIM card they control. This gives them control over the target's phone number, until the target is able to recover their access. This can of course be used for spoofing, but more critically, it is often used to bypass phone-based MFA protections.

### Enhancing Phishing through Social Engineering

Social engineering relies on psychological manipulation rather than technical expertise. This means attackers use more "human" judgement when deploying them, which is refined over time through some trial and error. Borrowing from this, as pentesters, you want your phishing campaign to be as believable as possible, and adding some social engineering "spice" can introduce a little pressure which may encourage your targets to ignore their more sensible rational judgements.

Gaining the target's trust is the ultimate goal of any successful phishing campaign. You want your target to trust in your phish enough to entice them to follow through with what you are asking them to do. This requires you make a good impression. Put simply, your pretext must align with the target's expectations and avoid raising suspicion.

By extension, your pretext must align with your payload. For example, if your pretext suggests you are from a particular company, the landing page behind your malicious link must mirror that company's web page. The domain of the sending address and URL link must also pass at least a cursory inspection, which is why skilled phishers often purchase lookalike domain names. Minute details are also important, such as a TLS-enabled website since an insecure HTTP connection could raise suspicion. Carelessness can erode trust, so details matter.

But technical elements aren't the only factors in creating trust. You also need to use softer skills. For example, if you are impersonating a particular person attempt to approximate that person's writing tone. You also want it to feel familiar and not raise suspicion. A more sophisticated tactict involves establishing rapport with the target before persuading them to open a malicious file or link.

Recognizing how to build trust is probably the most fundamental skill in successful phishing. However, there are other strategies you should consider in a phishing campaign.

Urgency is a common social engineering technique used by phishers, manipulating targets into acting quickly without questioning the safety of the requested action or critically reflecting on what they're doing. Introducing a sense of urgency works best in organizations which have unhealthy work cultures. If a target often receives urgent requests and is expected to deliver on them without any critical thought, they are much more likely to fall for these kinds of manipulation.

Another strategy, fear, can cause a target to momentarily suspend their judgement, increasing the likelihood of compliance. Authority, a similar strategy to fear, can amplify the urgency of your request. This often involves taking on the role of a superior, or even company's CEO. These strategies must be balanced as you consider elements of trust and the benefits of creating a good rapport.

Finally, you'll often leverage a positive incentive like a reward, in a process known as baiting in which you offer something tangible to lure a target into performing an action. The promise might include a gift card, cash, or another incentive or intangible benefits like gaining favor with a superior. Offering something tangible in exchange for participation in something like a survey is not an uncommon approach for companies in general. This kind of approach might blend into the background noise for some targets.

The social elements of a phish directly correlate to the success rate of the campaign. Exploiting a trust relationship, and possibly adding other kinds of manipulation along the way, you can help a target suspend their judgement, which can improve the effectiveness of a phishing campaign.

## Payloads, Misdirection, and Speedbumps

## Hands-On Credential Phishing