export function getAqiInfo(aqi: number) {
    switch (aqi) {
        case 1: return { label: "Good", color: "#55A84F" };
        case 2: return { label: "Fair", color: "#A3C853" };
        case 3: return { label: "Moderate", color: "#E5D565" };
        case 4: return { label: "Poor", color: "#E39C4A" };
        case 5: return { label: "Very Poor", color: "#D63C3C" };
        default: return { label: "Unknown", color: "#777" };
    }
}