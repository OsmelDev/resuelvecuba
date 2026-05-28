export default function ActivationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="text-6xl mb-4">⏳</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Cuenta en espera de activación
        </h1>
        <p className="text-gray-600 mb-4">
          Su cuenta ha sido registrada exitosamente. Estamos esperando que el
          administrador procese tu pago y active tu cuenta.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            💡 Mientras esperas, puedes ir preparando tus servicios y perfil.
            Tan pronto el administrador te active, podrás comenzar a recibir
            clientes.
          </p>
        </div>
      </div>
    </div>
  );
}
