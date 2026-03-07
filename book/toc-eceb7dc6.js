// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="introduction.html">Welcome!</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="attack/index.html"><strong aria-hidden="true">1.</strong> Attack</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/ai/index.html"><strong aria-hidden="true">1.1.</strong> AI</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/ai/ai_fundamentals.html"><strong aria-hidden="true">1.1.1.</strong> 0x00</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/binary_exploitation/index.html"><strong aria-hidden="true">1.2.</strong> Binary Exploitation</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/binary_exploitation/stack_based_buffer_overflows_linux_x86.html"><strong aria-hidden="true">1.2.1.</strong> Stack-Based Buffer Overflows Linux x86</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">1.3.</strong> Cloud</span></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">1.4.</strong> Crypto</span></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">1.5.</strong> GamePwn</span></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/hardware_ics/index.html"><strong aria-hidden="true">1.6.</strong> Hardware / ICS</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/hardware_ics/hardware_ics_fundamentals.html"><strong aria-hidden="true">1.6.1.</strong> 0x00</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/index.html"><strong aria-hidden="true">1.7.</strong> Initial Access</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_applications/index.html"><strong aria-hidden="true">1.7.1.</strong> Attacking Common Applications</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_applications/app_discovery_enum.html"><strong aria-hidden="true">1.7.1.1.</strong> Application Discovery &amp; Enum</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_applications/attacking_cms.html"><strong aria-hidden="true">1.7.1.2.</strong> CMS</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_applications/attacking_gateway_interfaces.html"><strong aria-hidden="true">1.7.1.3.</strong> Common Gateway Interfaces</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_applications/attacking_management.html"><strong aria-hidden="true">1.7.1.4.</strong> Customer Service / Configuration Management</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_applications/attacking_infra_network_tools.html"><strong aria-hidden="true">1.7.1.5.</strong> Infra &amp; Network Tools</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_applications/attacking_misc_apps.html"><strong aria-hidden="true">1.7.1.6.</strong> Misc Applications</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_applications/attacking_other_apps.html"><strong aria-hidden="true">1.7.1.7.</strong> Other Notable Apps</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_applications/attacking_servlet_containers.html"><strong aria-hidden="true">1.7.1.8.</strong> Servlet Containers / Software Dev</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_applications/attacking_thick_client.html"><strong aria-hidden="true">1.7.1.9.</strong> Thick Client Applications</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_services/index.html"><strong aria-hidden="true">1.7.2.</strong> Attacking Common Services</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_services/attacking_common_services_fundamentals.html"><strong aria-hidden="true">1.7.2.1.</strong> 0x00</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_services/attacking_dns.html"><strong aria-hidden="true">1.7.2.2.</strong> DNS</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_services/attacking_email_services.html"><strong aria-hidden="true">1.7.2.3.</strong> Email Services</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_services/attacking_ftp.html"><strong aria-hidden="true">1.7.2.4.</strong> FTP</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_services/attacking_rdp.html"><strong aria-hidden="true">1.7.2.5.</strong> RDP</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_services/attacking_smb.html"><strong aria-hidden="true">1.7.2.6.</strong> SMB</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/attacking_common_services/attacking_sql.html"><strong aria-hidden="true">1.7.2.7.</strong> SQL</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/footprinting.html"><strong aria-hidden="true">1.7.3.</strong> Footprinting</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/password_attacks/index.html"><strong aria-hidden="true">1.7.4.</strong> Password Attacks</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/password_attacks/password_attacks_fundamentals.html"><strong aria-hidden="true">1.7.4.1.</strong> 0x00</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/password_attacks/linux_password_attacks.html"><strong aria-hidden="true">1.7.4.2.</strong> Linux</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/password_attacks/network_password_attacks.html"><strong aria-hidden="true">1.7.4.3.</strong> Network</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/password_attacks/remote_password_attacks.html"><strong aria-hidden="true">1.7.4.4.</strong> Remote</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/password_attacks/windows_password_attacks.html"><strong aria-hidden="true">1.7.4.5.</strong> Windows</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/initial_access/shells_payloads.html"><strong aria-hidden="true">1.7.5.</strong> Shells &amp; Payloads</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/linux/index.html"><strong aria-hidden="true">1.8.</strong> Linux</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/linux/linux_fundamentals.html"><strong aria-hidden="true">1.8.1.</strong> 0x00</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/macos/index.html"><strong aria-hidden="true">1.9.</strong> MacOS</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/macos/macos_fundamentals.html"><strong aria-hidden="true">1.9.1.</strong> 0x00</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/malware_development/index.html"><strong aria-hidden="true">1.10.</strong> Malware Development</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/malware_development/malware_development_essentials.html"><strong aria-hidden="true">1.10.1.</strong> Malware Development Essentials</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">1.11.</strong> Mobile</span></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">1.12.</strong> OSINT</span></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/pivoting/index.html"><strong aria-hidden="true">1.13.</strong> Pivoting - old</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/pivoting/chisel.html"><strong aria-hidden="true">1.13.1.</strong> Chisel</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/pivoting/ligolo.html"><strong aria-hidden="true">1.13.2.</strong> Ligolo</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/pivoting/socat.html"><strong aria-hidden="true">1.13.3.</strong> Socat</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/pivoting/ssh_und_proxychains.html"><strong aria-hidden="true">1.13.4.</strong> SSH und Proxychains</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/pivoting/sshuttle.html"><strong aria-hidden="true">1.13.5.</strong> Sshuttle</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/post_exploitation/index.html"><strong aria-hidden="true">1.14.</strong> Post-Exploitation</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/post_exploitation/file_transfers.html"><strong aria-hidden="true">1.14.1.</strong> File Transfers</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/post_exploitation/password_attacks/index.html"><strong aria-hidden="true">1.14.2.</strong> Password Attacks</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/post_exploitation/password_attacks/linux_password_attacks.html"><strong aria-hidden="true">1.14.2.1.</strong> Linux</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/post_exploitation/password_attacks/network_password_attacks.html"><strong aria-hidden="true">1.14.2.2.</strong> Network</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/post_exploitation/password_attacks/windows_password_attacks.html"><strong aria-hidden="true">1.14.2.3.</strong> Windows</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">1.14.3.</strong> Persistence</span></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/post_exploitation/pivoting.html"><strong aria-hidden="true">1.14.4.</strong> Pivoting</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/post_exploitation/privesc/index.html"><strong aria-hidden="true">1.14.5.</strong> PrivEsc</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/post_exploitation/privesc/linux_privesc.html"><strong aria-hidden="true">1.14.5.1.</strong> Linux PrivEsc</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/post_exploitation/privesc/windows_privesc.html"><strong aria-hidden="true">1.14.5.2.</strong> Windows PrivEsc</a></span></li></ol></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">1.15.</strong> Reversing</span></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/tools/index.html"><strong aria-hidden="true">1.16.</strong> Tools</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/tools/metasploit.html"><strong aria-hidden="true">1.16.1.</strong> Metasploit</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/tools/nmap.html"><strong aria-hidden="true">1.16.2.</strong> nmap</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/vuln_scanning/index.html"><strong aria-hidden="true">1.17.</strong> Vuln Scanning</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/vuln_scanning/nessus.html"><strong aria-hidden="true">1.17.1.</strong> Nessus</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/vuln_scanning/openvas.html"><strong aria-hidden="true">1.17.2.</strong> OpenVAS</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/index.html"><strong aria-hidden="true">1.18.</strong> Web</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/fundamentals/index.html"><strong aria-hidden="true">1.18.1.</strong> 0x00</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/fundamentals/http_https_fundamentals.html"><strong aria-hidden="true">1.18.1.1.</strong> HTTP/HTTPs</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/fundamentals/web_proxy_fundamentals.html"><strong aria-hidden="true">1.18.1.2.</strong> Proxies</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/fundamentals/web_recon_fundamentals.html"><strong aria-hidden="true">1.18.1.3.</strong> Reconnaissance</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/fundamentals/web_applications_fundamentals.html"><strong aria-hidden="true">1.18.1.4.</strong> Web Applications</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/index.html"><strong aria-hidden="true">1.18.2.</strong> Attacks</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/client_side/index.html"><strong aria-hidden="true">1.18.2.1.</strong> Client-side</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/client_side/xss.html"><strong aria-hidden="true">1.18.2.1.1.</strong> XSS</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/injection_attacks/index.html"><strong aria-hidden="true">1.18.2.2.</strong> Injections</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/injection_attacks/command_injections.html"><strong aria-hidden="true">1.18.2.2.1.</strong> Command Injections</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/injection_attacks/sqli.html"><strong aria-hidden="true">1.18.2.2.2.</strong> SQLi</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/server_side/index.html"><strong aria-hidden="true">1.18.2.3.</strong> Server-side</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/server_side/file_inclusion.html"><strong aria-hidden="true">1.18.2.3.1.</strong> File Inclusion</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/server_side/file_upload_attacks.html"><strong aria-hidden="true">1.18.2.3.2.</strong> File Upload Attack</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/server_side/http_verb_tampering.html"><strong aria-hidden="true">1.18.2.3.3.</strong> HTTP Verb Tampering</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/server_side/idor.html"><strong aria-hidden="true">1.18.2.3.4.</strong> IDOR</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/server_side/ssi.html"><strong aria-hidden="true">1.18.2.3.5.</strong> SSI</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/server_side/ssrf.html"><strong aria-hidden="true">1.18.2.3.6.</strong> SSRF</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/server_side/ssti.html"><strong aria-hidden="true">1.18.2.3.7.</strong> SSTI</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/server_side/xlst.html"><strong aria-hidden="true">1.18.2.3.8.</strong> XLST</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/server_side/xxe.html"><strong aria-hidden="true">1.18.2.3.9.</strong> XXE</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/web_service_api/index.html"><strong aria-hidden="true">1.18.2.4.</strong> Web Service &amp; API</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/web_service_api/web_service_api.html"><strong aria-hidden="true">1.18.2.4.1.</strong> 0x00</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/web_service_api/api_attacks.html"><strong aria-hidden="true">1.18.2.4.2.</strong> API Attacks</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/web_service_api/api_attacks_owasp10.html"><strong aria-hidden="true">1.18.2.4.3.</strong> API Attacks - OWASP Top 10</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/web_service_api/graphql.html"><strong aria-hidden="true">1.18.2.4.4.</strong> GraphQL</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_attacks/web_service_api/web_service_attacks.html"><strong aria-hidden="true">1.18.2.4.5.</strong> Web Service Attacks</a></span></li></ol></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/authentication/index.html"><strong aria-hidden="true">1.18.3.</strong> Authentication</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/authentication/broken_authentication.html"><strong aria-hidden="true">1.18.3.1.</strong> Broken Authentication</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/authentication/login_brute_forcing.html"><strong aria-hidden="true">1.18.3.2.</strong> Login Brute Forcing</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/cms/index.html"><strong aria-hidden="true">1.18.4.</strong> CMS</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/cms/cms.html"><strong aria-hidden="true">1.18.4.1.</strong> 0x00</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/cms/wordpress.html"><strong aria-hidden="true">1.18.4.2.</strong> Wordpress</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/fuzzing/index.html"><strong aria-hidden="true">1.18.5.</strong> Fuzzing</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/fuzzing/ffuf.html"><strong aria-hidden="true">1.18.5.1.</strong> Attacking Web Apps with Ffuf</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/fuzzing/web_fuzzing.html"><strong aria-hidden="true">1.18.5.2.</strong> Web Fuzzing</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_security_techniques/index.html"><strong aria-hidden="true">1.18.6.</strong> Web Security</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_security_techniques/javascript_deobfuscation.html"><strong aria-hidden="true">1.18.6.1.</strong> JavaScript (De-)Obfuscation</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/web/web_security_techniques/session_security.html"><strong aria-hidden="true">1.18.6.2.</strong> Session Security</a></span></li></ol></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/wifi/index.html"><strong aria-hidden="true">1.19.</strong> Wi-Fi</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/wifi/wifi_pentesting_basics.html"><strong aria-hidden="true">1.19.1.</strong> 0x00</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/windows/index.html"><strong aria-hidden="true">1.20.</strong> Windows</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/windows/windows_fundamentals.html"><strong aria-hidden="true">1.20.1.</strong> 0x00</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/windows/ad/index.html"><strong aria-hidden="true">1.20.2.</strong> Active Directory</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/windows/ad/intro_ad.html"><strong aria-hidden="true">1.20.2.1.</strong> 0x00</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/windows/ad/enum_and_attacks/index.html"><strong aria-hidden="true">1.20.2.2.</strong> Enumeration and (basic) Attacks</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/windows/ad/enum_and_attacks/ad_initial_enum.html"><strong aria-hidden="true">1.20.2.2.1.</strong> Initial Enumeration</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/windows/ad/enum_and_attacks/ad_sniffing_for_foothold.html"><strong aria-hidden="true">1.20.2.2.2.</strong> Foothold</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/windows/ad/enum_and_attacks/ad_user_hunting.html"><strong aria-hidden="true">1.20.2.2.3.</strong> User Hunting</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/windows/ad/enum_and_attacks/ad_internal_password_spraying.html"><strong aria-hidden="true">1.20.2.2.4.</strong> Internal Password Spraying</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/windows/ad/enum_and_attacks/ad_credentialed_enum_lotl.html"><strong aria-hidden="true">1.20.2.2.5.</strong> Credentialed Enum &amp; LOTL</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/windows/ad/enum_and_attacks/ad_kerberoasting.html"><strong aria-hidden="true">1.20.2.2.6.</strong> Kerberoasting</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/windows/ad/enum_and_attacks/ad_acl_abuse.html"><strong aria-hidden="true">1.20.2.2.7.</strong> ACL</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/windows/ad/enum_and_attacks/ad_extras.html"><strong aria-hidden="true">1.20.2.2.8.</strong> Extras</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/windows/ad/enum_and_attacks/ad_domain_trust_attacks.html"><strong aria-hidden="true">1.20.2.2.9.</strong> Domain Trusts Attacks</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="attack/windows/ad/enum_and_attacks/ad_cross_forest_trust_attacks.html"><strong aria-hidden="true">1.20.2.2.10.</strong> Cross-Forest Trust Attacks</a></span></li></ol></li></ol></li></ol></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="defend/index.html"><strong aria-hidden="true">2.</strong> Defend</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="defend/defensive_considerations/index.html"><strong aria-hidden="true">2.1.</strong> Defensive Considerations, Mitigation, Hardening</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="defend/defensive_considerations/ad_defensive_considerations.html"><strong aria-hidden="true">2.1.1.</strong> AD</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="defend/defensive_considerations/common_application_hardening.html"><strong aria-hidden="true">2.1.2.</strong> Common Applications</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="defend/digital_forensics/index.html"><strong aria-hidden="true">2.2.</strong> Digital Forensics</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="defend/digital_forensics/disk_forensics/index.html"><strong aria-hidden="true">2.2.1.</strong> Disk Forensics</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="defend/digital_forensics/disk_forensics/windows_event_logs.html"><strong aria-hidden="true">2.2.1.1.</strong> Windows Event Logs</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">2.2.2.</strong> Memory Forensics</span></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">2.2.3.</strong> Network Forensics</span></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="defend/incident_response/index.html"><strong aria-hidden="true">2.3.</strong> Incident Response</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="defend/malware_analysis/index.html"><strong aria-hidden="true">2.4.</strong> Malware Analysis</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="defend/malware_analysis/intro_malware_analysis.html"><strong aria-hidden="true">2.4.1.</strong> 0x00</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="defend/siem/index.html"><strong aria-hidden="true">2.5.</strong> SIEM</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="defend/siem/siem_fundamentals.html"><strong aria-hidden="true">2.5.1.</strong> 0x00</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">2.6.</strong> Threat Hunting</span></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="general/index.html"><strong aria-hidden="true">3.</strong> General</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/assessments/index.html"><strong aria-hidden="true">3.1.</strong> Assessments</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/assessments/standards.html"><strong aria-hidden="true">3.1.1.</strong> Assessment Standards</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/assessments/security_assessment.html"><strong aria-hidden="true">3.1.2.</strong> Security Assessment</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/assessments/vulnerability_assessment.html"><strong aria-hidden="true">3.1.3.</strong> Vulnerability Assessment</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/cryptography/index.html"><strong aria-hidden="true">3.2.</strong> Cryptography</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/dbms/index.html"><strong aria-hidden="true">3.3.</strong> DBMS</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/dbms/dbms_fundamentals.html"><strong aria-hidden="true">3.3.1.</strong> 0x00</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/dbms/mysql_fundamentals.html"><strong aria-hidden="true">3.3.2.</strong> MySQL</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">3.3.3.</strong> Neo4J</span></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/index.html"><strong aria-hidden="true">3.4.</strong> Elastic Stack</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/building_great_search_experiences.html"><strong aria-hidden="true">3.4.1.</strong> Building Great Search Experiences</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/configuring_index_time_series_data.html"><strong aria-hidden="true">3.4.2.</strong> Configuring Elasticsearch Index for Time Series Data</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/data_analysis_with_kibana/index.html"><strong aria-hidden="true">3.4.3.</strong> Data Analysis with Kibana</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/data_analysis_with_kibana/02_search_your_data.html"><strong aria-hidden="true">3.4.3.1.</strong> Search Your Data</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/data_analysis_with_kibana/03_visualize_your_data.html"><strong aria-hidden="true">3.4.3.2.</strong> Visualize Your Data</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/data_analysis_with_kibana/04_additional_visualizations.html"><strong aria-hidden="true">3.4.3.3.</strong> Additional Visualizations</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/data_analysis_with_kibana/05_present_your_data.html"><strong aria-hidden="true">3.4.3.4.</strong> Present Your Data</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/data_analysis_with_kibana/06_analyze_your_data_with_ml.html"><strong aria-hidden="true">3.4.3.5.</strong> Analyze Your Data With Machine Learning</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/data_analysis_with_kibana/07_advanced_kibana.html"><strong aria-hidden="true">3.4.3.6.</strong> Advanced Kibana</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/data_analysis_with_kibana/08_alerting.html"><strong aria-hidden="true">3.4.3.7.</strong> Alerting</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/elasticsearch_engineer/index.html"><strong aria-hidden="true">3.4.4.</strong> Elasticsearch Engineer</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/elasticsearch_engineer/01_intro_elasticsearch.html"><strong aria-hidden="true">3.4.4.1.</strong> 0x00</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/elasticsearch_engineer/02_data_modelling.html"><strong aria-hidden="true">3.4.4.2.</strong> Data Modelling</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/elasticsearch_engineer/03_search.html"><strong aria-hidden="true">3.4.4.3.</strong> Search</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/elasticsearch_engineer/04_aggregations.html"><strong aria-hidden="true">3.4.4.4.</strong> Aggregations</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/elasticsearch_engineer/05_data_processing.html"><strong aria-hidden="true">3.4.4.5.</strong> Data Processing</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/elasticsearch_engineer/06_distributed_datastore.html"><strong aria-hidden="true">3.4.4.6.</strong> Distributed Datastore</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/elasticsearch_engineer/07_data_management.html"><strong aria-hidden="true">3.4.4.7.</strong> Data Management</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/elasticsearch_engineer/08_cluster_management.html"><strong aria-hidden="true">3.4.4.8.</strong> Cluster Management</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/esql_for_security_analysts.html"><strong aria-hidden="true">3.4.5.</strong> ES|QL for Security Analysts</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/kubernetes_basics.html"><strong aria-hidden="true">3.4.6.</strong> Kubernetes Basics</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/elastic_stack/intro_painless.html"><strong aria-hidden="true">3.4.7.</strong> Introduction to Painless</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/networking/index.html"><strong aria-hidden="true">3.5.</strong> Networking</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/networking/networking_introduction.html"><strong aria-hidden="true">3.5.1.</strong> 0x00</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/networking/cisco/index.html"><strong aria-hidden="true">3.5.2.</strong> Cisco Network Technician</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/networking/cisco/networking_basics.html"><strong aria-hidden="true">3.5.2.1.</strong> Networking Basics</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/networking/network_foundations.html"><strong aria-hidden="true">3.5.3.</strong> Network Foundations</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/processes/index.html"><strong aria-hidden="true">3.6.</strong> Processes</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/processes/bbh_process.html"><strong aria-hidden="true">3.6.1.</strong> Bug Bounty Hunting Process</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/processes/incident_handling_process.html"><strong aria-hidden="true">3.6.2.</strong> Incident Handling Process</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/processes/pt_process.html"><strong aria-hidden="true">3.6.3.</strong> Penetration Testing Process</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/programming/index.html"><strong aria-hidden="true">3.7.</strong> Programming</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/programming/assembly/assembly.html"><strong aria-hidden="true">3.7.1.</strong> Assembly</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/programming/bash.html"><strong aria-hidden="true">3.7.2.</strong> Bash</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/programming/cmd.html"><strong aria-hidden="true">3.7.3.</strong> CMD</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/programming/python/python.html"><strong aria-hidden="true">3.7.4.</strong> Python</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/programming/python/sans573/cheatsheet.html"><strong aria-hidden="true">3.7.4.1.</strong> 573 Cheatsheet</a></span></li></ol></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">3.8.</strong> RegEx</span></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/reporting/index.html"><strong aria-hidden="true">3.9.</strong> Reporting</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/reporting/bbh_reporting.html"><strong aria-hidden="true">3.9.1.</strong> Bug Bounty</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/reporting/pt_reporting.html"><strong aria-hidden="true">3.9.2.</strong> Penetration Test</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="security_incident_reporting.html"><strong aria-hidden="true">3.9.3.</strong> Security Incident</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/webdev/index.html"><strong aria-hidden="true">3.10.</strong> WebDev</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/webdev/sylius.html"><strong aria-hidden="true">3.10.1.</strong> Sylius</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="general/webdev/symfony.html"><strong aria-hidden="true">3.10.2.</strong> Symfony</a></span></li></ol></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0].split('?')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        const links = Array.prototype.slice.call(this.querySelectorAll('a'));
        const l = links.length;
        for (let i = 0; i < l; ++i) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The 'index' page is supposed to alias the first chapter in the book.
            if (link.href === current_page
                || i === 0
                && path_to_root === ''
                && current_page.endsWith('/index.html')) {
                link.classList.add('active');
                let parent = link.parentElement;
                while (parent) {
                    if (parent.tagName === 'LI' && parent.classList.contains('chapter-item')) {
                        parent.classList.add('expanded');
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                const clientRect = e.target.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                sessionStorage.setItem('sidebar-scroll-offset', clientRect.top - sidebarRect.top);
            }
        }, { passive: true });
        const sidebarScrollOffset = sessionStorage.getItem('sidebar-scroll-offset');
        sessionStorage.removeItem('sidebar-scroll-offset');
        if (sidebarScrollOffset !== null) {
            // preserve sidebar scroll position when navigating via links within sidebar
            const activeSection = this.querySelector('.active');
            if (activeSection) {
                const clientRect = activeSection.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                const currentOffset = clientRect.top - sidebarRect.top;
                this.scrollTop += currentOffset - parseFloat(sidebarScrollOffset);
            }
        } else {
            // scroll sidebar to current active section when navigating via
            // 'next/previous chapter' buttons
            const activeSection = document.querySelector('#mdbook-sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        const sidebarAnchorToggles = document.querySelectorAll('.chapter-fold-toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(el => {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);


// ---------------------------------------------------------------------------
// Support for dynamically adding headers to the sidebar.

(function() {
    // This is used to detect which direction the page has scrolled since the
    // last scroll event.
    let lastKnownScrollPosition = 0;
    // This is the threshold in px from the top of the screen where it will
    // consider a header the "current" header when scrolling down.
    const defaultDownThreshold = 150;
    // Same as defaultDownThreshold, except when scrolling up.
    const defaultUpThreshold = 300;
    // The threshold is a virtual horizontal line on the screen where it
    // considers the "current" header to be above the line. The threshold is
    // modified dynamically to handle headers that are near the bottom of the
    // screen, and to slightly offset the behavior when scrolling up vs down.
    let threshold = defaultDownThreshold;
    // This is used to disable updates while scrolling. This is needed when
    // clicking the header in the sidebar, which triggers a scroll event. It
    // is somewhat finicky to detect when the scroll has finished, so this
    // uses a relatively dumb system of disabling scroll updates for a short
    // time after the click.
    let disableScroll = false;
    // Array of header elements on the page.
    let headers;
    // Array of li elements that are initially collapsed headers in the sidebar.
    // I'm not sure why eslint seems to have a false positive here.
    // eslint-disable-next-line prefer-const
    let headerToggles = [];
    // This is a debugging tool for the threshold which you can enable in the console.
    let thresholdDebug = false;

    // Updates the threshold based on the scroll position.
    function updateThreshold() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // The number of pixels below the viewport, at most documentHeight.
        // This is used to push the threshold down to the bottom of the page
        // as the user scrolls towards the bottom.
        const pixelsBelow = Math.max(0, documentHeight - (scrollTop + windowHeight));
        // The number of pixels above the viewport, at least defaultDownThreshold.
        // Similar to pixelsBelow, this is used to push the threshold back towards
        // the top when reaching the top of the page.
        const pixelsAbove = Math.max(0, defaultDownThreshold - scrollTop);
        // How much the threshold should be offset once it gets close to the
        // bottom of the page.
        const bottomAdd = Math.max(0, windowHeight - pixelsBelow - defaultDownThreshold);
        let adjustedBottomAdd = bottomAdd;

        // Adjusts bottomAdd for a small document. The calculation above
        // assumes the document is at least twice the windowheight in size. If
        // it is less than that, then bottomAdd needs to be shrunk
        // proportional to the difference in size.
        if (documentHeight < windowHeight * 2) {
            const maxPixelsBelow = documentHeight - windowHeight;
            const t = 1 - pixelsBelow / Math.max(1, maxPixelsBelow);
            const clamp = Math.max(0, Math.min(1, t));
            adjustedBottomAdd *= clamp;
        }

        let scrollingDown = true;
        if (scrollTop < lastKnownScrollPosition) {
            scrollingDown = false;
        }

        if (scrollingDown) {
            // When scrolling down, move the threshold up towards the default
            // downwards threshold position. If near the bottom of the page,
            // adjustedBottomAdd will offset the threshold towards the bottom
            // of the page.
            const amountScrolledDown = scrollTop - lastKnownScrollPosition;
            const adjustedDefault = defaultDownThreshold + adjustedBottomAdd;
            threshold = Math.max(adjustedDefault, threshold - amountScrolledDown);
        } else {
            // When scrolling up, move the threshold down towards the default
            // upwards threshold position. If near the bottom of the page,
            // quickly transition the threshold back up where it normally
            // belongs.
            const amountScrolledUp = lastKnownScrollPosition - scrollTop;
            const adjustedDefault = defaultUpThreshold - pixelsAbove
                + Math.max(0, adjustedBottomAdd - defaultDownThreshold);
            threshold = Math.min(adjustedDefault, threshold + amountScrolledUp);
        }

        if (documentHeight <= windowHeight) {
            threshold = 0;
        }

        if (thresholdDebug) {
            const id = 'mdbook-threshold-debug-data';
            let data = document.getElementById(id);
            if (data === null) {
                data = document.createElement('div');
                data.id = id;
                data.style.cssText = `
                    position: fixed;
                    top: 50px;
                    right: 10px;
                    background-color: 0xeeeeee;
                    z-index: 9999;
                    pointer-events: none;
                `;
                document.body.appendChild(data);
            }
            data.innerHTML = `
                <table>
                  <tr><td>documentHeight</td><td>${documentHeight.toFixed(1)}</td></tr>
                  <tr><td>windowHeight</td><td>${windowHeight.toFixed(1)}</td></tr>
                  <tr><td>scrollTop</td><td>${scrollTop.toFixed(1)}</td></tr>
                  <tr><td>pixelsAbove</td><td>${pixelsAbove.toFixed(1)}</td></tr>
                  <tr><td>pixelsBelow</td><td>${pixelsBelow.toFixed(1)}</td></tr>
                  <tr><td>bottomAdd</td><td>${bottomAdd.toFixed(1)}</td></tr>
                  <tr><td>adjustedBottomAdd</td><td>${adjustedBottomAdd.toFixed(1)}</td></tr>
                  <tr><td>scrollingDown</td><td>${scrollingDown}</td></tr>
                  <tr><td>threshold</td><td>${threshold.toFixed(1)}</td></tr>
                </table>
            `;
            drawDebugLine();
        }

        lastKnownScrollPosition = scrollTop;
    }

    function drawDebugLine() {
        if (!document.body) {
            return;
        }
        const id = 'mdbook-threshold-debug-line';
        const existingLine = document.getElementById(id);
        if (existingLine) {
            existingLine.remove();
        }
        const line = document.createElement('div');
        line.id = id;
        line.style.cssText = `
            position: fixed;
            top: ${threshold}px;
            left: 0;
            width: 100vw;
            height: 2px;
            background-color: red;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(line);
    }

    function mdbookEnableThresholdDebug() {
        thresholdDebug = true;
        updateThreshold();
        drawDebugLine();
    }

    window.mdbookEnableThresholdDebug = mdbookEnableThresholdDebug;

    // Updates which headers in the sidebar should be expanded. If the current
    // header is inside a collapsed group, then it, and all its parents should
    // be expanded.
    function updateHeaderExpanded(currentA) {
        // Add expanded to all header-item li ancestors.
        let current = currentA.parentElement;
        while (current) {
            if (current.tagName === 'LI' && current.classList.contains('header-item')) {
                current.classList.add('expanded');
            }
            current = current.parentElement;
        }
    }

    // Updates which header is marked as the "current" header in the sidebar.
    // This is done with a virtual Y threshold, where headers at or below
    // that line will be considered the current one.
    function updateCurrentHeader() {
        if (!headers || !headers.length) {
            return;
        }

        // Reset the classes, which will be rebuilt below.
        const els = document.getElementsByClassName('current-header');
        for (const el of els) {
            el.classList.remove('current-header');
        }
        for (const toggle of headerToggles) {
            toggle.classList.remove('expanded');
        }

        // Find the last header that is above the threshold.
        let lastHeader = null;
        for (const header of headers) {
            const rect = header.getBoundingClientRect();
            if (rect.top <= threshold) {
                lastHeader = header;
            } else {
                break;
            }
        }
        if (lastHeader === null) {
            lastHeader = headers[0];
            const rect = lastHeader.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top >= windowHeight) {
                return;
            }
        }

        // Get the anchor in the summary.
        const href = '#' + lastHeader.id;
        const a = [...document.querySelectorAll('.header-in-summary')]
            .find(element => element.getAttribute('href') === href);
        if (!a) {
            return;
        }

        a.classList.add('current-header');

        updateHeaderExpanded(a);
    }

    // Updates which header is "current" based on the threshold line.
    function reloadCurrentHeader() {
        if (disableScroll) {
            return;
        }
        updateThreshold();
        updateCurrentHeader();
    }


    // When clicking on a header in the sidebar, this adjusts the threshold so
    // that it is located next to the header. This is so that header becomes
    // "current".
    function headerThresholdClick(event) {
        // See disableScroll description why this is done.
        disableScroll = true;
        setTimeout(() => {
            disableScroll = false;
        }, 100);
        // requestAnimationFrame is used to delay the update of the "current"
        // header until after the scroll is done, and the header is in the new
        // position.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Closest is needed because if it has child elements like <code>.
                const a = event.target.closest('a');
                const href = a.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    threshold = targetElement.getBoundingClientRect().bottom;
                    updateCurrentHeader();
                }
            });
        });
    }

    // Takes the nodes from the given head and copies them over to the
    // destination, along with some filtering.
    function filterHeader(source, dest) {
        const clone = source.cloneNode(true);
        clone.querySelectorAll('mark').forEach(mark => {
            mark.replaceWith(...mark.childNodes);
        });
        dest.append(...clone.childNodes);
    }

    // Scans page for headers and adds them to the sidebar.
    document.addEventListener('DOMContentLoaded', function() {
        const activeSection = document.querySelector('#mdbook-sidebar .active');
        if (activeSection === null) {
            return;
        }

        const main = document.getElementsByTagName('main')[0];
        headers = Array.from(main.querySelectorAll('h2, h3, h4, h5, h6'))
            .filter(h => h.id !== '' && h.children.length && h.children[0].tagName === 'A');

        if (headers.length === 0) {
            return;
        }

        // Build a tree of headers in the sidebar.

        const stack = [];

        const firstLevel = parseInt(headers[0].tagName.charAt(1));
        for (let i = 1; i < firstLevel; i++) {
            const ol = document.createElement('ol');
            ol.classList.add('section');
            if (stack.length > 0) {
                stack[stack.length - 1].ol.appendChild(ol);
            }
            stack.push({level: i + 1, ol: ol});
        }

        // The level where it will start folding deeply nested headers.
        const foldLevel = 3;

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const level = parseInt(header.tagName.charAt(1));

            const currentLevel = stack[stack.length - 1].level;
            if (level > currentLevel) {
                // Begin nesting to this level.
                for (let nextLevel = currentLevel + 1; nextLevel <= level; nextLevel++) {
                    const ol = document.createElement('ol');
                    ol.classList.add('section');
                    const last = stack[stack.length - 1];
                    const lastChild = last.ol.lastChild;
                    // Handle the case where jumping more than one nesting
                    // level, which doesn't have a list item to place this new
                    // list inside of.
                    if (lastChild) {
                        lastChild.appendChild(ol);
                    } else {
                        last.ol.appendChild(ol);
                    }
                    stack.push({level: nextLevel, ol: ol});
                }
            } else if (level < currentLevel) {
                while (stack.length > 1 && stack[stack.length - 1].level > level) {
                    stack.pop();
                }
            }

            const li = document.createElement('li');
            li.classList.add('header-item');
            li.classList.add('expanded');
            if (level < foldLevel) {
                li.classList.add('expanded');
            }
            const span = document.createElement('span');
            span.classList.add('chapter-link-wrapper');
            const a = document.createElement('a');
            span.appendChild(a);
            a.href = '#' + header.id;
            a.classList.add('header-in-summary');
            filterHeader(header.children[0], a);
            a.addEventListener('click', headerThresholdClick);
            const nextHeader = headers[i + 1];
            if (nextHeader !== undefined) {
                const nextLevel = parseInt(nextHeader.tagName.charAt(1));
                if (nextLevel > level && level >= foldLevel) {
                    const toggle = document.createElement('a');
                    toggle.classList.add('chapter-fold-toggle');
                    toggle.classList.add('header-toggle');
                    toggle.addEventListener('click', () => {
                        li.classList.toggle('expanded');
                    });
                    const toggleDiv = document.createElement('div');
                    toggleDiv.textContent = '❱';
                    toggle.appendChild(toggleDiv);
                    span.appendChild(toggle);
                    headerToggles.push(li);
                }
            }
            li.appendChild(span);

            const currentParent = stack[stack.length - 1];
            currentParent.ol.appendChild(li);
        }

        const onThisPage = document.createElement('div');
        onThisPage.classList.add('on-this-page');
        onThisPage.append(stack[0].ol);
        const activeItemSpan = activeSection.parentElement;
        activeItemSpan.after(onThisPage);
    });

    document.addEventListener('DOMContentLoaded', reloadCurrentHeader);
    document.addEventListener('scroll', reloadCurrentHeader, { passive: true });
})();

