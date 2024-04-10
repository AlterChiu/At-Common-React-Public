import { CollapseProps } from "@mui/material/Collapse";

export interface AtCollapseModel extends Omit<CollapseProps, "ref"> {
    ref?: AtCollpaseRef;
}

export interface AtCollpaseRef {
    setClose: () => void;
    setOpen: () => void;
    toggle: () => void;

    isOpen: () => boolean;
}