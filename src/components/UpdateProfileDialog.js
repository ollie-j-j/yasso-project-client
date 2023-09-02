import React from "react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";

function UpdateProfileDialog({ open, handleOpen }) {

    return (
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Profile successfully updated</DialogHeader>
            <DialogBody divider>
                Your profile has been updated, well done!
            </DialogBody>
            <DialogFooter>
                <Link to="/profile">
                    <Button onClick={handleOpen}>
                        <span>Return to profile</span>
                    </Button>
                </Link>
            </DialogFooter>
        </Dialog>
    );
}

export default UpdateProfileDialog;
