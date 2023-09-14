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
            <DialogHeader>plan successfully updated</DialogHeader>
            <DialogBody divider>
                your plan has been updated, well done!
            </DialogBody>
            <DialogFooter>
                <Button className="lowercase text-sm" onClick={handleOpen}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default UpdateRunDialog;
