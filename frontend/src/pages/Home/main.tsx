/**
 * @page HomePage
 * @summary Home page displaying welcome message
 * @domain core
 * @type landing-page
 * @category public
 */
export const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Bem-vindo à Pastelaria</h1>
        <p className="text-lg text-gray-600">Sistema em desenvolvimento</p>
      </div>
    </div>
  );
};

export default HomePage;
