import Error from "../components/Error/Error";

const ErrorView = (props) => {

    const { logout, setHide } = props;
    return (
        <>
            <Error logout={logout} setHide={setHide} />
        </>
    )
};
export default ErrorView;
