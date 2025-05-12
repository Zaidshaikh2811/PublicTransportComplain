import { TypingAnimation } from "@/components/magicui/typing-animation";
export function TypingAnimationDemo({ children }: { children: React.ReactNode }) {
    return <TypingAnimation className="text-primary text-6xl">{String(children)}</TypingAnimation>;
}