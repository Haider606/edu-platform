import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

const ROLE_DASHBOARDS = {
  Student: "/student/dashboard",
  Teacher: "/teacher/dashboard",
  Manager: "/manager/dashboard",
  Admin: "/admin/dashboard",
};

function normalizeRole(roleName) {
  if (!roleName) {
    return null;
  }

  const normalized = String(roleName).trim().toLowerCase();

  const roles = {
    student: "Student",
    teacher: "Teacher",
    manager: "Manager",
    admin: "Admin",
  };

  return roles[normalized] || null;
}

export function getDashboardPath(role) {
  return ROLE_DASHBOARDS[role] || null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfileAndRole = useCallback(async (currentUser) => {
    if (!currentUser) {
      setProfile(null);
      setRole(null);
      return;
    }

    try {
      /*
       * ----------------------------------------------------
       * Load profile
       * ----------------------------------------------------
       *
       * We use select("*") because we do not want to assume
       * columns that may not exist in your current table.
       */
      const { data: profileData, error: profileError } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .maybeSingle();

      if (profileError) {
        console.error("Profile loading error:", profileError);
        setProfile(null);
        setRole(null);
        return;
      }

      setProfile(profileData || null);

      /*
       * ----------------------------------------------------
       * Load user role
       * ----------------------------------------------------
       *
       * Expected relationship:
       *
       * user_roles.user_id -> profiles.id
       * user_roles.role_id -> roles.id
       *
       * We intentionally query user_roles first and then
       * roles separately instead of assuming a Supabase
       * relationship name.
       */
      const { data: userRoleData, error: userRoleError } =
        await supabase
          .from("user_roles")
          .select("role_id")
          .eq("user_id", currentUser.id)
          .maybeSingle();

      if (userRoleError) {
        console.error("User role loading error:", userRoleError);
        setRole(null);
        return;
      }

      if (!userRoleData?.role_id) {
        setRole(null);
        return;
      }

      const { data: roleData, error: roleError } =
        await supabase
          .from("roles")
          .select("*")
          .eq("id", userRoleData.role_id)
          .maybeSingle();

      if (roleError) {
        console.error("Role loading error:", roleError);
        setRole(null);
        return;
      }

      /*
       * Different projects sometimes call the column:
       *
       * name
       * role_name
       *
       * We support both without changing the database.
       */
      const rawRoleName =
        roleData?.name ??
        roleData?.role_name ??
        null;

      const normalizedRole = normalizeRole(rawRoleName);

console.log("AUTH DEBUG:", {
  userId: currentUser.id,
  profile: profileData,
  userRole: userRoleData,
  roleData,
  rawRoleName,
  normalizedRole,
});

setRole(normalizedRole);
setProfile(profileData || null);
    } catch (error) {
      console.error("Authentication data loading error:", error);

      setProfile(null);
      setRole(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    setLoading(true);

    try {
      const {
        data: { session: currentSession },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session loading error:", error);

        setSession(null);
        setUser(null);
        setProfile(null);
        setRole(null);

        return;
      }

      const currentUser = currentSession?.user ?? null;

      setSession(currentSession);
      setUser(currentUser);

      if (currentUser) {
        await loadProfileAndRole(currentUser);
      } else {
        setProfile(null);
        setRole(null);
      }
    } catch (error) {
      console.error("Refresh user error:", error);

      setSession(null);
      setUser(null);
      setProfile(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  }, [loadProfileAndRole]);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session: currentSession },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Initial session error:", error);

          if (mounted) {
            setSession(null);
            setUser(null);
            setProfile(null);
            setRole(null);
            setLoading(false);
          }

          return;
        }

        if (!mounted) {
          return;
        }

        const currentUser = currentSession?.user ?? null;

        setSession(currentSession);
        setUser(currentUser);

        if (currentUser) {
          await loadProfileAndRole(currentUser);
        } else {
          setProfile(null);
          setRole(null);
        }

        if (mounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Authentication initialization error:", error);

        if (mounted) {
          setSession(null);
          setUser(null);
          setProfile(null);
          setRole(null);
          setLoading(false);
        }
      }
    };

    initializeAuth();

    /*
     * Supabase handles:
     *
     * SIGNED_IN
     * SIGNED_OUT
     * TOKEN_REFRESHED
     * USER_UPDATED
     *
     * We keep one listener for the whole application.
     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        if (!mounted) {
          return;
        }

        setSession(newSession ?? null);
        setUser(newSession?.user ?? null);

        if (event === "SIGNED_OUT") {
          setProfile(null);
          setRole(null);
          setLoading(false);
          return;
        }

        /*
         * Do not perform a large database operation directly
         * inside the Supabase auth callback.
         *
         * Schedule it after the callback completes.
         */
        if (newSession?.user) {
          setLoading(true);

          setTimeout(async () => {
            if (!mounted) {
              return;
            }

            await loadProfileAndRole(newSession.user);

            if (mounted) {
              setLoading(false);
            }
          }, 0);
        } else {
          setProfile(null);
          setRole(null);
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadProfileAndRole]);

  const signIn = useCallback(async (email, password) => {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      throw error;
    }

    return data;
  }, []);

  const signUp = useCallback(async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      throw error;
    }

    return data;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setUser(null);
    setSession(null);
    setProfile(null);
    setRole(null);
  }, []);

  const getCurrentUser = useCallback(() => {
    return user;
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      session,
      profile,
      role,
      loading,
      isAuthenticated: Boolean(user && session),

      signIn,
      signUp,
      signOut,

      refreshUser,
      getCurrentUser,

      dashboardPath: getDashboardPath(role),
    }),
    [
      user,
      session,
      profile,
      role,
      loading,
      signIn,
      signUp,
      signOut,
      refreshUser,
      getCurrentUser,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider."
    );
  }

  return context;
}

export default AuthContext;