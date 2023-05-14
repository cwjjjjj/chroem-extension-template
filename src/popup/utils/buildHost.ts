export enum DevEnv {
  BETA = "BETA",
  PROD = "PROD",
}

export default function buildHost(host: string) {
  const devEnv = import.meta.env.VITE_DEV_ENV;
  console.log("env", devEnv);

  return devEnv === "BETA"
    ? host.replace(/\./, `-${(devEnv as string).toLowerCase()}.`)
    : host;
}
