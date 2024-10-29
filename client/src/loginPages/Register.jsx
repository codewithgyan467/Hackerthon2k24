
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Register = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email format').required('Required'),
            password: Yup.string().min(6, 'Must be at least 6 characters').required('Required')
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:5000/api/users/register', values);
                console.log('Registration successful:', response.data);
            } catch (error) {
                console.error('Registration failed:', error);
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? <p style={{ color: 'red' }}>{formik.errors.name}</p> : null}
            
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <p style={{ color: 'red' }}>{formik.errors.email}</p> : null}

            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? <p style={{ color: 'red' }}>{formik.errors.password}</p> : null}

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
