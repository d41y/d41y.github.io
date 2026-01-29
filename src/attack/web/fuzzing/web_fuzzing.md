# Web Fuzzing

## Introduction

### Fuzzing vs. Brute-Forcing

- **Fuzzing** casts a wider net. It involves feeding the web application with unexpected inputs, including malformed data, invalid chars, and nonsensical combinations. The goal is to see how the application reacts to these strange inputs and uncover potential vulns in handling unexpected data. Fuzzing tools often leverage wordlists containing common patterns, mutations of existing parameters, or even random char sequences to generate a diverse set of payloads.
- **Brute-forcing**, on the other hand, is a more targeted approach. It focuses on systematically trying out many possibilities for a specific value, such as a password or an ID number. Brute-forcing tools typically rely on predefined lists or dictionaries to guess the correct value through trial and error.

### Why Fuzz Web Applications?

Web apps have become the backbone of modern business and communication, handling vast amounts of sensitive data and enabling critical online interactions. However, their complexity and interconnectedness also make them prime targets for cyberattacks. Manual testing, while essential, can only go so far in identifying vulns. Here's where web fuzzing shines:

- **Uncovering Hidden Vulns**: Fuzzing can uncover vulns that traditional security testing methods might miss. By bombarding a web application with unexpected and invalid inputs, fuzzing can trigger unexpected behaviors that reveal hidden flaws in the code.
- **Automating Security Testing**: Fuzzing automates generating and sending test inputs, saving valuable time and resources. This allows security teams to focus on analyzing results and addressing the vulns found.
- **Simulating Real-World Attacks**: Fuzzers can mimic attacker's techniques, helping you identify weaknesses before malicious actors exploit them. This proactive approach can significantly reduce the risk of a successful attack.
- **Strengthening Inut Validation**: Fuzzing helps identify weaknesses in input validation mechanisms, which are crucial for preventing common vulns like SQLi and XSS.
- **Improving Code Quality**: Fuzzing improves overall code quality by uncovering bugs and errors. Devs can use the feedback from fuzzing to write more robust and secure code.
- **Continuous Security**: Fuzzing can be integrated into the software development lifecycle as part of continuous integration and continuous deployment pipelines (_CI/CD_), ensuring that security testing is performed regularly and vulns are caugth early in the development process.

### Essential Concepts

| Concept | Description | Example |
| ------- | ----------- | ------- |
| Wordlist | A dictionary or list of words, phrases, file, names, directory names, or parameter value used as input during fuzzing | admin, logon, password, backup, config |
| Payload | The actual data sent to the web app during fuzzing. Can be a simple string, numerical value, or complex data structure. | `' OR 1=1 --` |
| Response Analysis | Examining the web app's responses to the fuzzer's payloads to identify anomalies that might indicate vulns. | 200 OK, 500 Internal Server Error |
| Fuzzer | A software tool that automates generating and sending payloads to a web app and analyzing the responses. | ffuf, wfuzz, Burp |
| False Positive | A result that is incorrectly identified as a vuln by the fuzzer. | A 404 Not Found error for a non-existent directory. |
| False Negative | A vuln that exists in the web application but is not detected by the fuzzer. | A subtle logic flaw in a payment processing function. |
| Fuzzing Scope | The specific parts of the web application that you are targeting with your fuzzing efforts. | Only fuzzing the login page or focusing on a particular API endpoint. |

