import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogFooter,
    DialogBody,
} from "@material-tailwind/react";
import InputForm from "./InputForm/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTodos } from "../redux/Action/todosAction";
import { toast } from "react-toastify";

function ModalDelete({ open, close, handleSubmit }) {
    const { id } = useParams()
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const [input, setInput] = useState("");

    // Kondisi untuk mengaktifkan tombol "Delete"
    const isInputValid = input.toLowerCase() === "yes, i'm sure";

    const handleDelete = () => {
        const data = {
            id,
            token: user.token
        }
        dispatch(deleteTodos(data))

        close
        toast.success('Success delete todos')
        navigate('/todos')
    }

    return (
        <>
            <Dialog open={open} handler={close} size="md">
                <DialogHeader>Todo List App</DialogHeader>
                <DialogBody>
                    <InputForm
                        label={`Type "Yes, I'm Sure" to delete this task`}
                        name="delete"
                        id="delete"
                        type="text"
                        onChange={(e) => setInput(e.target.value)}
                    />
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={close}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color={isInputValid ? "red" : "gray"}
                        onClick={isInputValid ? handleDelete : null}
                        disabled={!isInputValid}
                    >
                        <span>Delete</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default ModalDelete;
