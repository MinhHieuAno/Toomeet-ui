export const publicPages: string[] = ["/profile/*"];
export const authPages: string[] = ["/auth/*"];

export const routeValidate = (pathname: string, validateRoutes: string[]) => {
    return validateRoutes.some((route) => {
        return pathname.match(new RegExp(`^${route.replace(/\*/g, ".*")}$`));
    });
};
