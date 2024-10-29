import{ useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

const BulkUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/admin/bulk-upload', formData);
            setSuccess(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Failed to upload file');
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Bulk Upload</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {loading && <LoadingSpinner />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default BulkUpload;
