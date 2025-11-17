- [Common Application Hardening](#common-application-hardening)
  - [General Hardening Tips](#general-hardening-tips)
  - [Application-Specific Hardening Tips](#application-specific-hardening-tips)

---

# Common Application Hardening

The first step for any organization should be to create a detailed application inventory of both internal and external-facing applications. This can be achieved in many ways, and blue teams on a budget could benefit from pentesting tools such as nmap and EyeWitness to assist in the process. Various open-source and paid tools can be used to create and maintain this inventory. Without knowing what exists in the environment, you won't know what to protect! Creating this inventory may expose instances of "shadow IT", deprecated applications that are no longer needed, or even issues such as a trial version of a tool being converted to a free version automatically.

## General Hardening Tips

- **Secure authentication**: Applications should enforce strong passwords during registration and setup, and default administrative account passwords should be changed. If possible, the default administrative accounts should be disabled, with new custom administrative accounts created. Some applications inherently support 2FA authentication, which should be made mandatory for at least administrator-level users.
- **Access controls**: Proper access control mechanisms should be implemented per application. For example, login pages should not be accessible from the external network unless there is a valid business reason for this access. Similarly, file and folder permissions can be configured to deny uploads or application deployments.
- **Disable unsafe features**: Features such as PHP code editing in WordPress can be disabled to prevent code execution if the server is compromised.
- **Regular updates**: Applications should be updated regularly, and patches supplied by vendors should be applied as soon as possible.
- **Backups**: System administrators should always configure website and database backups, allowing the application to be quickly restored in case of a compromise.
- **Security monitoring**: There are various tools and plugins that can be used to monitor the status and various security-related issues for your applications. Another option is a WAF. While not a silver bullet, a WAF can help add an extra layer of protection provided all the measures above have already been taken.
- **LDAP integration with AD**: Integrating applications with AD single sign-on can increase ease of access, provide more auditing functionality, and make managing credentials and service accounts more streamlined. It also decreases the number of accounts and passwords that a user will have to remember and give fine-grained control over the password policy.

Every application should be following key hardening guidelines such as enabling multi-factor authentication for admins and users wherever possible, changing the default admin user account names, limiting the number of admins, and how admins can access the site, enforce the principle of least privilege throughout the application, perform regular updates to address security vulns, taking regular backups to a secondary location to be able to recover quickly in the event of an attack and implement security monitoring tools that can detect and block malicious activity and account brute-forcing, among other attacks.

Finally, you should be careful with what you expose to the internet.

You should also perform regular checks and updates to your application inventory to ensure that you are not exposing applications on the internet or external network that are not longer needed or have security flaws. Finally, perform regular assessments to look for security vulns and misconfigs as well as sensitive data exposure. Follow through on remediation recommendations included in your pentesting reports and periodically check for the same types of flaws discoverd by your pentesters. Some could be process-related, requiring a mindset shift for the organization to become more security conscious.

## Application-Specific Hardening Tips

| Application | Hardening Category | Discussion |
| ----------- | ------------------ | ---------- |
| WordPress | Security monitoring | Use a security plugin such as WordFence which includes security monitoring, blocking of suspicious activity, country blocking, 2FA, and more. |
| Joomla | Access controls | A plugin such as AdminExile can be used to require a secret key to log in to the Joomla admin page such as ```http://joomla.inlanefreight.local/administrator?thisismysecretkey```. |
| Drupal | Access controls | Disable, hide, or move the admin login page. |
| Tomcat | Access controls | Limit access to the Tomcat Manager and Host-Manager applications to only localhost. If these must be exposed externally, enforce IP whitelisting and set a very strong password and non-standard username. |
| Jenkins | Access controls | Configure permissions using the Matrix Authorization Strategy plugin. |
| Splunk | Regular updates | Make sure to change the default password and ensure that Splunk is properly licensed to enforce authentication. |
| PRTG Network Monitor | Secure authentication | Make sure to stay up-to-date and change the default PRTG password. |
| osTicket | Access controls | Limit access from the internet if possible. |
| GitLab | Secure authentication | Enforce sign-up restrictions such as requiring admin approval for new sign-ups configuring allowed and denied domains. |