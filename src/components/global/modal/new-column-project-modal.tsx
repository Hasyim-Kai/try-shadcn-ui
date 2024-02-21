import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/store";
import storeHelper from "@/store/storeHelper";
import { IToast } from "@/utils/helper/toast";
import { Plus } from "lucide-react";

interface Props {
    // open: boolean;
    // setOpen: Dispatch<SetStateAction<boolean>>
}

export default function NewColumnProjectModal({ }: Props) {
    const { state } = useAppContext();
    const { toggleNewColProjectModal } = storeHelper();

    return <Dialog open={state.isNewColModalOpen} onOpenChange={toggleNewColProjectModal}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
            </DialogHeader>

            <section>
                <form method="post">
                    <Input className="mb-5" type="text" placeholder="Project's Name" />

                    <Button className="gap-3" type="button" variant="default"
                        // <Button className="gap-3" type="submit" variant="default"
                        onClick={() => IToast(`Column Has Created`, `Now you can add some task to new column`)}>
                        <Plus size={16} /> Create
                    </Button>
                </form>
            </section>

            {/* <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
                <Button type="button" variant="secondary">Close</Button>
            </DialogClose>
        </DialogFooter> */}
        </DialogContent>
    </Dialog>
}