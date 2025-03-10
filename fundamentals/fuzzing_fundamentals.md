- [Fuzzing](#fuzzing)
  - [Wordlists](#wordlists)
  - [ffuf](#ffuf)

---

# Fuzzing

... refers to a testing technique that sends various types of user input to a certain interface to study how it would react. If you were fuzzing for SQLi vulnerabilities, you would be sending random special characters and seeing how the server would react. If you were fuzzing for a buffer overflow, you would be sending long strips and incrementing their length to see if and when the binary would break.

You usually utilize pre-defined wordlists of commonly used terms for each type of test for web fuzzing to see if the webserver would accept them. This is done because web servers do not usually provide a directory of all available links and domains, and so you would have to check for various links and see which ones return pages.

## Wordlists

To determine which pages exist, you shoud have a wordlist containing commonly used words for web directories and pages. [SecLists](https://github.com/danielmiessler/SecLists) might help.

## ffuf

