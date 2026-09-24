export default function handler(_req, res) {
  res.status(200).json({
    success: true,
    message: "Lotus Global School API is active and operational",
    timestamp: new Date().toISOString(),
  });
}
