import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface EditButtonProps extends DetailedHTMLProps<
ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement
> {
	courseId: string
}