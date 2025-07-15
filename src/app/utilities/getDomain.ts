export function getDomainForNextApp() {
    const environment = process.env.NODE_ENV;
    if (environment === "development") {
        return "http://localhost:3000";
    } else {
        return process.env.NEXT_PUBLIC_DOMAIN_FOR_NEXT
    }
}

export function getDomainForPythonApp() {
    const environment = process.env.NODE_ENV;
    if (environment === "development") {
        return "http://localhost:5000";
    } else {
        return process.env.NEXT_PUBLIC_DOMAIN_FOR_PYTHON
    }
}