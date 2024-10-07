import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
  customClass: "text-xs font-normal text-gray-800",
});

export const showToast = (icon, title) => {
  Toast.fire({
    icon,
    title,
  });
};
