import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/store";
import storeHelper from "@/store/storeHelper";
import { IToast } from "@/utils/helper/toast";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, } from "react";
import { useForm } from "react-hook-form";

interface Props {
    // open: boolean;
    // setOpen: Dispatch<SetStateAction<boolean>>
    addColFn: Dispatch<SetStateAction<any>>
}

export default function NewColumnProjectModal({ addColFn }: Props) {
    const { state } = useAppContext();
    const { toggleNewColProjectModal } = storeHelper();
    const { register, handleSubmit, watch, formState: { errors }, } = useForm({
        values: {
            colName: '',
            projectCapacity: 0
        }
    });
    function addColProject() {
        addColFn((prevState: any) => ({
            ...prevState,
            [watch(`colName`).trim().toLowerCase()]: {
                id: watch(`colName`)?.trim().toLowerCase(),
                title: watch(`colName`),
                maxMember: watch(`projectCapacity`),
                items: [],
            }
        }));
    }
    function onSubmit() {
        toggleNewColProjectModal()
        addColProject()
        IToast(`Column ${watch(`colName`)} Has Created`, `Now you can add some task to new column`)
    }

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input type="text" placeholder="Project's Name" {...register("colName", { required: true })}
                        className={`mb-3 ${errors.colName ? "outline outline-red-400" : ""}`} />
                    <Input type="number" placeholder="Project's Capacity" {...register("projectCapacity", { required: true })}
                        className={`mb-3 ${errors.projectCapacity ? "outline outline-red-400" : ""}`} />

                    <Button className="gap-3" type="submit" variant="default">
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