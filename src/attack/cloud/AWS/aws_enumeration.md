# Enumerating AWS Cloud Infrastructure

## Reconnaissance of Cloud Resources on the Internet

### Domain and Subdomain Reconnaissance

Begin analyzing the target from the attacker's perspective. Currently, all you know about your target is its domain name: `offsec.io`.

There are several things you can learn by analyzing the domain and the public IP address.

Begin by getting the authoritative DNS servers, i.e. the name servers that contain all records for this domain. You'll use the `host` command with the `-t ns` argument to query the nameserver records of the `offsec.io` domain:

```bash
kali@kali:~$ host -t ns offseclab.io
offseclab.io name server ns-1536.awsdns-00.co.uk.
offseclab.io name server ns-512.awsdns-00.net.
offseclab.io name server ns-0.awsdns-00.com.
offseclab.io name server ns-1024.awsdns-00.org.
```

The names are very descriptive, and you can deduce the domain is managed by AWS. You can validate this by running the `whois` command to check the DNS registrar information of those domains. You'll pipe the output to the `grep` command to filter only the line that contains the organization name.

```bash
kali@kali:~$ whois awsdns-00.com | grep "Registrant Organization"
Registrant Organization: Amazon Technologies, Inc.
```

Now, you are sure that the `offsec.io` domain is managed by AWS, very likely using the [Route53](https://aws.amazon.com/route53/) service. This doesn't mean the rest of the infrastructure is also hosted in AWS, so you need to keep digging.

Continue by using the `host` command again to get the public IP address of the website `www.offsec.io`.

```bash
kali@kali:~$ host www.offseclab.io
www.offseclab.io has address 52.70.117.69
```

In the same way as before, you can learn some things by querying the DNS and doing a reverse DNS lookup. You'll use the `host` command again, but this time you'll query the public IP. You'll also use `whois` to learn more details about the public IP address, paying special attention to the OrgName value.

```bash
kali@kali:~$ host 52.70.117.69
69.117.70.52.in-addr.arpa domain name pointer ec2-52-70-117-69.compute-1.amazonaws.com

kali@kali:~$ whois 52.70.117.69 | grep "OrgName"
OrgName:        Amazon Technologies Inc.
```

With the whois lookup, you realize that the public IP belongs to Amazon and with the reverse lookup, you learn two things: it's a resource hosted in AWS and the resource is an Amazon Elastic Compute Cloud (_Amazon EC2_) instance.

> [!NOTE]
> The EC2 instance is a virtual machine in the AWS cloud. EC2 is a common service used to host websites, applications, and other services that require a server.

By doing some recon on the domain, you learned that the resource is hosted in a public CSP. This helps adapt your pentesting methodology and techniques to target the correct cloud environment.

Finally, you can run an automated tool that will retrieve some information you already have but will also perform a dictionary attack to discover more subdomains.

```bash
kali@kali:~$ dnsenum offseclab.io --threads 100
dnsenum VERSION:1.2.6

-----   offseclab.io   -----


Host's addresses:
__________________

offseclab.io.                            60       IN    A        52.70.117.69

Name Servers:
______________

ns-1536.awsdns-00.co.uk.                 0        IN    A        205.251.198.0
ns-0.awsdns-00.com.                      0        IN    A        205.251.192.0
ns-512.awsdns-00.net.                    0        IN    A        205.251.194.0
ns-1024.awsdns-00.org.                   0        IN    A        205.251.196.0


Mail (MX) Servers:
___________________



Trying Zone Transfers and getting Bind Versions:
_________________________________________________

Trying Zone Transfer for offseclab.io on ns-512.awsdns-00.net ...
AXFR record query failed: corrupt packet

Trying Zone Transfer for offseclab.io on ns-1024.awsdns-00.org ...
AXFR record query failed: corrupt packet

Trying Zone Transfer for offseclab.io on ns-0.awsdns-00.com ...
AXFR record query failed: corrupt packet

Trying Zone Transfer for offseclab.io on ns-1536.awsdns-00.co.uk ...
AXFR record query failed: corrupt packet


Brute forcing with /usr/share/dnsenum/dns.txt:
_______________________________________________
mail.offseclab.io.                       60       IN    A        52.70.117.69
www.offseclab.io.                        60       IN    A        52.70.117.69
...
```

The output confirms the name servers and the public IP address you got before. You also discovered some subdomains.

### Service-Specific Domains

Public CSPs often use a specific domain name to address cloud resources. You already found an example of this in the previous section when you did a DNS reverse lookup to the public IP address and, though the response (_ec2-52-70-117-69.compute-1.amazonaws.com_), you discovered the domain `amazonaws.com` and that they are using the EC2 service. That is the custom naming that AWS uses to create the PTR records for their public IPs assigned to EC2 instances.

You can leverage these naming conventions in public cloud resources to enumerate cloud resources.

Opening a web browser and navigating to the target:

![aws enumeration offsec 1](../../../images/aws_enumeration_offsec1.png)

By interacting with the site, you can learn that `offseclab.io` is an organization hosting vulnerable lab environments for learning purposes.

By visiting the domain, you're provided with an HTML file. At this point, you're unsure which, or even if, server-side scripting languages are in use. To inspect this further, use the Developer Tools to determine what assets the site loads when you browse it.

Inside the Developer Tools window, you'll navigate to the Network tab. This will show you all the requests that are made when loading the website. Once in the Network tab, you can reload the current page.

You receive a table with several elements that the website loads. This includes stylesheet files, script files, images, etc. The File column identifies the filename of the element, and the Domain column identifies to which domain the browser requests it.

If you scroll through the list, you'll find that the browser requests elements coming from some domains, which include `offseclab.io`, some fonts from external domains, and more interestingly, some images from `s3.amazonaws.com`.

You can click on one of these images to retrieve more details of the request, including the full path of the element.

You can copy the URL or double-click on the row to open the image in another browser tab, then analyze the URL.

![aws enumeration offsec 2](../../../images/aws_enumeration_offsec2.png)

By identifying the domain in the URL `s3.amazonaws.com`, you can infer that the images are stored in an AWS S3 bucket.

From the path `offseclab-assets-public-axevtewi/sites/www/images/saphire.jpg`, you can learn that the S3 bucket name is _offsec-assets-public-axevtewi_ and the object keys is `sites/www/images/saphire.jpg`.

The URL format is documented in [Methods for accessing a bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-bucket-intro.html).

Before diving into enum, quickly check if you can list the content of the bucket. You can test this by browsing the URL of the bucket in the web browser.

You'll remove the object key from the URL, then browse to that URL.

![aws enumeration offsec 3](../../../images/aws_enumeration_offsec3.png)

Instead of the _Access Denied_ error, you received an XML response containing all the key objects in the bucket. This is not a good practice in the bucket config. Unfortunately for you, besides the images, there aren't other objects in the bucket that can help you exploit the target further.

Next, analyze the bucket name: _offsec-assets-public-axevtewi_. You can assume there is a naming convention in use that consists of the org name followed by a description of the bucket and a random string. Bucket names must be unique across the region, so the random string might be used to ensure that the name won't be duplicated. It can also help to avoid discovery by enumeration.

Making some assumptions about the naming convention, try browsing for the buckets with the name _offsec-assets-dev_. In the original URL, you'll replace the word "public" with "dev".

![aws enumeration offsec 4](../../../images/aws_enumeration_offsec4.png)

The XML response of _offsec-assets-dev_ clearly states that the bucket does not exist.

Try again, this time using the name _offsec-assets-private_.

![aws enumeration offsec 5](../../../images/aws_enumeration_offsec5.png)

This time you receive a different message. This code means that the bucket exists, although access is denied because it doesn't have public read permissions. This is a good configuration for the bucket.

This discovery required some creativity and assumptions but shows an example of enumerating cloud resources. The process is also easy to automate by writing a script on your own or searching for an already-built tool like [cloudbrute](https://www.kali.org/tools/cloudbrute/) or [cloud-enum](https://www.kali.org/tools/cloud-enum/).

Just like the S3 service, other cloud services that are designed to be publicly accessible typically use a custom URL or standard convention for displaying resources. This is true for other public CSPs, too.

| AWS              | Azure                 | GCP                    |
| ---------------- | --------------------- | ---------------------- |
| s3.amazonaws.com | web.core.windows.net  | appspot.com            |
| awsapps.com      | file.core.windows.net | storage.googleapis.com |
|                  | blob.core.windows.net |                        |
|                  | azurewebsites.net     |                        |
|                  | cloudapp.net          |                        |

You can leverage these domains to search for resources in multiple clouds based on a keyword related to your target.

```bash
kali@kali:~$ cloud_enum --help
usage: cloud_enum [-h] (-k KEYWORD | -kf KEYFILE) [-m MUTATIONS] [-b BRUTE]
                  [-t THREADS] [-ns NAMESERVER] [-l LOGFILE] [-f FORMAT]
                  [--disable-aws] [--disable-azure] [--disable-gcp] [-qs]

Multi-cloud enumeration utility. All hail OSINT!

options:
  -h, --help            show this help message and exit
  -k KEYWORD, --keyword KEYWORD
                        Keyword. Can use argument multiple times.
  -kf KEYFILE, --keyfile KEYFILE
                        Input file with a single keyword per line.
  -m MUTATIONS, --mutations MUTATIONS
                        Mutations. Default: /usr/lib/cloud-
                        enum/enum_tools/fuzz.txt
  -b BRUTE, --brute BRUTE
                        List to brute-force Azure container names. Default:
                        /usr/lib/cloud-enum/enum_tools/fuzz.txt
  -t THREADS, --threads THREADS
                        Threads for HTTP brute-force. Default = 5
  -ns NAMESERVER, --nameserver NAMESERVER
                        DNS server to use in brute-force.
  -l LOGFILE, --logfile LOGFILE
                        Appends found items to specified file.
  -f FORMAT, --format FORMAT
                        Format for log file (text,json,csv) - default: text
  --disable-aws         Disable Amazon checks.
  --disable-azure       Disable Azure checks.
  --disable-gcp         Disable Google checks.
  -qs, --quickscan      Disable all mutations and second-level scans
```

The cloud-enum tool will search through several public CSPs for resources containing a keyword specified using the `--keyword KEYWORD (-k KEYWORD)` parameter. You can specify multiple keyword arguments, or you can specify a list with the `--keyfile KEYFILE (-kf KEYFILE)` parameter.

You can also use the `--mutations (-m)` option to specify a file to add extra words to the keyword. If you dont specify any file, the `/usr/lib/cloud-enum/enum_tools/fuzz.txt` file is used by default. You can disable this option using the `--quickscan (-qs)` parameter.

First test this using the bucket name you already know. You'll run a quickscan with `cloud_enum -k offseclab-assets-public-axevtewi -qs`. You'll also only perform a check in AWS, disabling other CSPs with the `--disable-azure` and `--disable-gcp` parameters.

```bash
kali@kali:~$ cloud_enum -k offseclab-assets-public-axevtewi --quickscan --disable-azure --disable-gcp

...

Keywords:    offseclab-assets-public-axevtewi
Mutations:   NONE! (Using quickscan)
Brute-list:  /usr/lib/cloud-enum/enum_tools/fuzz.txt

[+] Mutated results: 1 items

++++++++++++++++++++++++++
      amazon checks
++++++++++++++++++++++++++

[+] Checking for S3 buckets
  OPEN S3 BUCKET: http://offseclab-assets-public-axevtewi.s3.amazonaws.com/
      FILES:
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/offseclab-assets-public-axevtewi
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/amethyst-expanded.png
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/amethyst.png
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/logo.svg
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/pic02.jpg
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/pic05.jpg
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/pic13.jpg
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/ruby-expanded.png
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/ruby.jpg
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/saphire-expanded.png
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/saphire.jpg
                            
                            
 Elapsed time: 00:00:00

[+] Checking for AWS Apps
[*] Brute-forcing a list of 1 possible DNS names
                            
 Elapsed time: 00:00:00


[+] All done, happy hacking!
```

You can confirm the tool works as expected. It found the bucket and also listed the content. Next, you'll try to enumerate with more keywords. Because you are testing a specific naming pattern, you'll benefit from building a custom key file.

There are many ways you could accomplish this. You'll use Bash scripting to run a oneliner for loop that iterates over some keywords and `echo` the keyword, inserting a prefix and a suffix around it. Finally, you'll use the `tee` command to output the result to the console as well as the `/tmp/keyfile.txt` file. As a result, you have the key file with the names of buckets to validate if they exist.

```bash
kali@kali:~$ for key in "public" "private" "dev" "prod" "development" "production"; do echo "offseclab-assets-$key-axevtewi"; done | tee /tmp/keyfile.txt
offseclab-assets-public-axevtewi
offseclab-assets-private-axevtewi
offseclab-assets-dev-axevtewi
offseclab-assets-prod-axevtewi
offseclab-assets-development-axevtewi
offseclab-assets-production-axevtewi
```

Now, you can run cloud_enum again by specifying the key file you generated with the `--keyfile (-kf)` argument.

```bash
kali@kali:~$ cloud_enum -kf /tmp/keyfile.txt -qs --disable-azure --disable-gcp

...

Keywords:    offseclab-assets-public-axevtewi, offseclab-assets-private-axevtewi, offseclab-assets-dev-axevtewi, offseclab-assets-prod-axevtewi, offseclab-assets-development-axevtewi, offseclab-assets-production-axevtewi
Mutations:   NONE! (Using quickscan)
Brute-list:  /usr/lib/cloud-enum/enum_tools/fuzz.txt

[+] Mutated results: 6 items

++++++++++++++++++++++++++
      amazon checks
++++++++++++++++++++++++++

[+] Checking for S3 buckets
  OPEN S3 BUCKET: http://offseclab-assets-public-axevtewi.s3.amazonaws.com/
      FILES:
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/offseclab-assets-public-axevtewi
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/amethyst-expanded.png
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/amethyst.png
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/logo.svg
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/pic02.jpg
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/pic05.jpg
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/pic13.jpg
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/ruby-expanded.png
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/ruby.jpg
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/saphire-expanded.png
      ->http://offseclab-assets-public-axevtewi.s3.amazonaws.com/sites/www/images/saphire.jpg
  Protected S3 Bucket: http://offseclab-assets-private-axevtewi.s3.amazonaws.com/
                            
 Elapsed time: 00:00:06

[+] Checking for AWS Apps
[*] Brute-forcing a list of 6 possible DNS names
                            
 Elapsed time: 00:00:00


[+] All done, happy hacking!
```

From the output, you can confirm there is another bucket, but it's protected, meaning that it's not publicly readable.

You could also attempt to validate if there are other buckets using other information you found during the recon phase. For example, it could be buckets that include the name of the offseclab projects like _offseclab-assets-ruby-axevtewi_ or _offseclab-ruby-axevtewi_.


## Reconnaissance via Cloud Service Provider's API

### Configure AWS CLI

In AWS, the service that manages users and their permissions within the AWS cloud environment within the AWS cloud environment is called Identity and Access Management (_IAM_).

Installing AWS CLI:

```bash
kali@kali:~$ sudo apt update
...

kali@kali:~$ sudo apt install -y awscli
...
The following NEW packages will be installed:
  awscli docutils-common python3-awscrt python3-docutils python3-jmespath python3-roman
(Reading database ... 461429 files and directories currently installed.)
...
```

To configure the credentials in AWS CLI, you'll use a named profile. This is a good practice, since using profiles will make it easier to differentiate one IAM user from another and rapidly switch between them,

You'll run the `aws --profile attacker configure` command in the terminal. This will create a profile named _attacker_, When prompted, you'll set the values of _attacker\_access\_key\_id_ and _attacker\_access\_key\_secret_ provided.

To use the profile, you'll need to add the `--profile attacker` argument to every AWS command  you run. Test this by running the `aws --profile attacker sts get-caller-identity` command. A JSON response with the user information is proof that the credentials were valid, and you are interacting with the AWS API as the _attacker_ IAM user.

```bash
kali@kali:~$ aws configure --profile attacker
AWS Access Key ID []: AKIAQO...
AWS Secret Access Key []: cOGzm...
Default region name []: us-east-1
Default output format []: json

kali@kali:~$ aws --profile attacker sts get-caller-identity
{
    "UserId": "AIDAQOMAIGYU5VFQCHOI4",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/attacker"
}
```

Once AWS CLI is properly configured with the _attacker_ profile, you can proceed.

### Publicly Shared Resources

Some cloud assets, given the nature of their function, are inherently designed to be published on the internet, such as standard OS images that organizations use as a building block for their EC2 instances. CSPs normally provide user-friendly ways to access these.

Alternatively, some cloud resources are designed for internal use, for example, customer-built machine images or snapshots of virtual drives and databases. Despite this, large organizations migh have multiple public cloud accounts and need to share these resources between accounts or even publicly.

Some commonly used resources are:

- Publicly shared Amazon Machine Images (_AMIs_)
- Publicly shared Elastic Block Storage (_EBS_) snapshots
- Relational Databases (_RDS_) snapshots

These shared resources commonly don't have a domain name or URL address to access them, so you'll need to use the CSP's API to request them.

Open the CLI, where you have the AWS CLI tool configured with the _attacker's_ credentials. You'll search "Publicly Shared AMIs" as an example.

AMIs are virtual machine images containing a pre-installed OS along with software and files. To deploy an EC2 instance in AWS, you must specify an AMI. You normally choose one from the public AMI catalog, which contains images publicly shared by AWS, third-party partners, community, and other accounts.

The command `ec2 describe-images` will list all the images that the account can read. This will provide an extensive list of images as output. Include the `--owners amazon` argument to filter this list and show only AMIs provided by AWS.

Optionally, you can add the `--executable-users all` argument to ensure that all public AMIs will be listed, including any self-owned public AMIs.

```bash
kali@kali:~$ aws --profile attacker ec2 describe-images --owners amazon --executable-users all
{
    "Images": [
        {
            "Architecture": "x86_64",
            "CreationDate": "2022-06-29T09:46:55.000Z",
            "ImageId": "ami-0d4f490f4e62171b4",
            "ImageLocation": "amazon/Deep Learning Base AMI (Amazon Linux 2) Version 53.4",
            "ImageType": "machine",
            "Public": true,
            "OwnerId": "898082745236",
            "PlatformDetails": "Linux/UNIX",
            "UsageOperation": "RunInstances",
            "State": "available",
            "BlockDeviceMappings": [
                {
                    "DeviceName": "/dev/xvda",
                    "Ebs": {
                        "DeleteOnTermination": true,
                        "Iops": 3000,
                        "SnapshotId": "snap-0ce7f231ea72dd0ea",
                        "VolumeSize": 100,
...
```

The output shows a list of public AMIs owned by Amazon. You can see several attributes of the AMIs, such as the `ImageId`, `ImageLocation`, `CreationDate`, `PlatformDetails`, and more.

To list all the AMIs owned by another account, you can change the value of the `--owners` argument to the target's `Account ID`. The account ID is a unique identifier for the AWS account that you get when you sign up in AWS.

You don't know the account ID of your target. However, you can leverage the filtering feature of the API to find resources by specifying other attributes.

The structure of a filter expression is as follows:

```bash
--filters "Name=filter-name,Values=filter-value1,filter-value2,..."
```

`Name` refers to the attribute of the object you want to filter, and `Values` refers to the content of that attribute. Therefore, to filter for AMIs that include the word "offseclab" in the description attribute, you'll set:

```
    --filters "Name=description,Values=*Offseclab*"
```

You'll note that the `*Offseclab*` value is using the wildcard `*`. This means that it will match any number of chars at the beginning and the end surrounding the word "Offseclab".

```bash
kali@kali:~$ aws --profile attacker ec2 describe-images --executable-users all --filters "Name=description,Values=*Offseclab*"
{
    "Images": []
}
```

You got a response with an empty list, meaning that there were no images that matched your filter.

Another attribute that the user can set when creating the image is the `name`.

```bash
kali@kali:~$ aws --profile attacker ec2 describe-images --executable-users all --filters "Name=name,Values=*Offseclab*"
{
    "Images": [
        {
            "Architecture": "x86_64",
            "CreationDate": "2023-08-05T19:43:29.000Z",
            "ImageId": "ami-0854d94958c0a17e6",
            "ImageLocation": "123456789012/Offseclab Base AMI",
            "ImageType": "machine",
            "Public": true,
            "OwnerId": "123456789012",
            "PlatformDetails": "Linux/UNIX",
            "UsageOperation": "RunInstances",
            "State": "available",
            "BlockDeviceMappings": [
                {
                    "DeviceName": "/dev/xvda",
                    "Ebs": {
                        "DeleteOnTermination": true,
                {
                    "DeviceName": "/dev/xvda",
                    "Ebs": {
                        "DeleteOnTermination": true,
                        "DeleteOnTermination": true,
                        "SnapshotId": "snap-098dc18c797e4f255",
                        "VolumeSize": 8,
                        "VolumeType": "gp2",
                        "Encrypted": false
                    }
                }
            ],
            "EnaSupport": true,
            "Hypervisor": "xen",
            "Name": "Offseclab Base AMI",
            "RootDeviceName": "/dev/xvda",
            "RootDeviceType": "ebs",
            "SriovNetSupport": "simple",
            "Tags": [
                {
                    "Key": "Name",
                    "Value": "Offseclab Base AMI"
                }
            ],
            "VirtualizationType": "hvm",
            "DeprecationTime": "2023-08-05T21:43:00.000Z"
        }
    ]
}
```

This time you got a match and found one AMI. You also got the account ID that most likely belongs to the target organization. With the account ID, you can search for more AMIs or other resources.

Similarly, you can seek publicly shared EBS snapshots using the `ec2 describe-snapshots` command:

```bash
kali@kali:~$ aws --profile attacker ec2 describe-snapshots --filters "Name=description,Values=*offseclab*"
{
    "Snapshots": []
}
```

You couldn't find any other resources, but you can get an idea of how to use the CSP's API features to search for publicly shared resources.

### Obtaining Account IDs from S3 Buckets

To perform this technique, the attacker needs an AWS account to interact with the AWS API. Additionally, the target account must have a publicly readable S3 bucket.

You'll begin by creating an IAM user that, by default, won't have any permissions to execute actions. Then you'll add a policy to grant read access to the bucket with the condition that the permission will only apply if the account ID that owns the bucket starts with the digit "x". If you can't read the bucket, you'll keep trying with other numbers until you are able to read the bucket, showing you've identified the first digit of the account ID where the bucket resides. You can interate through the other digits until you retrieve all the account IDs.

First, you'll choose a publicly readable bucket or object inside the target account. Because the bucket/object is publicly readable, you should be able to list the content of it with any IAM user of any AWS account.

Then, you'll create a new IAM user in your attacker account. By default, IAM users don't have any permissions to execute any actions, so the new user won't be able to list the content of the public resource even when it's public.

Next you'll create a policy that will grant permissions to list buckets and read objects. However, you'll add the condition that the read permission will only apply if the account ID that owns the bucket starts with the digit "x".

After you apply the policy to the new IAM user, you'll test if you can list the bucket with the new user's credentials. You'll test the value x from 0 to 9 until you can list the bucket, meaning that you found the first digit of the account.

![aws enumeration offsec 6](../../../images/aws_enumeration_offsec6.gif)

In this case you can use the `offsec-assets-public-...` bucket, which is publicly readable. If it wasn't readable, you could also use a publicly readable object on the bucket, such as any of the images of the website.

Begin by retrieving the bucket name.

You can browse the website and get the bucket name from the URL of any of the images on the website. This time, you will use `curl`.

First, you'll get the source code in HTML of the main site using `curl -s www.offseclab.io`. The `-s` flag will omit the loading statistic lines that curl outputs by default.

In your next step, you will pipe the output to `grep` to filter out a particular string or pattern, aiming to extract the bucket's name. This bucket's name begins with the prefix "offseclab-assets-public-" and is followed by a random sequence of eight alphanumeric chars. This is represented as the regular expression `offseclab-assets-public-\w{8]`. The `-P` flag instructs grep to interpret the pattern using perl-regex syntax. Since the default behavior of grep is to display the entire line where the pattern is found, you'll use `-o` to display just the matched portion.

```bash
kali@kali:~$ curl -s www.offseclab.io | grep -o -P 'offseclab-assets-public-\w{8}'
offseclab-assets-public-kaykoour
offseclab-assets-public-kaykoour
offseclab-assets-public-kaykoour
offseclab-assets-public-kaykoour
```

The output shows four matches, one for every image in the homepage source code. You can copy the bucket name from the output.

Last time, you validated that the bucket was publicly accessible by listing the content in the web browser. You'll use the AWS CLI tool this time. To list the content of the bucket, you can use the `s3 ls` command.

```bash
kali@kali:~$ aws --profile attacker s3 ls offseclab-assets-public-kaykoour
                           PRE sites/
```

Ideally, you are running this command from your own AWS account, so it's safe to assume that the bucket probably has an ACL or policy that grants read access to all accounts.

Now, create a new IAM user with the `iam create-user --user-name enum` command. Keep in mind that this user resides the in the attacker-controlled AWS account.

Next, you'll also create access keys for the IAM user, so you can interact as this user with the AWS API through the AWS CLI tool. You'll run the `iam create-access-key --user-name enum` command and take note of the `AccessKeyId` and `SecretAccessKey` in the output.

```bash
kali@kali:~$ aws --profile attacker iam create-user --user-name enum
{
    "User": {
        "Path": "/",
        "UserName": "enum",
        "UserId": "AIDAQOMAIGYU4HTPEJ32K",
        "Arn": "arn:aws:iam::123456789012:user/enum",
    }
}

kali@kali:~$ aws --profile attacker iam create-access-key --user-name enum
{
    "AccessKey": {
        "UserName": "enum",
        "AccessKeyId": "AKIAQOMAIGYURE7QCUXU",
        "Status": "Active",
        "SecretAccessKey": "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",
    }
}
```

To interact as the new IAM user, you'll create a profile in the AWS CLI with the newly created access keys. You'll run `aws configure --profile enum` and input the Access Key ID and Secret Access Key.

Once the profile is created, you just need to add the `--profile enum` argument to every command you want to run as the enum user. Try this by running `aws sts get-caller-identity --profile enum`. This will return the UserId, Account, and ARN (_Amazon Resource Name_) of the identity interacting with the API.

```bash
kali@kali:~$ aws configure --profile enum
AWS Access Key ID [None]: AKIAQOMAIGYURE7QCUXU
AWS Secret Access Key [None]: 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
Default region name [None]: us-east-1
Default output format [None]: json

kali@kali:~$ aws sts get-caller-identity --profile enum
{
    "UserId": "AIDAQOMAIGYU4HTPEJ32K",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/enum"
}
```

Newly created users with no policies attached are almost fully restricted from accessing any resource, even listing public buckets in other AWS accounts. However, you can provide access by creating a policy that allows a very specific action, such as listing a public bucket. If you add a condition that checks if the account number owning the S3 bucket starts with a specific number, you can enuemrate and extract the account number.

![aws enumeration offsec 7](../../../images/aws_enumeration_offsec7.png)

Because the new enum user has no policies yet, it will deny all actions by default. This means that if you try to list the content of the bucket, you'll receive an AccessDenied error.

```bash
kali@kali:~$ aws --profile enum s3 ls offseclab-assets-private-kaykoour

An error occurred (AccessDenied) when calling the ListObjectsV2 operation: Access Denied  
```

Now, write a policy that will allow for listing the content of the bucket and reading objects inside it.

You'll name the policy document `policy-s3-read.json`.

```bash
# policy-s3-read.json
{
     "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowResourceAccount",
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetObject"
            ],
            "Resource": "*",
            "Condition": {
                "StringLike": {"s3:ResourceAccount": ["0*"]}
            }
        }
    ]
}
```

The policy allows (_line 6_) to list buckets (_line 8_) and read any object in the buckets (_line 9_). There is a `*` wildcard in the `Resource` attribute (_line 11_) meaning that the actions are allowed for any bucket and object in any account. On lines 12-14, you add a condition to make this policy valid only if the account ID hosting the resource (_ResourceAccount_) starts with "0" following "any other digits".

You'll associate this policy with the enum IAM user with an inline policy using the `iam put-user-policy` command.

Using the `--user-name enum` argument, you can specify the name of the IAM user.

The `--policy-name` argument lets you set a name for the policy. This is just for reference. You'll name the policy _s3-read_.

The `--policy-document` argument expects a string with the policy in JSON format. The prefix `file://` instructs the tool to read the policy from `policy-s3-read.json`.

The command will not return output if the policy was successfully applied. However, you can verify it using the `iam list-user-policies --user-name enum` command.

```bash
kali@kali:~$ aws --profile attacker iam put-user-policy \
--user-name enum \
--policy-name s3-read \
--policy-document file://policy-s3-read.json

kali@kali:~$ aws --profile attacker iam list-user-policies --user-name enum
{
    "PolicyNames": [
        "s3-read"
    ]
}
```

According to the policy you set, the user will be able to read the content of the bucket only if the account ID where the bucket resides starts with "0".

If you change the policy in the file and apply it again to the enum user, you'll be able to list the bucket. This time it works because your account starts with the digit "1".

You can run `aws --profile attacker sts get-caller-identity` to retrieve the account ID of your lab.

```bash
kali@kali:~$ aws --profile enum s3 ls offseclab-assets-private-kaykoour

An error occurred (AccessDenied) when calling the ListObjectsV2 operation: Access Denied  

kali@kali:~$ nano policy-s3-read.json

kali@kali:~$ cat -n policy-s3-read.json 
     1  {
     2      "Version": "2012-10-17",
     3      "Statement": [
     4          {
     5              "Sid": "AllowResourceAccount",
     6              "Effect": "Allow",
     7              "Action": [
     8                  "s3:ListBucket",
     9                  "s3:GetObject"
    10              ],
    11              "Resource": "*",
    12              "Condition": {
    13                  "StringLike": {"s3:ResourceAccount": ["1*"]}
    14              }
    15          }
    16      ]
    17  }

kali@kali:~$ aws --profile attacker iam put-user-policy \
--user-name enum \
--policy-name s3-read \
--policy-document file://policy-s3-read.json

kali@kali:~$ aws --profile enum s3 ls offseclab-assets-private-kaykoour
                           PRE sites/
```

Once you know that the policy starts with a digit, you can move to the next one by modifying the condition of the policy like so:

```
- __"StringLike": {"s3:ResourceAccount": ["10*"]}__
- __"StringLike": {"s3:ResourceAccount": ["11*"]}__
...
- __"StringLike": {"s3:ResourceAccount": ["18*"]}__
- __"StringLike": {"s3:ResourceAccount": ["19*"]}__
```

You can automate this process programmatically and build an application to obtain the account ID from a publicly accessible bucket or object.

Tools such as [s3-account-search](https://github.com/WeAreCloudar/s3-account-search) also implement this technique, although this one uses roles instead of users to link the policy to the condition.

As you can observe, there are several ways to implement this. The key concept is leveraging the "Condition" feature of the IAM policies to controll the cross-account-access.

