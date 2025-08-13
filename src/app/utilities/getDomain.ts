export function getDomainForNextApp() {
    const environment = process.env.NODE_ENV;
    if (environment === "development") {
        return "http://localhost:3000";
    } else {
        const domain = process.env.NEXT_PUBLIC_DOMAIN_FOR_NEXT;
        if (!domain) {
            throw new Error("NEXT_PUBLIC_DOMAIN_FOR_NEXT environment variable is required in production");
        }
        return domain;
    }
}

export function getDomainForPythonApp() {
    const environment = process.env.NODE_ENV;
    if (environment === "development") {
        return "http://localhost:5000";
    } else {
        const domain = process.env.NEXT_PUBLIC_DOMAIN_FOR_PYTHON;
        if (!domain) {
            throw new Error("NEXT_PUBLIC_DOMAIN_FOR_PYTHON environment variable is required in production");
        }
        return domain;
    }
}