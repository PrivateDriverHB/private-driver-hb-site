import { motion } from "framer-motion";

export default function Cancel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 p-6"
    >
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Paiement annulé ❌
        </h1>
        <p className="text-gray-700 mb-6">
          Votre transaction n’a pas été finalisée. Vous pouvez réessayer ou
          contacter <strong>Private Driver HB</strong> pour assistance.
        </p>
        <a
          href="/"
          className="text-white bg-red-600 hover:bg-red-700 transition-all px-6 py-2 rounded-lg font-medium"
        >
          Retour à l’accueil
        </a>
      </div>
    </motion.div>
  );
}
