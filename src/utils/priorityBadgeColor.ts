export const priorityBadgeColorSetter = (priority: string) : string => {
    let badgeColor: "green" | "yellow" | "red"; 

    switch (priority) {
        case "Low":
            badgeColor = "green";
            break;
        case "Medium":
            badgeColor = "yellow";
            break;
        case "High":
            badgeColor = "red";
            break;
        default:
            badgeColor = "green";
            break;
    }
    return badgeColor;
}