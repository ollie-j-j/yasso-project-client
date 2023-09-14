import React from "react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";

function RevertPlanDialog({ open, handleOpen, onConfirmRevert }) {

    const handleConfirm = () => {
        onConfirmRevert();
        handleOpen();
    };

    return (
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader>revert plan</DialogHeader>
            <DialogBody divider>
                are you sure you want to revert the plan to it's original state?
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1 lowercase text-sm"
                >
                    <span>Cancel</span>
                </Button>
                <Button className="lowercase text-sm" onClick={() => {
                    console.log("Confirm button clicked in dialog");
                    handleConfirm();
                }}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default RevertPlanDialog;
