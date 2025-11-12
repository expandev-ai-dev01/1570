/**
 * @component Footer
 * @summary Application footer
 * @domain core
 * @type layout-component
 * @category layout
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-sm">© {currentYear} Pastelaria. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
