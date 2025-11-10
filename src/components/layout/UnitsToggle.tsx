import { useUnits } from "@/context/UnitsContext";
import { ToggleSwitch } from "@/components/layout/ToggleSwitch";

export default function UnitsToggle() {
    const { units, setUnits } = useUnits();

    return (
        <ToggleSwitch
            value={units === "imperial"}
            onToggle={() =>
                setUnits(units === "metric" ? "imperial" : "metric")
            }
            label={units === "metric" ? "°C" : "°F"}
        />
    );
}