import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

function Modal({ open, close, children, handleSubmit }) {

    return (
        <>
            <Dialog open={open} handler={close} size="xl">
                <DialogHeader>Todo List App.</DialogHeader>
                <form action={handleSubmit}>
                    {children}
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={close}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={handleSubmit}>
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}

export default Modal;