import { toast } from "sonner"

export function IToast(title: string, description: string) {
    toast(title, {
        description,
        action: {
            label: "X",
            onClick: () => console.log("X"),
        },
    })
}