import { TextReveal } from "@/components/magicui/text-reveal";

export function TextRevealDemo({ children }: { children: React.ReactNode }) {
    return <TextReveal className="bg-transparent">
        {typeof children === "string" ? children : String(children)}
    </TextReveal>;
}