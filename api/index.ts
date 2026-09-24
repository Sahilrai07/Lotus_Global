import app from "../backend/server/index";

export default function handler(req: any, res: any) {
  return app(req, res);
}
