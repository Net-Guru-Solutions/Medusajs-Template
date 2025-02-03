import Medusa from "@medusajs/js-sdk"

export const sdk = new Medusa({
    baseUrl: "http://192.168.68.129:9000",
    debug: process.env.NODE_ENV === "development",
    auth: {
        type: "session",
    },
})