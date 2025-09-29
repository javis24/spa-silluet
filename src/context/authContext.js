"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);

          // 🔹 Redirigir solo si estoy en zona protegida
          if (
            pathname.startsWith("/dashboard") ||
            pathname.startsWith("/pacientes")
          ) {
            router.push("/login");
          }
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);

        if (
          pathname.startsWith("/dashboard") ||
          pathname.startsWith("/pacientes")
        ) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router, pathname]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
