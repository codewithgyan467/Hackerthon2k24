// src/components/PaymentIntegration.js
import { useState } from 'react';
import axios from 'axios';

const PaymentIntegration = () => {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePayment = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/api/payment', { amount });
            setSuccess('Payment successful: ' + response.data.message);
        } catch (err) {
            setError('Payment failed: ' + err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Payment Integration</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
            />
            <button onClick={handlePayment} disabled={loading}>
                {loading ? 'Processing...' : 'Make Payment'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default PaymentIntegration;
