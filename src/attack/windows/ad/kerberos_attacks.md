# Kerberos Attacks

## Introduction

### Kerberos Authentication Process

In Kerberos context, there are three entities when a user want to access a service; the user, the service, and the authentication server, also known as the Key Distribution Center, or KDC.

The KDC is the entity that knows all accounts' credentials.

#### Why Kerberos

On the one hand, it is used to centralize authentication to avoid all services having to know every user's credentials. This is extremely pratical in a context where users are regularly updated, whether because of a password change, the addition of a new user, or the deactivation or deletion of a user. If all services had to know the status of all users, this would create immense complexity. Instead, only one entity, the KDC, must have an up-to-date list of existing users.

On the other hand, this protocol allows users to authenticate against services without sending a password over the network. This is an excellent security measure to protect against man-in-the-middle attacks.

#### High-level Overview

##### Tickets

To meet both ends, Kerberos uses secret keys and a ticketing mechanism. The secret keys are, in practice, in an AD environment, the passwords of the different accounts.

From a high-level perspective, here's how a user can access a service.

1. To start, the user will request the first ticket from the KDC, proving they are who they claim to be. This is when the client authenticates to the KDC. This ticket, called a TGT, is the user's identity card. It contains all the information about the user, such as name, date of account creation, security information about the user, the groups to which the user belongs, etc. This identity card, the TGT, is limited to a few hours only by default. This ticket is presented for all other requests to the KDC.
2. Once this TGT has been obtained, the user will present it to the KDC each time they need to access a service. The KDC will then verify that the submitted TGT is valid and that the user did not forge it, and if so, it will return a TGS or ST to the user. A copy of the user's information in the TGT is included in the TGS ticket.
3. Now that the user has a TGS ticket for a particular service, they will present this TGS ticket to the service to use it. The service will the check the validity of this ticket, and if all is well, it will read the content of the user's information to determine if the user is entitled to use the requested service. It is, therefore, the service that checks the user's access rights.

##### Ticket Protection

The information on a user provided by the KDC must be protected. The user must not be able to forge it. This is where encryption comes into play.

Each account has a password or secret, which acts as an encryption and decryption key. The KDC knows the keys of all users. To protect the tickets, here is how these keys are used.

1. The TGT sent by the KDC to the user is encrypted using the secret key of the KDC, which only the KDC knows. Thus, the user cannot read or modify the information about themself. The KDC itself protects it.
2. The TGS ticket sent by the KDC to the user is encrypted using the service's secret key. In the same way, as the user does not know the service key, they cannot modify the information in the TGS ticket. On the other hand, when they send this TGS ticket to the service, the latter can decrypt the ticket's content and read the user's information.

##### Technical Details

You've seen that access to a service is carried out in three phases:

1. TGT request: Authentication Service (_AS_)
2. TGS request: Ticket-Granting Service (_TGS_)
3. Service request: Application Request (_AP_)

#### Authentication Service (_AS_)

##### Request (_AS-REQ_)

First, the user makes a TGT request. This request is called AS-REQ. But to receive the TGT, they must be able to prove their identity. This request is made to the KDC. The KDC holds all user keys.

To prove their identity, the user will send an authenticator. It's the current timestamp that the user will encrypt with their key. The username is also sent so the KDC can know whom it is dealing with.

Upon receiving this request, the KDC will retrieve the username, look for the associated key in its directory, and attempt to decrypt the authenticator. If it succeeds, it means that the user has used the same key as the one registered in its database, so they are authenticated. Otherwise, authentication fails.

This step, called pre-authentication, is not mandatory, but all accounts must do it by default. However, it should be noted that an administrator can disable pre-authentication. In this case, the client no longer needs to send an authenticator. The KDC will send the TGT no matter what happens.

##### Response (_AS-REP_)

The KDC, therefore, received the client's request for a TGT. If the KDC successfully decrypts the authenticator, it sends a response called AS-REP to the user.

To protect the rest of the exchanges, the KDC will generate a temporary session key before replying to the user. The client will use this key for further exchanges. The KDC avoids encrypting all information with the user's key.

There are two elements that you will find in the AS-REP response:

1. First, you are waiting for the TGT that the user requested. It contains all the user's information and is protected with the KDC's key, so the user can't tamper with it. It also contains a copy of the generated session key.
2. Second is the session key, but this time protected with the user's key.

#### Ticket-Granting Service (_TGS_)

The TGS is a component of the KDC that is responsible for issuing service tickets.

Typically hosted on a DC in the AD domain. When a user or computer requests a service ticket, the request is sent to the TGS component of the KDC, which verifies the user's or computer's identity and checks their authorization to access the requested resource before issuing a service ticket that can be used to gain access to the resource.

##### Request (_TGS-REQ_)

The client now has a response from the server to its TGT request. This response contains the TGT, protected by the KDC's key, and a session key.

The next step for the user is to request a ST or TGS with a TGS-REQ message. To do this, they will transmit three things to the KDC:

1. The name of the service they wish to access
2. The TGT they previously received, containing their information and a copy of the session key
3. An authenticator, which will be encrypted using the session key at this time

##### Response (_TGS-REP_)

The KDC receives this TGS request, but Kerberos is a stateless procol. Thus, the KDC has no idea what information has been exchanged before. It must still verify that the TGS request is valid. It must verify that the authenticator has been encrypted with the correct session key to do this. And how does the KDC know if the session key used is correct? Remember that there was a copy of the session key in the TGT. The KDC will decrypt the TGT and extract the session key. With this session key, it will be able to verify the authenticator's validity.

If all this is done correctly, the KDC only has to read the requested service and respond to the user with a TGS-REP message. You saw earlier that a session key had been generated for the exchanges between the user and the KDC. Well, it's the same thing here. A new session key is generated for future exchanges between the user and the service. And as before, this session key will be present in two places in the response sent by the KDC to the user. Here are all the elements sent by the KDC:

A service ticket or TGS ticket containing three elements:

1. The name of the requested service (_its SPN_)
2. A copy of the user information that was present in the TGT. The service will read this information to determine whether or not the user has the right to use it.
3. A copy of the session key

All this information is encrypted with the user/KDC session key. Within this encrypted response, the user's information and the copy of the user/service session key are also encrypted with the service key.

#### Application Request (_AP_)

##### Request (_AP-REQ_)

The user can now decrypt this response to extract the user/service session key and the TGS ticket, but the TGS ticket is protected with the service key. The user can't modify this TGS ticket, so they can't modify their rights, just like with the TGT.

The user will only transmit this TGS ticket to the service, and just like with the TGS request, an authenticator is added to it. What will the user encrypt this authenticator with? With the user/service session key just extracted.

##### Response (_AP-REP_)

The service finally receives the TGS ticket and an authenticator encrypted with the user/service session key generated by the KDC. This TGS ticket is protected with the service's key so that it can decrypt it. Remember that a copy of the user/service session key is embedded within the TGS ticket, so it can extract it and check the validity of the authenticator with this session key.

If everything goes correctly, the service can finally read the information about the user, including the groups to which they belong, and according to its access rules, grant or deny them access to the service. If authentication is successful, the service responds to the client with an AP-REP message by encrypting the timestamp with the extracted session key. The client can then verify that this message is coming from the service and can start issuing service requests.

## Roasting Attacks

