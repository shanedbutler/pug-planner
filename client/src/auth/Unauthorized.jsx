import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="text-center mt-12">
            <h1 className="text-3xl font-bold">403 - Unauthorized</h1>
            <p className="mt-4">You do not have permission to view this page.</p>
            <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleGoBack}>Go Back</button>
        </div>
    );
};

export default Unauthorized;