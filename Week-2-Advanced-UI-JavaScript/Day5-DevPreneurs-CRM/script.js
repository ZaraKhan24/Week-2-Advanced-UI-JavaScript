
/* ========================================
   1. Select HTML elements using the DOM
======================================== */

const dashboard = document.querySelector(".dashboard");
const sidebar = document.querySelector("#sidebar");
const sidebarOverlay = document.querySelector("#sidebarOverlay");
const menuButton = document.querySelector("#menuButton");
const sidebarToggle = document.querySelector("#sidebarToggle");

const greeting = document.querySelector("#greeting");
const currentDate = document.querySelector("#currentDate");

/* ========================================
   2. Sidebar Toggle Functionality
======================================== */

function isMobile() {
    return window.innerWidth <= 768;
}

function toggleSidebar() {
    if (!dashboard || !sidebar) return;

    if (isMobile()) {
        // Mobile: open or close the sliding sidebar.
        const isOpen = sidebar.classList.toggle("is-open");

        sidebarOverlay?.classList.toggle("is-visible", isOpen);

        menuButton?.setAttribute("aria-expanded", String(isOpen));
        sidebarToggle?.setAttribute("aria-expanded", String(isOpen));

        menuButton?.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        sidebarToggle?.setAttribute(
            "aria-label",
            isOpen ? "Close sidebar" : "Open sidebar"
        );

        document.body.style.overflow = isOpen ? "hidden" : "";

    } else {
        // Desktop and tablet: collapse or expand the sidebar.
        const isCollapsed =
            dashboard.classList.toggle("sidebar-collapsed");

        sidebarToggle?.setAttribute(
            "aria-expanded",
            String(!isCollapsed)
        );

        sidebarToggle?.setAttribute(
            "aria-label",
            isCollapsed ? "Expand sidebar" : "Collapse sidebar"
        );
    }
}

/* ========================================
   3. Close Mobile Sidebar
======================================== */

function closeMobileSidebar() {
    sidebar?.classList.remove("is-open");
    sidebarOverlay?.classList.remove("is-visible");

    document.body.style.overflow = "";

    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation");

    sidebarToggle?.setAttribute("aria-expanded", "false");
    sidebarToggle?.setAttribute("aria-label", "Open sidebar");
}

/* ========================================
   4. Attach Click Event Listeners
======================================== */

// Button beside the logo.
sidebarToggle?.addEventListener("click", toggleSidebar);

// Menu button in the top header.
menuButton?.addEventListener("click", function () {
    if (isMobile()) {
        toggleSidebar();
    }
});

// Click outside the sidebar to close it.
sidebarOverlay?.addEventListener("click", closeMobileSidebar);

// Press Escape to close the mobile sidebar.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isMobile()) {
        closeMobileSidebar();
    }
});

// Close sidebar after clicking a navigation link on mobile.
document.querySelectorAll(".sidebar-nav .nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
        if (isMobile()) {
            closeMobileSidebar();
        }
    });
});

/* ========================================
   5. Handle Window Resize
======================================== */

function handleResize() {
    if (!dashboard || !sidebar) return;

    // Remove mobile-specific states when switching screen sizes.
    closeMobileSidebar();

    if (isMobile()) {
        // Mobile always uses the slide-in sidebar.
        dashboard.classList.remove("sidebar-collapsed");

        sidebarToggle?.setAttribute("aria-expanded", "false");
        sidebarToggle?.setAttribute("aria-label", "Open sidebar");
    } else {
        // Desktop uses the compact or expanded sidebar.
        const isCollapsed =
            dashboard.classList.contains("sidebar-collapsed");

        sidebarToggle?.setAttribute(
            "aria-expanded",
            String(!isCollapsed)
        );

        sidebarToggle?.setAttribute(
            "aria-label",
            isCollapsed ? "Expand sidebar" : "Collapse sidebar"
        );
    }
}

window.addEventListener("resize", handleResize);

/* ========================================
   6. Dynamic Greeting Using Local Time
======================================== */

function updateGreeting() {
    if (!greeting) return;

    const now = new Date();
    const hour = now.getHours();
     console.log("Time=" + now);
    let greetingText;

    if (hour >= 5 && hour < 12) {
        greetingText = "Good Morning, Team!";
    } else if (hour >= 12 && hour < 17) {
        greetingText = "Good Afternoon, Team!";
    } else if (hour >= 17 && hour < 21) {
        greetingText = "Good Evening, Team!";
    } else {
        greetingText = "Hello, Team!";
    }

    greeting.textContent = greetingText;
}

/* ========================================
   7. Display the Current Local Date
======================================== */

function updateDate() {
    if (!currentDate) return;

    const now = new Date();

    const formattedDate = new Intl.DateTimeFormat(
        undefined,
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    ).format(now);

    currentDate.textContent = formattedDate;
}

/* ========================================
   8. Initialize the Dashboard
======================================== */

function initializeDashboard() {
    updateGreeting();
    updateDate();
    handleResize();
}

// Run when the JavaScript file loads.
initializeDashboard();

// Refresh the greeting and date every minute.
setInterval(initializeDashboard, 60 * 1000);

