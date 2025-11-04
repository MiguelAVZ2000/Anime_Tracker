import type { NextAuthConfig } from 'next-auth';
import { authOptions as baseAuthOptions } from './auth'; // Importar la configuración base

export const authOptions: NextAuthConfig = {
  ...baseAuthOptions,
  // Aquí se podrían añadir configuraciones específicas para el middleware si fueran diferentes
  // Por ejemplo, si el middleware necesita un proveedor diferente o callbacks modificados.
  // Para este caso, simplemente extendemos la configuración base.
};