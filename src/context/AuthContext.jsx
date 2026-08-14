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

  /*
   * ============================================================
   * LOAD PROFILE + ROLE
   * ============================================================
   */
  const loadProfileAndRole = useCallback(async (currentUser) => {
    console.log(
      "AUTH FUNCTION STARTED",
      currentUser?.id
    );

    if (!currentUser) {
      setProfile(null);
      setRole(null);
      return;
    }

    try {
      console.log("AUTH TRY STARTED");

      /*
       * ========================================================
       * STEP 1 — LOAD PROFILE
       * ========================================================
       */

      console.log("AUTH STEP 1: loading profile");

      const {
        data: profileData,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .maybeSingle();

      console.log("AUTH STEP 1 RESULT:", {
        profileData,
        profileError,
      });

      if (profileError) {
        console.error(
          "PROFILE ERROR:",
          profileError
        );

        setProfile(null);
        setRole(null);

        return;
      }

      setProfile(profileData || null);

      /*
       * ========================================================
       * STEP 2 — LOAD USER ROLE
       * ========================================================
       */

      console.log(
        "AUTH STEP 2: loading user role"
      );

      const {
        data: userRoleData,
        error: userRoleError,
      } = await supabase
        .from("user_roles")
        .select("role_id")
        .eq("user_id", currentUser.id)
        .maybeSingle();

      console.log("AUTH STEP 2 RESULT:", {
        userRoleData,
        userRoleError,
      });

      if (userRoleError) {
        console.error(
          "USER ROLE ERROR:",
          userRoleError
        );

        setRole(null);

        return;
      }

      /*
       * No role assigned
       */
      if (!userRoleData?.role_id) {
        console.warn(
          "AUTH WARNING: No role assigned to user."
        );

        setRole(null);

        return;
      }

      /*
       * ========================================================
       * STEP 3 — LOAD ROLE
       * ========================================================
       */

      console.log(
        "AUTH STEP 3: loading role"
      );

      const {
        data: roleData,
        error: roleError,
      } = await supabase
        .from("roles")
        .select("*")
        .eq("id", userRoleData.role_id)
        .maybeSingle();

      console.log("AUTH STEP 3 RESULT:", {
        roleData,
        roleError,
      });

      if (roleError) {
        console.error(
          "ROLE ERROR:",
          roleError
        );

        setRole(null);

        return;
      }

      /*
       * Role record does not exist
       */
      if (!roleData) {
        console.warn(
          "AUTH WARNING: Role record not found."
        );

        setRole(null);

        return;
      }

      /*
       * ========================================================
       * NORMALIZE ROLE
       * ========================================================
       */

      const rawRoleName =
        roleData?.name ??
        roleData?.role_name ??
        null;

      const normalizedRole =
        normalizeRole(rawRoleName);

      console.log("AUTH DEBUG:", {
        userId: currentUser.id,
        profile: profileData,
        userRole: userRoleData,
        roleData,
        rawRoleName,
        normalizedRole,
      });

      /*
       * ========================================================
       * SAVE AUTH DATA
       * ========================================================
       */

      setProfile(profileData || null);
      setRole(normalizedRole);
    } catch (error) {
      console.error(
        "Authentication data loading error:",
        error
      );

      setProfile(null);
      setRole(null);
    }
  }, []);

  /*
   * ============================================================
   * REFRESH USER
   * ============================================================
   */

  const refreshUser = useCallback(async () => {
    setLoading(true);

    try {
      const {
        data: { session: currentSession },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error(
          "Session loading error:",
          error
        );

        setSession(null);
        setUser(null);
        setProfile(null);
        setRole(null);

        return;
      }

      const currentUser =
        currentSession?.user ?? null;

      setSession(currentSession);
      setUser(currentUser);

      if (currentUser) {
        await loadProfileAndRole(currentUser);
      } else {
        setProfile(null);
        setRole(null);
      }
    } catch (error) {
      console.error(
        "Refresh user error:",
        error
      );

      setSession(null);
      setUser(null);
      setProfile(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  }, [loadProfileAndRole]);

  /*
   * ============================================================
   * INITIAL AUTHENTICATION
   * ============================================================
   */

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session: currentSession },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error(
            "Initial session error:",
            error
          );

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

        const currentUser =
          currentSession?.user ?? null;

        setSession(currentSession);
        setUser(currentUser);

        if (currentUser) {
          await loadProfileAndRole(
            currentUser
          );
        } else {
          setProfile(null);
          setRole(null);
        }

        if (mounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error(
          "Authentication initialization error:",
          error
        );

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
     * ==========================================================
     * SUPABASE AUTH STATE LISTENER
     * ==========================================================
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

        /*
         * SIGNED OUT
         */
        if (event === "SIGNED_OUT") {
          setProfile(null);
          setRole(null);
          setLoading(false);

          return;
        }

        /*
         * New authenticated session
         */
        if (newSession?.user) {
          setLoading(true);

          /*
           * Run after Supabase auth callback
           * completes.
           */
          setTimeout(async () => {
            if (!mounted) {
              return;
            }

            await loadProfileAndRole(
              newSession.user
            );

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

    /*
     * ==========================================================
     * CLEANUP
     * ==========================================================
     */

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadProfileAndRole]);

  /*
   * ============================================================
   * SIGN IN
   * ============================================================
   */

  const signIn = useCallback(
    async (email, password) => {
      const {
        data,
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return data;
    },
    []
  );

  /*
   * ============================================================
   * SIGN UP
   * ============================================================
   */

  const signUp = useCallback(
    async (email, password, fullName) => {
      const {
        data,
        error,
      } = await supabase.auth.signUp({
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
    },
    []
  );

  /*
   * ============================================================
   * SIGN OUT
   * ============================================================
   */

  const signOut = useCallback(async () => {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setUser(null);
    setSession(null);
    setProfile(null);
    setRole(null);
  }, []);

  /*
   * ============================================================
   * CURRENT USER
   * ============================================================
   */

  const getCurrentUser = useCallback(() => {
    return user;
  }, [user]);

  /*
   * ============================================================
   * CONTEXT VALUE
   * ============================================================
   */

  const value = useMemo(
    () => ({
      user,
      session,
      profile,
      role,
      loading,

      isAuthenticated: Boolean(
        user && session
      ),

      signIn,
      signUp,
      signOut,

      refreshUser,
      getCurrentUser,

      dashboardPath:
        getDashboardPath(role),
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

  /*
   * ============================================================
   * PROVIDER
   * ============================================================
   */

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/*
 * ==============================================================
 * USE AUTH
 * ==============================================================
 */

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