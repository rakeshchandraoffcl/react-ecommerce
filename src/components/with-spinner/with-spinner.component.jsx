import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

function WithSpinner(WrappedComponent) {
    const Spinner = ({ isLoading, ...otherProps }) =>
        isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        ) : (
            <WrappedComponent {...otherProps} />
        );

    return Spinner;
}

export default WithSpinner;
