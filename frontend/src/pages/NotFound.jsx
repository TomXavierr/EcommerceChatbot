import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="padding-x py-10 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-slate-gray mb-6">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-500 underline">Back to Home</Link>
    </section>
  );
};

export default NotFound;
