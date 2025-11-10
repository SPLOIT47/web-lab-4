import { useTheme } from "@/hooks/useTheme";
import { ToggleSwitch } from "@/components/layout/ToggleSwitch";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <ToggleSwitch
            value={theme === "dark"}
            onToggle={toggleTheme}
            label={theme === "dark" ? "Dark Mode" : "Light Mode"}
        />
    );
}