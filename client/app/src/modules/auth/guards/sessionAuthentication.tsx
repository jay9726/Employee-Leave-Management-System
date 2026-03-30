
const KEY = 'auth_session';


export const SessionAuthentication = {
    setSession(data: any) {
        sessionStorage.setItem(KEY, JSON.stringify(data))
    },

    getSession() {
        const raw = sessionStorage.getItem(KEY);
        if (!raw) return null;

        try {
            return JSON.parse(raw) as any;
        } catch (error) {
            return null;
        }
    },

    clearSession() {
        sessionStorage.removeItem(KEY);
    },
}