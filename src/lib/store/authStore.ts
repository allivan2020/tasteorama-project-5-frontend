// Изначально структура Zustand-стора проектировалась под хранение строки-токена (token: string). Однако, в текущей реализации нашего приложения авторизация работает через HTTP-only Cookie (сессии). При таком подходе бэкенд из соображений безопасности (защита от XSS-атак) не возвращает токен в теле JSON-ответа. Браузер сам автоматически сохраняет токен в Cookie и прикрепляет его к каждому последующему запросу к серверу.Следовательно, на фронтенде у нас физически нет строки-токена, которую можно было бы записать в стор.

import { create } from "zustand";
import { User } from "@/app/types/user";

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ isAuthenticated: false, user: null }));
  },
}));
