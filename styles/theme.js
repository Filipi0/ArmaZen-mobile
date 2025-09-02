// Theme.js - Centralização de cores e estilos
export const colors = {
  primary: '#2b4c7e',      // Azul principal
  secondary: '#567ebb',    // Azul secundário  
  background: '#1f1f20',   // Fundo escuro
  surface: '#606d80',      // Superfícies (inputs, cards)
  text: '#dce0e6',         // Texto principal
  textSecondary: '#606d80', // Texto secundário
  success: '#4caf50',      // Verde para sucesso
  error: '#f44336',        // Vermelho para erro
  warning: '#ff9800',      // Laranja para aviso
  white: '#ffffff',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.text,
  },
  caption: {
    fontSize: 14,
    color: colors.textSecondary,
  },
};

export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
    marginBottom: spacing.sm,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
};
