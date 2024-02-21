import { Button } from "../ui/button";

export default function ButtonSection() {
    return <>
        <section className="p-5">
            <h1>Button</h1>
            <div className="flex gap-5">
                <Button>Button</Button>
                <Button variant="destructive">Button</Button>
                <Button variant="secondary">Button</Button>
                <Button variant="ghost">Button</Button>
                <Button variant="link">Button</Button>
                <Button variant="outline">Button</Button>
            </div>
        </section>
        <hr />
    </>
}