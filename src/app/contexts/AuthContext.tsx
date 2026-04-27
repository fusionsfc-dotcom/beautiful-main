import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../../lib/supabase";
import { User, Session } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: { role: 'user' | 'admin' } | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  accessToken: string | null;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<{ role: 'user' | 'admin' } | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // 세션 복원
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAccessToken(session?.access_token ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // 인증 상태 변화 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAccessToken(session?.access_token ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      console.log('🔍 프로필 로드 시도 - User ID:', userId);
      
      // 현재 세션 확인
      const { data: sessionData } = await supabase.auth.getSession();
      console.log('📌 현재 세션:', sessionData.session ? '있음' : '없음');
      console.log('📌 Access Token:', sessionData.session?.access_token ? '있음' : '없음');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ 프로필 로드 실패:', error);
        
        // If profile doesn't exist, call ensure-profile endpoint
        if (error.code === 'PGRST116') {
          console.log('🔧 프로필이 없습니다. 자동 생성 시도...');
          
          try {
            const response = await fetch(
              `https://${projectId}.supabase.co/functions/v1/make-server-ee767080/ensure-profile`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${sessionData.session?.access_token}`,
                },
              }
            );

            const result = await response.json();
            
            if (result.success) {
              console.log('✅ 프로필 자동 생성 성공:', result.profile);
              setProfile(result.profile);
              return;
            } else {
              console.error('❌ 프로필 자동 생성 실패:', result.error);
            }
          } catch (ensureError) {
            console.error('❌ 프로필 자동 생성 중 예외:', ensureError);
          }
        }
        
        throw error;
      }
      
      console.log('✅ 프로필 로드 성공:', data);
      setProfile(data);
    } catch (error) {
      console.error('❌ 프로필 로드 실패:', error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log('📝 회원가입 시도:', email);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ee767080/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email, password, name }),
        }
      );

      const result = await response.json();

      if (!result.success) {
        console.error('❌ 회원가입 실패:', result.error);
        return { error: result.error };
      }

      console.log('✅ 회원가입 성공:', result);
      
      // 회원가입 후 자동 로그인
      console.log('🔐 자동 로그인 시도...');
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) {
        console.error('❌ 자동 로그인 실패:', signInError);
        return { error: signInError.message };
      }
      
      if (signInData.session) {
        console.log('✅ 자동 로그인 성공');
        setSession(signInData.session);
        setUser(signInData.user);
        if (signInData.user) {
          await loadProfile(signInData.user.id);
        }
      }

      return {};
    } catch (error: any) {
      console.error('❌ 회원가입 예외:', error);
      return { error: error.message || '회원가입 실패' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error: any) {
      return { error: error.message || '로그인 실패' };
    }
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isAuthenticated: !!user,
        isAdmin: profile?.role === 'admin',
        loading,
        accessToken,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}