import React from "react";
import classNames from "classnames";
// import "./button.css";

interface ButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
    componentType?: "button" | "label";
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className, componentType }) => {
    if (componentType === "label") {
        return (
            <label
                onClick={onClick}
                className={classNames("qis-button white", className)}
            >
                {children}
            </label>
        );
    }

    return (
        <button
            onClick={onClick}
            className={classNames("qis-button white", className)}
        >
            {children}
        </button>
    );
};
