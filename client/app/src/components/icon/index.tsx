import { LUCIDE_ICON_MAP } from "./utils";


export type LucideIcon = keyof typeof LUCIDE_ICON_MAP;

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: LucideIcon
}

const Icon = ({ name, ...props }: IconProps) => {
    const IconComponent = LUCIDE_ICON_MAP[name];

    if (IconComponent) return <IconComponent {...props} />

}

export default Icon;