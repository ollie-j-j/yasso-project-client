import React from "react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";

function UpdateRunDialog({ open, handleOpen }) {

    return (
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Plan successfully updated</DialogHeader>
            <DialogBody divider>
                Your plan has been updated, well done!
            </DialogBody>
            <DialogFooter>
                <Button onClick={handleOpen}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default UpdateRunDialog;
