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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="introduction.html">Welcome!</a></li><li class="chapter-item expanded "><a href="attack/index.html"><strong aria-hidden="true">1.</strong> Attack</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="attack/binary_exploitation/index.html"><strong aria-hidden="true">1.1.</strong> Binary Exploitation</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="attack/binary_exploitation/stack_based_buffer_overflows_linux_x86.html"><strong aria-hidden="true">1.1.1.</strong> Stack-Based Buffer Overflows Linux x86</a></li></ol></li><li class="chapter-item "><a href="attack/hardware_ics/index.html"><strong aria-hidden="true">1.2.</strong> Hardware / ICS</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="attack/hardware_ics/hardware_ics_fundamentals.html"><strong aria-hidden="true">1.2.1.</strong> 0x00</a></li></ol></li><li class="chapter-item "><a href="attack/initial_access/index.html"><strong aria-hidden="true">1.3.</strong> Initial Access</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="attack/initial_access/attacking_common_applications/index.html"><strong aria-hidden="true">1.3.1.</strong> Attacking Common Applications</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="attack/initial_access/attacking_common_applications/app_discovery_enum.html"><strong aria-hidden="true">1.3.1.1.</strong> Application Discovery &amp; Enum</a></li><li class="chapter-item "><a href="attack/initial_access/attacking_common_applications/attacking_cms.html"><strong aria-hidden="true">1.3.1.2.</strong> CMS</a></li><li class="chapter-item "><a href="attack/initial_access/attacking_common_applications/attacking_gateway_interfaces.html"><strong aria-hidden="true">1.3.1.3.</strong> Common Gateway Interfaces</a></li><li class="chapter-item "><a href="attack/initial_access/attacking_common_applications/attacking_management.html"><strong aria-hidden="true">1.3.1.4.</strong> Customer Service / Configuration Management</a></li><li class="chapter-item "><a href="attack/initial_access/attacking_common_applications/attacking_infra_network_tools.html"><strong aria-hidden="true">1.3.1.5.</strong> Infra &amp; Network Tools</a></li><li class="chapter-item "><a href="attack/initial_access/attacking_common_applications/attacking_misc_apps.html"><strong aria-hidden="true">1.3.1.6.</strong> Misc Applications</a></li><li class="chapter-item "><a href="attack/initial_access/attacking_common_applications/attacking_other_apps.html"><strong aria-hidden="true">1.3.1.7.</strong> Other Notable Apps</a></li><li class="chapter-item "><a href="attack/initial_access/attacking_common_applications/attacking_servlet_containers.html"><strong aria-hidden="true">1.3.1.8.</strong> Servlet Containers / Software Dev</a></li><li class="chapter-item "><a href="attack/initial_access/attacking_common_applications/attacking_thick_client.html"><strong aria-hidden="true">1.3.1.9.</strong> Thick Client Applications</a></li></ol></li><li class="chapter-item "><a href="attack/initial_access/attacking_common_services/index.html"><strong aria-hidden="true">1.3.2.</strong> Attacking Common Services</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="attack/initial_access/attacking_common_services/attacking_common_services_fundamentals.html"><strong aria-hidden="true">1.3.2.1.</strong> 0x00</a></li><li class="chapter-item "><a href="attack/initial_access/attacking_common_services/attacking_dns.html"><strong aria-hidden="true">1.3.2.2.</strong> DNS</a></li><li class="chapter-item "><a href="attack/initial_access/attacking_common_services/attacking_email_services.html"><strong aria-hidden="true">1.3.2.3.</strong> Email Services</a></li><li class="chapter-item "><a href="attack/initial_access/attacking_common_services/attacking_ftp.html"><strong aria-hidden="true">1.3.2.4.</strong> FTP</a></li><li class="chapter-item "><a href="attack/initial_access/attacking_common_services/attacking_rdp.html"><strong aria-hidden="true">1.3.2.5.</strong> RDP</a></li><li class="chapter-item "><a href="attack/initial_access/attacking_common_services/attacking_smb.html"><strong aria-hidden="true">1.3.2.6.</strong> SMB</a></li><li class="chapter-item "><a href="attack/initial_access/attacking_common_services/attacking_sql.html"><strong aria-hidden="true">1.3.2.7.</strong> SQL</a></li></ol></li><li class="chapter-item "><div><strong aria-hidden="true">1.3.3.</strong> Footprinting</div></li><li class="chapter-item "><div><strong aria-hidden="true">1.3.4.</strong> Password Attacks</div></li><li class="chapter-item "><div><strong aria-hidden="true">1.3.5.</strong> Shells &amp; Payloads</div></li></ol></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
