import { createContext, useContext, useState, useCallback } from 'react';
import { PERMISSIONS } from '../utils/constants';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('transitops_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      const res = await authAPI.login(email, password);
      if (res.success) {
        const userData = res.user;
        setUser(userData);
        sessionStorage.setItem('transitops_user', JSON.stringify(userData));
        localStorage.setItem('transitops_token', res.token);
        return { success: true, user: userData };
      } else {
        throw new Error(res.message || 'Login failed');
      }
    } catch (err) {
      throw new Error(err.message || 'Failed to authenticate user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, password, role, department) => {
    setIsLoading(true);
    try {
      const res = await authAPI.register(name, email, password, role, department);
      if (res.success) {
        const userData = res.user;
        setUser(userData);
        sessionStorage.setItem('transitops_user', JSON.stringify(userData));
        localStorage.setItem('transitops_token', res.token);
        return { success: true, user: userData };
      } else {
        throw new Error(res.message || 'Registration failed');
      }
    } catch (err) {
      throw new Error(err.message || 'Failed to register user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('transitops_user');
    localStorage.removeItem('transitops_token');
  }, []);

  /**
   * Check if current user has a specific permission for a module
   * @param {string} module - e.g. 'vehicles'
   * @param {string} action - e.g. 'create', 'edit', 'delete', 'view'
   */
  const hasPermission = useCallback((module, action) => {
    if (!user) return false;
    const rolePerms = PERMISSIONS[user.role];
    if (!rolePerms) return false;
    const modulePerms = rolePerms[module];
    if (!modulePerms) return false;
    return modulePerms.includes(action);
  }, [user]);

  const canView = useCallback((module) => hasPermission(module, 'view'), [hasPermission]);
  const canCreate = useCallback((module) => hasPermission(module, 'create'), [hasPermission]);
  const canEdit = useCallback((module) => hasPermission(module, 'edit'), [hasPermission]);
  const canDelete = useCallback((module) => hasPermission(module, 'delete'), [hasPermission]);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      hasPermission,
      canView,
      canCreate,
      canEdit,
      canDelete,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
