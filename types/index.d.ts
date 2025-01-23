import type { Mermaid } from 'mermaid'

declare module '#app' {
    interface NuxtApp {
        $mermaid(): Mermaid
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $mermaid(): Mermaid
    }
}

export { }