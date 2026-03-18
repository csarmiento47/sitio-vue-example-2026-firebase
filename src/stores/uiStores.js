import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
    state: () => ({
        snackbar: false,
        message: "",
        color: "success"
    }),
    actions: {
        showSuccess(msg) {
            this.message = msg
            this.color = "success"
            this.snackbar = true
        },
        showError(msg) {
            this.message = msg
            this.color = "error"
            this.snackbar = true
        },
        showWarning(msg) {
            this.message = msg
            this.color = "error"
            this.snackbar = true
        }
    }
})