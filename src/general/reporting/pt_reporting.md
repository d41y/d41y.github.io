- [Pentest Documentation \& Reporting](#pentest-documentation--reporting)
  - [Preparation](#preparation)
    - [Notetaking \& Organization](#notetaking--organization)
      - [Notetaking Sample Structure](#notetaking-sample-structure)
      - [Notetaking Tools](#notetaking-tools)
      - [Logging](#logging)
        - [Exploitation Attempts](#exploitation-attempts)
      - [Artifacts Left Behind](#artifacts-left-behind)
        - [Account Creation / System Modifications](#account-creation--system-modifications)
      - [Evidence](#evidence)
        - [What to Capture](#what-to-capture)
        - [Storage](#storage)
      - [Formatting and Redaction](#formatting-and-redaction)
        - [Screenshots](#screenshots)
        - [Terminal](#terminal)
      - [What Not to Archive](#what-not-to-archive)

---

# Pentest Documentation & Reporting

## Preparation

### Notetaking & Organization

#### Notetaking Sample Structure

There is no universal solution or structure for notetaking as each project and tester is different. The structure below is what can be helpful but should be adapted to your personal workflow, project type, and the specific circumstances you encountered during your project. For example, some of these categories may not be applicable for an application focused assessment and may even warrant additional categories not listed here.

- **Attack-Path** - An outline of the entire path if you gain a foothold during an external pentest or compromise one ore more hosts during an internal pentest. Outline the path as closely as possible using screenshots and command output will make it easer to paste into report later and only need to worry about formatting.
- **Credentials** - A centralized place to keep your compromised credentials and secrets as you go along.
- **Findings** - It's recommended creating a subfolder for each finding and then writing your narrative and saving it in the folder along with any evidence. It is also worth keeping a section in your notetaking tool for recording findings information to help organize them for the report.
- **Vulnerability Scan Research** - A section to take notes on things you've researched and tried with your vulnerability scans.
- **Service Enumeration Research** - A section to take notes on which services you've investigated, failed exploitation attempts, promising vulns/misconfigs, etc.
- **Web Application Research** - A section to note down interesting web applications found through various methods, such as subdomain brute-forcing. It's always good to perform thorough subdomain enumeration externally, scan for common web ports on internal assessments, and run a tool such as Aquatone or EyeWitness to screenshot all applications. As you review the screenshot report, note down applications of interest, common/default credential pairs you tried, etc.
- **OSINT** - A section to keep track of interesting information you've collected via OSINT, if applicable to the engagement.
- **Administrative Information** - Some people may find it helpful to have a centralized locations to store contact information for other project stakeholders like Project Managers or client Points of Contact, unique objectives/flags defined in the Rules of Engagement, and other items that you find yourself often referencing throughout the project. It can also be used as a running to-do list. As ideas pop up for testing that you need to perform or want to try but don't have time for, be diligent about writing them down here so you can come back to them later.
- **Scoping Information** - Here, you can store information about in-scope IP addresses/CIDR ranges, web application URLs, and any credentials for web applications, VPN, or AD provided by the client. It could also include anything else pertinent to the scope of the assessment so you don't have to keep re-opening scope information and ensure that you don't stray from the scope of the assessment.
- **Activity Log** - High-level tracking of everything you did during the assessment for possible event correlation.
- **Payload Log** - Similar to the activity log, tracking the payloads you're using in a client environment is critical.

#### Notetaking Tools

There are many tools available for notetaking, and the choice is very much personal preference. Here are some of the options available:

- CherryTree
- Visual Studio Code
- Evernote
- Notion
- GitBook
- Sublime Text
- Notepad++
- OneNote
- Outline
- Obsidian
- Cryptpad
- Standard Notes

#### Logging

It is essential that you log all scanning and attack attempts and keep raw tool output wherever possible. This will greatly help you come reporting time. Though your notes should be clear and extensive, you may miss something, and having your logs to fallback can help you when either adding more evidence to a report or responding to a client question.

##### Exploitation Attempts

Tmux logging is an excellent choice for terminal logging, and you should absolutely be using Tmux along with logging as this will save every single thing you type into a Tmux pane to a log file. It is also essential to keep track of exploitation attempts in case the client needs to correlate events later on. It is supremely embarrassing if you cannot produce this information, and it can make you look inexperienced and unprofessionalas a pentester. It can also be a good practice to keep track of things you tried during the assessment but did not work. This is especially useful for those instances in which you have little to no findings in your report. In this case, you can write up a narrative of the types of testing performed, so the reader can understand the kinds of things they are adequately protected against. You can set up Tmux logging on your system as follows:

First, clone the Tmux Plugin Manager repo to your home dir.

```bash
d41y@htb[/htb]$ git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

Next, create a ```.tmux.conf``` file in the home directory.

```bash
d41y@htb[/htb]$ touch .tmux.conf
```

The config file should have the following contents:

```bash
d41y@htb[/htb]$ cat .tmux.conf 

# List of plugins

set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'tmux-plugins/tmux-logging'

# Initialize TMUX plugin manager (keep at bottom)
run '~/.tmux/plugins/tpm/tpm'
```

After creating this config file, you need to execute it in your current session, so the settings in the ```.tmux.conf``` file take effect. You can do this with the source command.

```bash
d41y@htb[/htb]$ tmux source ~/.tmux.conf 
```

Next, you can start a new Tmux session.

Once in the session, type ```[CTRL] + [B]``` and then hit ```[Shift] + [I]```, and the plugin will install.

Once the plugin is installed, start logging the current session by typing ```[CTRL] + [B]``` followed by ```[CTRL] + [P]``` to begin logging. If all went as planned, the bottom of the window will show that logging is enabled and the output file. To stop logging, repeat ```[CTRL] + [P]``` key combo or type exit to kill the session. Note that the log file will only be populated once you either stop logging or exit the Tmux session.

If you forget to enable Tmux logging and are deep into a project, you can perform retroactive logging by typing ```[CTRL] + [B]``` and then hitting ```[Alt] + [Shift] + [P]```, and the entire pane will be saved. The amount of saved data depends on the Tmux history-limit or the number of lines kept in the Tmux scrollback buffer. If this is left at the default value and you try to perform retroactive logging, you will most likely lose data from earlier in the assessment. To safeguard against this situation, you can add the following lines to the ```.tmux.conf``` file:

```bash
set -g history-limit 50000
```

Another handy trick is the ability to take a screen capture of the current Tmux window or an individual pane. Say you are working with a split window, one with Responder and one with ntlmrelayx.py. If you attempt to copy/paste the output from one pane, you will grab data from the other pane along with it, which will look messy and require cleanup. You can avoid this by taking a screen capture as follows: ```[CTRL] + [B]``` followed by ```[Alt] + [P]```.

There are many other things you can do with Tmux, customizations you can do with Tmux logging. It is worth reading up on all the capabilities that Tmux offers and finding out how the tool best fits your workflow. Finally, here are some additional plugins that you might like:

- [tmux-sessionist](https://github.com/tmux-plugins/tmux-sessionist) - Gives you the ability to manipulate Tmux sessions from within a session: switching to another session, creating a new named session, killing a session without detaching Tmux, promote the current pane to a new session, and more.
- [tmux-pain-control](https://github.com/tmux-plugins/tmux-pain-control) - A plugin for controlling panes and providing more intuitive key bindings for moving around, resizing, and splitting panes.
- [tmux-resurrect](https://github.com/tmux-plugins/tmux-resurrect) - This extremely handy plugin allows you to restore your Tmux environment after your host restarts. Some features include restoring all sessions, windows, panes, and their order, restoring running programs in a pane, restoring Vim sessions, and more.

#### Artifacts Left Behind

At a minimum, you should be tracking when a payload was used, which host it was used on, what file path it was placed in on the target, and whether it was cleaned up or needs to be cleaned by the client. A file hash is also recommended for ease of searching on the client's part. It's best practice to provide this information even if you delete any web shells, payloads, or tools.

##### Account Creation / System Modifications

If you create accounts or modify system settings, it should be evident that you need to track those things in case you cannot revert them once the assessment is complete. Some examples include:

- IP address of the host(s)/hostname(s) where the change was made
- Timestamp of the change
- Location on the host(s) where the change was made
- Name of the application or service that was tampered with
- Name of the account and perhaps the password in case you are required to surrender it

It should go without saying, but as a professional and to prevent creating enemies out of the infrastructure team, you should get written approval from the client before making these types of system modifications or doing any sort of testing that might cause an issue with system stability or availability. This can typically be ironed out during the project kickoff call to determine the treshold beyond which the client is willing to tolerate without being notified.

#### Evidence

No matter the assessment type, your client does not care about the cool exploit chains you pull off or how easily you "pwned" their network. Ultimately, they are paying for the report deliverable, which should clearly communicate the issues discovered and evidence that can be used for validation and reproduction. Without clear evidence, it can be challenging for internal security teams, sysadmins, devs, etc., to reproduce your work while working to implement a fix or even to understand the nature of the issue.

##### What to Capture

As you know, each finding will need to have evidence. It may also be prudent to collect evidence of tests that were performed that were unsuccessful in case the client questions your thoroughness. If you're working on the command line, Tmux logs may be sufficient evidence to paste into the report as literal terminal output, but they can be horribly formatted. For this reason, capturing your terminal output for siginificant steps as you go along and tracking that separately alongside your findings is a good idea. For everything else, screenshots should be taken.

##### Storage

Much like with your notetaking, it's a good idea to come up with a framework for how you organize the data collected during an assessment. This may seem like overkill on smaller assessments, but if you're testing in a large environment and don't have a structured way to keep track of things, you're going to end up forgetting something, violating the rules of engagement, and probably doing things more than once which can be a huge time waster, especially during a time-boxed assessment. Below is a suggested baseline folder structure, but you may need to adapt it accordingly depending on the type of assessment you're performing or unique circumstances.

- **Admin**
  - Scope of Work (_SoW_) that you're working off of, your notes from the project kickoff meeting, status reports, vulnerability notifications, etc
- **Deliverables**
  - Folder for keeping your deliverables as you work through them. This will often be your report but can include other items such as supplemental spreadsheets and slide decks, depending on the specific client requirements
- **Evidence**
  - Findings
    - It's suggested creating a folder for each finding you plan to include in the report to keep your evidence for each finding in a container to make piecing the walkthrough together easier when you write the report.
  - Scans
    - Vuln scans
      - Export files from your vuln scanner for archiving
    - Service enum
      - Export files from tools you use to enumerate services in the target environment like Nmap, Masscan, Rumble, etc.
    - Web
      - Export files for tools such as ZAP or Burp state files, EyeWitness, Aquatone, etc.
    - AD enum
      - JSON files from Bloodhound, CSV files generated from PowerView or ADRecon, Ping Castle data, Snaffler log files, CME logs, data from Impacket tools, etc.
  - Notes
    - A folder to keep your notes in.
  - OSINT
    - Any OSINT output from tools like Intelx and Maltego that doesn't fit well in your notes document.
  - Wireless
    - Optional if wireless testing is in scope, you can use this folder for output from wireless testing tools.
  - Logging output
    - Logging output from Tmux, Metasploit, and any other log output that does not fit the "Scan" subdirectories listed above.
  - Misc files
    - Web shells, payloads, custom scripts, and any other files generated during the assessment that are relevant to the project.
  - **Retest**
    - This is an optional folder if you need to return after the original assessment and retest the previously discovered findings. You may want to replicate the folder structure you used during the initial assessment in this directory to keep your retest evidence separate from your original evidence.

It's a good idea to have scripts and tricks for setting up at the beginning of an assessment. You could take the following command to make your dirs and subdirs and adapt it further.

```bash
d41y@htb[/htb]$ mkdir -p ACME-IPT/{Admin,Deliverables,Evidence/{Findings,Scans/{Vuln,Service,Web,'AD Enumeration'},Notes,OSINT,Wireless,'Logging output','Misc Files'},Retest}

d41y@htb[/htb]$ tree ACME-IPT/

ACME-IPT/
├── Admin
├── Deliverables
├── Evidence
│   ├── Findings
│   ├── Logging output
│   ├── Misc Files
│   ├── Notes
│   ├── OSINT
│   ├── Scans
│   │   ├── AD Enumeration
│   │   ├── Service
│   │   ├── Vuln
│   │   └── Web
│   └── Wireless
└── Retest
```

#### Formatting and Redaction

Creds and Personal Identifiable Information (_PII_) should be redacted in screenshots and anything that would be morally objectionable, like graphic material or perhaps obscene comments and language. You may also consider the following:

- Adding annotations to the image like arrows or boxes to draw attention the important items in the screenshot, particularly if a lot is happening in the image.
- Adding a minimal border around the image to make it stand out against the white background of the document.
- Cropping the image to only display the relevant information.
- Inlcude the adress bar in the browser or some other information indicating what URL or host you're connected to.

##### Screenshots

Wherever possible, you should try to use terminal output over screenshots of the terminal. It is easier to redact, highlight the important parts, typically looks neater in the document, and can avoid the document from becoming a massive, unwidely file if you have loads of findings. You should be careful not to alter terminal output since you want to give an exact representation of the command you ran and the result. It is OK to shorten/cut out the unnecessary output and mark the removed portion with ```<SNIP>``` but never alter output or add things that were not in the original command or output. Using text-based figures also makes it easier for the client to copy/paste to reproduce your results. It's also important that the source material that you're pasting from has all formatting stripped before going into your Word document. If you're pasting text that has embedded formatting, you may end up pasting non UTF-8 encoded chars into your commands, which may actually cause the command to not work correctly when the client tries to repdroduce it.

One common way of redacting screenshots is through pixelation or blurring using a tool such as Greenshot. [Research](https://www.bleepingcomputer.com/news/security/researcher-reverses-redaction-extracts-words-from-pixelated-image/) has shown that this method is not foolproof, and there's a high likelihood that the original data could be recovered by reversing the pixelation/blurring technique. This can be done with a tool such as [Unredacter](https://github.com/bishopfox/unredacter). Instead, you should avoid this technique and use black bars over the text you would like to redact. You should edit the image directly and not just apply a shape in MS Word, as someone with access to the document could easily delete this. As an aside, if you are writing a blog post or something on the web with redacted sensitive data, do not rely on HTML/CSS styling to attempt to obscure the text as this can easily be viewed by highlighting the text or editing the page source temporarily. When in doubt, use console output but if you must use a terminal screenshot, then make sure you are appropriately redacting information.

##### Terminal

Typically the only thing that needs to be redacted from terminal output is credentials. This includes password hashes. For password hashes, you can usually just strip out the middle of them and leave the first and last 3 or 4 chars to show there was actually a hash there. For cleartext creds or any other human-readable content that needs to be obfuscated, you can just replace it with a ```<REDACTED>``` or ```<PASSWORD REDACTED>``` placeholder, or similar.

You should also consider color-coded highlighting in your terminal output to highlight the command that was run and the interesting output from that command. This enhances the reader's ability to identify essential parts of the evidence and what to look for if they try to reproduce it on their own. If you're working on a complex web payload, it can be difficult to pick out the payload in a gigantic URL-encoded request wall of text if you don't do this for this for a living. You should take all opportunities to make the report clearer to your readers, who will often not have as deep an understanding of the environment as you do by the end of the assessment.

#### What Not to Archive

When starting a pentest, you are being trusted by your customers to enter their network and "do no harm" wherever possible. This means not bringing down any hosts or affecting the availability of applications, not changing passwords, making significant or difficult-to-reverse configuration changes, or viewing or removing certain types of data from the environment. This data may include unredacted PII, potentially criminal info, anything considered legally "discoverable", etc. For example, if you gain access to a network share with sensitive data, it's probably best to just screenshot the directory with the files in it rather than opening individual files and screenshotting the file contents. If the files are as sensitive as you think, they'll get the message and know what's in them based on the file name. Collecting actual PII and extracting it from the target environment may have significant compliance obligations for storing and processing that data like GDPR and the like and could open up a slew of issues for your company and you.

### Types of Reports

#### Differences Across Assessment Types

##### Vulnerability Assessment

Vulnerability assessments involve running an automated scan of an environment to enumerate vulnerabilities. These can be authenticated or unauthenticated. No exploitation is attempted, but you will often look to validate scanner results so your report may show a client which scanner results are actual issues and which are false positives. Validation may consist of performing an additional check to confirm a vulnerable version is in use or a setting/misconfig is in place, but the goal is not to gain a foothold and move laterally/vertically. Some customers will even ask for scan results with no validation.

##### Internal vs External

An external scan is performed from the perspective of an anonymous user on the internet targeting the organization's public systems. An internal scan is conducted from the perspective of a scanner on the internal network and investigates hosts from behind the firewall. This can be done from the perspective of an anonymous user on the corporate user network, emulating a compromised server, or any number of different scenarios. A customer may even ask for an internal scan to be conducted with credentials, which can lead to considerably more scanner findings to sift through but will also produce more accurate and less generic results.

##### Report Contents

These reports typically focus on themes that can be observed in the scan results and highlight the number of vulns and their severity levels. These scans can produce a LOT of data, so identifying patterns and mapping them to procedural deficiencies is important to prevent the information from becoming overwhelming.

#### Pentesting

Pentesting goes beyond automated scans and can leverage vulnerability scan data to help guide exploitation. Like vulnerability scans, these can be performed from an internal or external perspective. Depending on the type of pentest, you may not perform any kind of vulnerability scanning at all.

A pentest may be performed from various perspectives, such as "black box", where you have no more information than the name of the company during an external or a network connection for an internal, "grey box" where you are given just in-scope IP addresses/CIDR network ranges, or "white box" where you may be given creds, source code, configurations, and more. Testing can be performed with zero evasion to attempt to uncover as many vulns as possible, from a hybrid evasive standpoint to test the customer's defenses by starting out evasive and gradually becoming "noisier" to see at what level internal security teams/monitoring tools detect and block you. Typically once you are detected in this type of assessment, the client will ask you to move to non-evasive testing for the remainder of the assessment. This is a great assessment type to recommend to clients with some defenses in place but not a highly mature defensive security posture. It can help to show gaps in their defenses and where they should concentrate efforts on enhancing their detection and prevention rules. For more mature clients, this type of assessment can be a great test of their defenses and internal procedures to ensure that all parties perform their roles properly in the event of an actual attack.

Finally, you may be asked to perform evasive testing throughout the assessment. In this type of assessment, you will try to remain undetected for as long as possible and see what kind of access, if any, you can obtain while working stealthily. This can help to simulate a more advanced attacker. However, this type of assessment is often limited by time constraints that are not in place for a real-world attacker. A client may also opt for a longer-term adversary simulation that may occur over multiple months, with few company staff aware of the assessment and few or no client staff knowing the exact start day/time of the assessment. This assessment type is well-suited for more security mature organizations and requires a bit of a different skill set than a traditional network/application pentester.

##### Internal vs External

Similar to vulnerability scanning perspectives, external pentesting will typically be conducted from the perspective of an anonymous attacker on the internet. It may leverage OSINT data/publicly available information to attempt to gain access to sensitive data via applications or the internal network by attacking internet-facing hosts. Internal pentesting may be conducted as an anonymous user on the internal network or as an authenticated user. It is typically conducted to find as many flaws as possible to obtain a foothold, perform horizontal and vertical privesc, move laterally, and compromise the internal network.

#### Inter-Disciplinary Assessments

Some assessments may require involvement from people with diverse skillsets that complement one another. While logistically more complex, these tend to organically be more collaborative in nature between the consulting team and the client, which adds tremendous value to the assessment and trust in relationship. Some examples of these types of assessments include:

- Purple Team Style
- Cloud Focused Pentesting
- Comprehensive IoT

#### Web Application Pentesting

Depending on the scope, this type of assessment may also be considered an inter-disciplinary assessment. Some application assessments may only focus on identifying and validating the vulnerabilities in an application with role-based, authenticated testing with no interest in evaluating the underlying server. Others may want to test both the application and the infrastructure with the intent of initial compromise being through the web application itself and then attempting to move beyond the application to see what other hosts and systems behind it exist that can be compromised. The latter type of assessment would benefit from someone with a development and application testing background for initial compromise and then perhaps a network-focused pentester to "live off the land" and move around or escalate privileges through AD or some other means beyond the application itself.

#### Hardware Pentesting

This type of testing is often done on IoT-type devices but can be extended to testing the physical security of a laptop shipped by the client or an onsite kiosk or ATM. Each client will have different comfort level with the depth of testing here, so it's vital to establish the rules of engagement before the assessment begins, particularly when it comes to destructive testing. If the client expects their device back in one piece and functioning, it is likely inadvisable to try desoldering chips from the motherboard or similar attacks.

#### Draft Report

It is becoming more commonplace for clients to expect to have a dialogue and incorporate their feedback into a report. This may come in many forms, whether they want to add comments on how they plan to address each finding, tweak potentially inflammatory language, or move things around to where it suits their needs better. For these reasons, it's best to plan on submitting a draft report first, giving the client time to review it on their own, and then offering a time slot where they can review it with you to ask questions, get clarification, or explain what they would like to see. The client is paying for the report deliverable in the end, and you must ensure it is as thorough and valuable to them as possible. Some will not comment on the report at all, while others will ask for significant changes/additions to help it suit their needs, whether it be to make it presentable to their board of directors for additional funding to use the report as an input to their security roadmap for performing remediation and hardening their security posture.

#### Final Report

Typically, after reviewing the report with the client and confirming that they are satisfied with it, you can issue the final report with any necessary modifications. This may seem like a frivolous process, but several auditing firms will not accept a draft report to fulfill their compliance obligations, so it's important from the client's perspective.

##### Post-Remediation Report

It is also common for a client to request that the findings you discovered during the original assessment be tested again again after they've had an opportunity to correct them. This is all but required for organizations beholden to a compliance standard such as PCI. You should not be redoing the entire assessment for this phase of the assessment. But instead, you should be focusing on retesting only the findings and only the hosts affected by those findings from the original assessment. You also want to ensure that there is a time limit on how long after the initial assessment you perform remediation testing. Here are some of the things that might happen if you don't.

- The client asks you to test their remediation several months or even a year or more later, and the environment has changed so much that it's impossible to get an "apples to apples" comparison.
- If you check the entire environment for new hosts affected by a given finding, you may discover new hosts that are affected and fall into an endless loop of remediation testing the new hosts you discovered last time.
- If you run new large-scale scans like vulnerability scans, you will likely find stuff that wasn't there before, and your scope will quickly get out of control.
- If a client has a problem with the "snapshot" nature of this type of testing, you could recommend a Breach and Attack Simulation (_BAS_) type tool to periodically run those scenarios to ensure they do not continue popping up.

If any of these situations occur, you should expect more scrutiny around severity levels and perhaps pressure to modify things that should not be modified to help them out. In these situations, your response should be carefully crafted to be both clear that you're not going to cross ethical boundaries, but also commiserate with their situation and offer some ways out of it for them. This allows you to keep your integrity intact, fosters the feeling with the client that you sincerely care about their plight, and gives them a path forward without having to turn themselves inside out to make it happen.

One approach could be to treat this as a new assessment in these situations. If the client is unwilling, then you would likely want to retest just the findings from the original report and carefully note in the report the length of time that has passed since the original assessment, that this is a point in time check to assess whether ONLY the previously reported vulns affect the originally reported host or hosts and that it's likely the client's environment has changed significantly, and a new assessment was not performed.

In terms of report layout, some folks may prefer to update the original assessment by tagging affected hosts in each finding with a status, while others may prefer to issue a new report entirely that has some additional comparison content and an updated executive summary.

#### Attestation Report

Some clients will request an Attestation Letter or Attestation Report that is suitable for their vendors or customers who require evidence that they've had a pentest done. The most significant difference is that your client will not want to hand over the specific technical details of all of the findings or credentials or other secret information that may be included to a third party. This document can be derived from the report. It should focus only on the number of findings discovered, the approach taken, and general comments about the environment itself. This document should likely only be a page or two long.

#### Other Deliverables

##### Slide Deck

You may also be requested to prepare a presentation that can be given at several different levels. Your audience may be technical, or they may be more executive. The language and focus should be as different in your executive presentation as the executive summary is from the technical finding details in your report. Only including graphs and numbers will put your audience to sleep, so it's best to be prepared with some anecdotes from your own experience or perhaps some recent current events that correlate to a specific attack vector or compromise. Bonus points if said story is in the same industry as your client. The purpose of this is not fear-mongering, and you should be careful not to present it that way, but it will help hold your audience's attention. It will make the risk relatable enough to maximize their chances of doing something about it.

##### Spreadsheet of Findings

The spreadsheet of findings should be pretty self-explanatory. This is all of the fields in the findings of your report, just in a tabular layout that the client can use for easier sorting and other data manipulation. This may also assist them with importing those findings into a ticketing system for internal tracking purposes. This document should not inlcude your executive summary or narratives. Ideally, learn how to use pivot tables and use them to create some interesting analytics that the client might find interesting. The most helpful objective in doing this is sorting findings by severity or category to help prioritize remediation.

#### Vulnerability Notifications

Sometimes during an assessment, you will uncover a critical flaw that requires you to stop work and inform your clients of an issue so they can decide if they would like to issue an emergency fix or wait until after the assessment is over.

##### When to draft one

At a minimum, this should be done for any finding that is directly exploitable that is exposed to the internet and results in unauthenticated remote code execution or sensitive data exposure, or leverage weak/default credentials for the same. Beyond that, expectations should be set for this during the project kickoff process. Some clients may want all high and critical findings reported out-of-band regardless of whether they're internal or external. Some folks may need mediums as well. It's usually best to set a baseline for yourself, tell the client what to expect, and let them ask for modifications to the process if they need them.

##### Contents

Due to the nature of these notifications, it's important to limit the amount of fluff in these documents so the technical folks can get right to the details and begin fixing the issue. For this reason, it's probably best to limit this to the typical content you have in the technical details of your findings and provide tools-based evidence for the finding that the client can quickly reproduce if needed.

