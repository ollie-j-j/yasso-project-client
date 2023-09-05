import React from "react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";

function DeletePlanDialog({ open, handleOpen, onConfirmDelete }) {

    const handleConfirm = () => {
        onConfirmDelete();
        handleOpen();
    };

    return (
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Delete plan</DialogHeader>
            <DialogBody divider>
                Are you sure you want to delete the plan? If you do, you will be redirected to the add plan page where you can insert a new plan
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button onClick={handleConfirm}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default DeletePlanDialog;
