import { TextAnimate } from "@/components/magicui/text-animate";

export function TextAnimateDemo6({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <TextAnimate delay={0.5} animation="slideLeft" by="character" className="text-5xl font-bold">
            {
                children
            }
        </TextAnimate>
    );
}