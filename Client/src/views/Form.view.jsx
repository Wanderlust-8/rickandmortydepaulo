import Form from "../components/Form/Form";
const FormView = (props) => {
    const { login } = props;
    return (
        <div>
            <Form login={login} />
        </div>
    )
};
export default FormView
