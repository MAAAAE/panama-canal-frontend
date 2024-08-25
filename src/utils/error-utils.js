export const parsePanamaErrorMessage = (error) => {
    const defaultErrorMessage = 'An unknown error occurred.';
    return error?.response?.data?.errorMessage ?? defaultErrorMessage;
};