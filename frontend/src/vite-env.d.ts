/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_SERVICE_URL: string
  readonly VITE_POSTS_SERVICE_URL: string
  readonly VITE_USERS_SERVICE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
