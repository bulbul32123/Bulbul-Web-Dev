import React, { useEffect, useState } from "react";

export default function MailMEBox({ email, bg, service }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent.toLowerCase();
        setIsMobile(/android|iphone|ipad|ipod/.test(ua));
    }, []);


    const subject = encodeURIComponent(`Opportunity for ${service} position`);
    const body = encodeURIComponent(
        `Hello Bulbul,

We would like to discuss an opportunity with you for the ${service} position.

Best regards,
[Your Name / Company]
`
    );

    const mailto = `mailto:${email}?subject=${subject}&body=${body}`;
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

    const href = isMobile ? mailto : gmail;
    

    return (
        <div className={`flex gap-3 ${bg}`}>
            <a
                href={href}
                className="px-4 py-3 rounded-3xl text-xl"
                target="_blank"
                rel="noopener noreferrer"
            >
                Hire Me as a {service}
            </a>
        </div>
    );
}

