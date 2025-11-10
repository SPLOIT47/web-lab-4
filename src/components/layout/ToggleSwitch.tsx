interface ToggleSwitchProps {
    value: boolean;
    onToggle: () => void;
    label: string;
}

export function ToggleSwitch({ value, onToggle, label }: ToggleSwitchProps) {
    return (
        <div className="flex items-center flex-col w-[110px] h-[61px]">
            <button
                onClick={onToggle}
                className="
                    relative w-16 h-8 flex items-center
                    rounded-full transition-colors duration-300
                    bg-[#D9D9D9]
                "
            >
                <span
                    className={`
                        absolute w-6 h-6 rounded-full 
                        bg-[#111111]
                        shadow-md transform transition-transform duration-300
                        ${value ? "translate-x-8" : "translate-x-1"}
                    `}
                />
            </button>

            <span className="mt-1 text-sm font-extrabold text-slate-700 dark:text-slate-300">
                {label}
            </span>
        </div>
    );
}