export function useEdad() {

    const isValidDate = (dateString) => {

        const parts = dateString.split('-');
        if (parts.length !== 3) return false;

        const day = parseInt(parts[2], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[0], 10);

        const date = new Date(year, month - 1, day);

        return (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
        );
    };

    const calculateEdad = (dateString) => {

        if (!dateString) return '-';

        if (!isValidDate(dateString)) return '-';

        const [year, month, day] = dateString.split('-').map(Number);

        const dob = new Date(year, month - 1, day);
        const today = new Date();

        let age = today.getFullYear() - dob.getFullYear();

        const monthDiff = today.getMonth() - dob.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        return age;
    };

    return { isValidDate , calculateEdad }

}