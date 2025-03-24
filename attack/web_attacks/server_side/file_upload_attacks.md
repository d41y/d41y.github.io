- [File Upload Attacks](#file-upload-attacks)
  - [Absent Validation](#absent-validation)
    - [Arbitrary File Upload](#arbitrary-file-upload)
    - [Identifying Web Framework](#identifying-web-framework)

---

[Cheatsheet File Upload Attacks](../../../cheatsheets/File_Upload_Attacks_Module_Cheat_Sheet.pdf)

# File Upload Attacks

Uploading a file has become a key feature for most modern web applications to allow the extensibility of web apps with user information. A social media website allows the upload of user profile images and other social media, while a corporate website may allow users to upload PDFs and other documents for corporate use.

However, as web application developers enable this feature, they also take the risk of allowing end-users to store their potentially malicious data on the web application's back-end server. If the user input and uploaded files are not correctly filtered and validated, attackers may be able to exploit the file upload feature to perform malicious activities, like executing arbitrary commands on the back-end server to take control over it.

The worst possbile kind of file upload vulnerability is an unauthenticated arbitrary file upload. With this type of vulnerability, a web application allows any unauthenticated user to upload any file type, making it one step away from allowing any user to execute code on the back-end server.

## Absent Validation

The most basic type of file upload vulnerability occurs when the web application does not have any form of validation filters on the uploaded files, allowing the upload of any file type by default.

With these types of vulnerable web apps, you may directly upload your web shell or reverse shell script to the web application, and then by just visiting the uploaded script, you can interact with you web shell or send the reverse shell.

### Arbitrary File Upload

The following web app allows you to upload personal files. The web app does not mention anythin about what file types are allowed, and you can drag and drop any file you want. Furthermore, if you click on the form to select a file, the file selector dialog does not specify any file type, as it says ```All Files``` for the file type, which may also suggest that no type of restrictions or limitations are specified for the web application.

![upload](../../../images/file_upload1.png)

All of this tells you that the programm appears to have no file type restrictions on the front-end, and if no restrictions were specified on the back-end, you might be able to upload arbitrary file type to the back-end server to gain complete control over it.

### Identifying Web Framework

