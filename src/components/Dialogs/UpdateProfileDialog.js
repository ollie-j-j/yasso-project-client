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
            <DialogHeader>profile successfully updated</DialogHeader>
            <DialogBody divider>
                your profile has been updated, well done!
            </DialogBody>
            <DialogFooter>
                <Link to="/profile">
                    <Button className="lowercase text-sm" onClick={handleOpen}>
                        <span>Return to profile</span>
                    </Button>
                </Link>
            </DialogFooter>
        </Dialog>
    );
}

export default UpdateProfileDialog;
