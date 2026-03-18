export function useEmail() {

    const validateEmail = (email) => {
        const regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex_email.test(email);
    }

    return { validateEmail }
}