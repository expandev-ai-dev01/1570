import type { CanaisContatoProps } from './types';

/**
 * @component CanaisContato
 * @summary Displays contact channels and social media
 * @domain estabelecimento
 * @type domain-component
 * @category display
 */
export const CanaisContato = ({ contato }: CanaisContatoProps) => {
  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  const whatsappUrl = contato.whatsapp
    ? `https://wa.me/55${contato.whatsapp.replace(/\D/g, '')}`
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Canais de Contato</h2>

      <div className="space-y-4 mb-6">
        {contato.telefoneFixo && (
          <div className="flex items-center gap-3">
            <span className="text-2xl">📞</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Telefone Fixo</h3>
              <a href={`tel:${contato.telefoneFixo}`} className="text-blue-600 hover:text-blue-700">
                {formatPhone(contato.telefoneFixo)}
              </a>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <span className="text-2xl">📱</span>
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Celular</h3>
            <a
              href={`tel:${contato.telefoneCelular}`}
              className="text-blue-600 hover:text-blue-700"
            >
              {formatPhone(contato.telefoneCelular)}
            </a>
          </div>
        </div>

        {contato.whatsapp && whatsappUrl && (
          <div className="flex items-center gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">WhatsApp</h3>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700"
              >
                {formatPhone(contato.whatsapp)}
              </a>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <span className="text-2xl">✉️</span>
          <div>
            <h3 className="text-sm font-semibold text-gray-700">E-mail</h3>
            <a href={`mailto:${contato.email}`} className="text-blue-600 hover:text-blue-700">
              {contato.email}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl">🕐</span>
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Horário de Atendimento</h3>
            <p className="text-gray-900">{contato.horarioAtendimento}</p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Redes Sociais</h3>
        <div className="flex flex-wrap gap-3">
          {contato.facebook && (
            <a
              href={contato.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <span>📘</span>
              <span className="text-sm font-medium">Facebook</span>
            </a>
          )}
          {contato.instagram && (
            <a
              href={contato.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              <span>📷</span>
              <span className="text-sm font-medium">Instagram</span>
            </a>
          )}
          {contato.twitter && (
            <a
              href={contato.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors"
            >
              <span>🐦</span>
              <span className="text-sm font-medium">Twitter</span>
            </a>
          )}
          {contato.youtube && (
            <a
              href={contato.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              <span>📺</span>
              <span className="text-sm font-medium">YouTube</span>
            </a>
          )}
          {contato.tiktok && (
            <a
              href={contato.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              <span>🎵</span>
              <span className="text-sm font-medium">TikTok</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
