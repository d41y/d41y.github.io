- [Pentest Documentation \& Reporting](#pentest-documentation--reporting)
  - [Preparation](#preparation)
    - [Notetaking \& Organization](#notetaking--organization)
      - [Notetaking Sample Structure](#notetaking-sample-structure)
      - [Notetaking Tools](#notetaking-tools)
      - [Logging](#logging)
        - [Exploitation Attempts](#exploitation-attempts)
      - [Artifacts Left Behind](#artifacts-left-behind)

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

