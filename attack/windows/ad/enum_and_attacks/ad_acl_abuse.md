- [ACL Abuse](#acl-abuse)
  - [Primer](#primer)
    - [ACL Overview](#acl-overview)
    - [Access Control Entries (_ACEs_)](#access-control-entries-aces)
    - [Importance of ACEs](#importance-of-aces)
    - [ACL Attacks in the Wild](#acl-attacks-in-the-wild)
  - [ACL Enumeration](#acl-enumeration)


# ACL Abuse

## Primer

### ACL Overview

In their simplest form, ACLs are lists that define who has access to which asset/resource and the level of access they are provisioned. The settings themselves in an ACL are called Access Control Entries (_ACEs_). Each ACE maps back to a user, group, or process and defines the rights granted to that prinicpal. Every object has an ACL, but can have multiple ACEs because multiple security principals can access objects in AD. ACLs can also be used for auditing access within AD.

Two types of ACLs:

1. **Discretionary Access Control List (_DACL_)**: defines which security principals are granted or denied access to an object. DACLs are made up of ACEs that either allow or deny access. When someone attempts to access an object, the system will check the DACL for the level of access that is permitted. If a DACL does not exist for an object, all who attempt to access the object are granted full rights. If a DACL exists, but does not have any ACE entries specifying specific security settings, the system will deny access to all users, groups, or processes, attempting to access it.
2. **System Access Control List (_SACL_)**: allow administrators to log access attempts made to secured objects.

You see that ACL for the user account forend in the image below. Each item under ```Permission entries``` make up the DACL for the user account, while the individual entries are ACE entries showing rights granted over this user object to various users and groups.

![ad acl abuse 1](../../../../images/ad_acl_abuse1.png)

The SACLs can be seen within the ```Auditing``` tab.

![ad acl abuse 2](../../../../images/ad_acl_abuse2.png)

### Access Control Entries (_ACEs_)

As stated previously, ACLs contain ACE entries that name a user or group and the level of access they have over a given securable object. There are three main types of ACEs that can be applied to all securable objects.

| ACE | Description |
| --- | ----------- |
| Access denied ACE | Used within a DACL to show that a user or group is explicitly denied access to an object. |
| Access allowed ACE | Used within a DACL to show that a user or group is explicitly granted access to an object. |
| System audit ACE | Used within a SACL to generate audit logs when a user or group attempts to access an object. It records whether access was granted or not and what type of access occured. |

Each ACE is made up of the following four components:

1. The security identifier (_SID_) of the user/group that has access to the object
2. A flag denoting the type of ACE
3. A set of flags that specify whether or not child containers/objects can inherit the given ACE entry from the primary or parent object
4. An access mask which is a 32-bit value that defines the rights granted to an object

You can view this graphically in AD Users and Computers. In the example image below, you can see the following for the ACE entry for the user forend.

![ad acl abuse 3](../../../../images/ad_acl_abuse3.png)

1. The security principal is Angela Dunn
2. The ACE type is ```Allow```
3. Inheritance applies to the "This object and all descendant objects", meaning any child objects of the forend object would have the same permissions granted
4. The rights granted to the object, again shown graphically in this example

When ACLs are checked to determine permissions, they are checked from top to bottom until an access denied is found in the list.

### Importance of ACEs

Attackers utilize ACE entries to either further access or establish persistence. These can be great for you as pentesters as many organizations are unaware of the ACEs applied to each object or the impact that these can have if applied incorrectly. They cannot be detected by vulnerability scanning tools, and often go unchecked for many years, especially in large and complex environments. During an assessment where the client has taken care of all of the "low hanging fruit" AD flaws/misconfigs, ACL abuse can be a great way for you to move laterally/vertically and even achieve full domain compromise. Some example AD object security permissions are as follows. These can be enumerated using a tool such as BloodHound, and are full abusable with PowerView, among other tools:

- ```ForcedChangePassword``` abused with ```Set-DomainUserPassword```
- ```Add Members``` abused with ```Set-DomainGroupMember```
- ```GenericAll``` abused with ```Set-DomainUserPassword``` or ```Add-DomainGroupMember```
- ```GenericWrite``` abused with ```Set-DomainObject```
- ```WriteOwner``` abused with ```Set-DomainObjectOwner```
- ```WriteDACL``` abused with ```Add-DomainObjectACL```
- ```AllExtendedRights``` abused with ```Set-DomainUserPassword``` or ```Add-DomainGroupMember```
- ```AddSelf``` abused with ```Add-DomainGroupMember```

Read more about it [here](https://bloodhound.specterops.io/resources/edges/overview#about-bloodhound-edges).

![ad acl abuse 4](../../../../images/ad_acl_abuse4.png)

### ACL Attacks in the Wild

You can use ACL attacks for:

- Lateral Movement
- Privilege Escalation
- Persistence

Some common attack scenarios may include:

| Attack | Description |
| ------ | ----------- |
| Abusing forgot password permissions | Help Desk and other IT users are often granted permissions to perform password resets and other privileged tasks. If you can take over an account with these privileges, you may be able to perform a password reset for a more privileged account in the domain. |
| Abusing group membership management | It's also common to see Help Desk and other staff that have the right to add/remove users from a given group. It is always worth enumerating this further, as sometimes you may be able to add an account that you control into a privileged built-in AD group or a group that grants you some sort of interesting privilege. |
| Excessive user rights | You also commonly see user, computer, and group objects with excessive rights that a client is likely unaware of. This could occur after some sort of software install or some kind of legacy or accidental configuration that gives a user unintended rights. Sometimes you may take over an account that was given certain rights out of convenience or to solve a nagging problem more quickly. |

## ACL Enumeration

