import Spinner from 'react-bootstrap/Spinner';
const SpinnerPage = () => {
    return (
        <>
            <Spinner  style={{margin: '0 auto', background: 'none', display: 'block', width: "200px", height: "200px" }} animation="border" variant="success" />
        </>
    )
}

export default SpinnerPage;