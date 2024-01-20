import { FormikProps } from "formik";

export interface FormValues {
    email: string;
    password: string;
}

export interface SignInFunctions {
    setIsLoginTrue: React.Dispatch<React.SetStateAction<boolean>>;
}

export type LoginPageBodyProps = FormikProps<FormValues> & SignInFunctions;
