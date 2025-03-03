import Swal from "sweetalert2";

export const showNotification = (title: string, text: string, icon: "success" | "error" | "warning" | "info" | "question") => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'OK',
    });
}; 