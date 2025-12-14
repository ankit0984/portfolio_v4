import {FloatingDockClient} from "@/components/floatingDockClient";

const navigation = [
    {
        "title": "Home",
        "href": "#home",
        "icon": "IconHome",
        "isExternal": false,
    },
    {
        "title": "About",
        "href": "#about",
        "icon": "IconUser",
        "isExternal": false,
    },
    {
        "title": "Experience",
        "href": "#experience",
        "icon": "IconBriefcase",
        "isExternal": false,
    },
    {
        "title": "Projects",
        "href": "#projects",
        "icon": "IconCode",
        "isExternal": false,
    },
    {
        "title": "Skills",
        "href": "#skills",
        "icon": "IconBulb",
        "isExternal": false,
    },
    {
        "title": "Services",
        "href": "#services",
        "icon": "IconTools",
        "isExternal": false,
    },
    {
        "title": "Education",
        "href": "#education",
        "icon": "IconSchool",
        "isExternal": false,
    },
    {
        "title": "Certifications",
        "href": "#certifications",
        "icon": "IconCertificate",
        "isExternal": false,
    },
    {
        "title": "Achievements",
        "href": "#achievements",
        "icon": "IconTrophy",
        "isExternal": false,
    },
    {
        "title": "Blog",
        "href": "#blog",
        "icon": "IconNews",
        "isExternal": false,

    },
    {
        "title": "Testimonials",
        "href": "#testimonials",
        "icon": "IconMessageCircle",
        "isExternal": false,

    },
    {
        "title": "Contact",
        "href": "#contact",
        "icon": "IconMail",
        "isExternal": false,

    },
    {
        "title": "GitHub",
        "href": "https://github.com/johndoe",
        "icon": "IconBrandGithub",
        "isExternal": true,

    },
    {
        "title": "Twitter",
        "href": "https://twitter.com/johndoe",
        "icon": "IconBrandX",
        "isExternal": true,

    }
    ]

export async function FloatingDock() {
    const navItems = navigation;
    if (!navItems || navItems.length === 0) {
        return null;
    }

    return <FloatingDockClient navItems={navItems} />;
}
