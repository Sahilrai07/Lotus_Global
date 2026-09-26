import React, { useEffect, useState, useRef } from "react";
import { X, Download, ExternalLink, FileText, Loader2, AlertCircle, ZoomIn, ZoomOut, RotateCcw, Printer } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileUrl: string;
  subtitle?: string;
  onDownload?: () => void;
  isDownloading?: boolean;
}

interface PdfPageProps {
  pdf: pdfjsLib.PDFDocumentProxy;
  pageNumber: number;
  scale: number;
  isFitMode: boolean;
}

const PdfPageItem: React.FC<PdfPageProps> = ({ pdf, pageNumber, scale, isFitMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [pageSize, setPageSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    let cancelRender = false;
    let renderTask: any = null;

    const render = async () => {
      try {
        setIsPageLoading(true);
        const page = await pdf.getPage(pageNumber);
        if (cancelRender) return;

        const viewport = page.getViewport({ scale });
        setPageSize({
          width: Math.floor(viewport.width),
          height: Math.floor(viewport.height),
        });

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        // Device pixel ratio for crisp rendering on high-DPI displays (capped at 2.5)
        const outputScale = Math.min(window.devicePixelRatio || 1, 2.5);
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);

        // Strict aspect-ratio preservation: width is 100% of container, height is auto
        canvas.style.width = "100%";
        canvas.style.height = "auto";
        canvas.style.aspectRatio = `${viewport.width} / ${viewport.height}`;
        canvas.style.display = "block";

        const transform = outputScale !== 1
          ? [outputScale, 0, 0, outputScale, 0, 0]
          : undefined;

        renderTask = page.render({
          canvasContext: context,
          canvas: canvas,
          viewport: viewport,
          transform: transform,
        });

        await renderTask.promise;
        if (!cancelRender) {
          setIsPageLoading(false);
        }
      } catch (err: any) {
        if (err?.name !== "RenderingCancelledException") {
          console.error(`Error rendering PDF page ${pageNumber}:`, err);
        }
      }
    };

    render();

    return () => {
      cancelRender = true;
      if (renderTask) {
        try {
          renderTask.cancel();
        } catch {}
      }
    };
  }, [pdf, pageNumber, scale]);

  return (
    <div
      className="relative my-3 sm:my-4 bg-white shadow-xl rounded-lg border border-slate-300 mx-auto overflow-hidden shrink-0 transition-[width] duration-150"
      style={{
        width: pageSize.width ? `${pageSize.width}px` : "100%",
        maxWidth: isFitMode ? "100%" : undefined,
      }}
    >
      {isPageLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center z-10 min-h-[280px]">
          <Loader2 className="w-7 h-7 animate-spin text-[#2F5187]" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="block mx-auto"
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: pageSize.width && pageSize.height ? `${pageSize.width} / ${pageSize.height}` : undefined,
        }}
      />
      <div className="bg-slate-50 border-t border-slate-200 py-1.5 px-3 text-center text-[11px] text-slate-500 font-medium select-none">
        Page {pageNumber} of {pdf.numPages}
      </div>
    </div>
  );
};

const calculateFitScale = (unscaledWidth: number = 595): number => {
  if (typeof window === "undefined") return 1.15;
  const isMobile = window.innerWidth < 640;
  if (!isMobile) return 1.15;
  const availableWidth = Math.max(260, window.innerWidth - 24);
  const fit = +(availableWidth / unscaledWidth).toFixed(2);
  return Math.min(1.0, Math.max(0.4, fit));
};

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  title,
  fileUrl,
  subtitle,
  onDownload,
  isDownloading = false,
}) => {
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [scale, setScale] = useState<number>(() => calculateFitScale());
  const [initialScale, setInitialScale] = useState<number>(() => calculateFitScale());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [directUrl, setDirectUrl] = useState<string>("");

  useEffect(() => {
    if (!isOpen || !fileUrl) {
      setPdfDoc(null);
      setIsLoading(true);
      setLoadError(null);
      setDirectUrl("");
      return;
    }

    setIsLoading(true);
    setLoadError(null);

    let cleanUrl = fileUrl.trim();
    setDirectUrl(cleanUrl);

    let cancel = false;
    let loadingTask: any = null;

    const loadPdf = async () => {
      try {
        let pdfData: Uint8Array;

        if (cleanUrl.startsWith("data:")) {
          // Decode Base64 data URI
          const base64Data = cleanUrl.split(",")[1];
          const rawBinary = atob(base64Data);
          const rawLength = rawBinary.length;
          pdfData = new Uint8Array(rawLength);
          for (let i = 0; i < rawLength; i++) {
            pdfData[i] = rawBinary.charCodeAt(i);
          }
        } else {
          // Clean URL of download=1
          const fetchUrl = cleanUrl.includes("download=")
            ? cleanUrl.replace(/([?&])download=[^&]+(&|$)/, "$1").replace(/[?&]$/, "")
            : cleanUrl;

          let buffer: ArrayBuffer | null = null;

          // Attempt 1: Fetch with cache-buster & no-store
          const sep = fetchUrl.includes("?") ? "&" : "?";
          const cacheBusterUrl = `${fetchUrl}${sep}_t=${Date.now()}`;

          try {
            const response = await fetch(cacheBusterUrl, { cache: "no-store" });
            if (response.ok) {
              const resBuf = await response.arrayBuffer();
              if (resBuf && resBuf.byteLength > 0) {
                buffer = resBuf;
              }
            }
          } catch (e1: any) {
            console.warn("Attempt 1 fetch failed:", e1?.message || e1);
          }

          // Attempt 2: If attempt 1 gave 0 bytes, try alternate direct path (e.g. static /uploads/documents/)
          if (!buffer || buffer.byteLength === 0) {
            let altUrl = "";
            if (fetchUrl.includes("/api/files?id=")) {
              const fileParam = decodeURIComponent(fetchUrl.split("id=")[1].split("&")[0]);
              altUrl = `/uploads/documents/${fileParam}`;
            } else if (fetchUrl.startsWith("/uploads/documents/")) {
              const fileParam = fetchUrl.replace("/uploads/documents/", "").split("?")[0];
              altUrl = `/api/files?id=${encodeURIComponent(fileParam)}`;
            }

            if (altUrl) {
              try {
                const altSep = altUrl.includes("?") ? "&" : "?";
                const fullAltUrl = `${altUrl}${altSep}_t=${Date.now()}`;
                const altRes = await fetch(fullAltUrl, { cache: "no-store" });
                if (altRes.ok) {
                  const altBuf = await altRes.arrayBuffer();
                  if (altBuf && altBuf.byteLength > 0) {
                    buffer = altBuf;
                  }
                }
              } catch (e2: any) {
                console.warn("Attempt 2 alternate fetch failed:", e2?.message || e2);
              }
            }
          }

          if (!buffer || buffer.byteLength === 0) {
            throw new Error("Unable to retrieve document content (0 bytes received). Please use 'Open in New Tab' or 'Download' to view.");
          }

          pdfData = new Uint8Array(buffer);
        }

        if (cancel) return;

        loadingTask = pdfjsLib.getDocument({
          data: pdfData,
          cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/cmaps/",
          cMapPacked: true,
        });

        const doc = await loadingTask.promise;
        if (!cancel) {
          let fit = 1.15;
          try {
            const firstPage = await doc.getPage(1);
            const unscaled = firstPage.getViewport({ scale: 1.0 });
            fit = calculateFitScale(unscaled.width);
          } catch {
            fit = calculateFitScale(595);
          }
          setPdfDoc(doc);
          setScale(fit);
          setInitialScale(fit);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (!cancel) {
          console.error("PDF loading error:", err);
          setLoadError(err?.message || "Failed to load PDF file.");
          setIsLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      cancel = true;
      if (loadingTask) {
        try {
          loadingTask.destroy();
        } catch {}
      }
    };
  }, [isOpen, fileUrl]);

  // Handle mobile orientation changes and window resizing
  useEffect(() => {
    if (!isOpen || !pdfDoc) return;
    const handleResize = () => {
      if (Math.abs(scale - initialScale) < 0.02) {
        pdfDoc.getPage(1).then((page) => {
          const unscaled = page.getViewport({ scale: 1.0 });
          const newFit = calculateFitScale(unscaled.width);
          setScale(newFit);
          setInitialScale(newFit);
        }).catch(() => {});
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, pdfDoc, scale, initialScale]);

  // Handle ESC key and lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/80 backdrop-blur-xs transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-viewer-title"
    >
      <div
        className="relative w-full max-w-5xl h-[94vh] sm:h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#2F5187] text-white px-4 sm:px-6 py-3 border-b-2 border-[#E87737] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#E87737]">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3
                id="pdf-viewer-title"
                className="font-display font-bold text-sm sm:text-base text-white truncate"
              >
                {title || "Document Preview"}
              </h3>
              {subtitle && (
                <p className="text-[11px] text-slate-300 truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Action buttons in header */}
          <div className="flex items-center gap-2 shrink-0">
            {directUrl && (
              <a
                href={directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors shadow-xs"
                title="Open raw PDF in a new browser tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open in Tab</span>
              </a>
            )}

            {onDownload && (
              <button
                type="button"
                onClick={onDownload}
                disabled={isDownloading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer disabled:opacity-70"
                title="Download this document to your device"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span className="hidden sm:inline">Saving...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close document viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Secondary Toolbar: Zoom & Page Info */}
        {pdfDoc && !isLoading && !loadError && (
          <div className="bg-slate-100 border-b border-slate-200 px-3 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-3 text-xs text-slate-700 shrink-0 select-none">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-600 text-[11px] sm:text-xs">
                {pdfDoc.numPages} {pdfDoc.numPages === 1 ? "Page" : "Pages"}
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setScale((s) => Math.max(0.4, +(s - 0.15).toFixed(2)))}
                disabled={scale <= 0.4}
                className="p-1.5 rounded hover:bg-slate-200 text-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <span className="font-mono text-xs font-bold text-slate-600 px-1 min-w-[44px] text-center">
                {Math.abs(scale - initialScale) < 0.02 ? "Fit" : `${Math.round(scale * 100)}%`}
              </span>

              <button
                type="button"
                onClick={() => setScale((s) => Math.min(2.5, +(s + 0.15).toFixed(2)))}
                disabled={scale >= 2.5}
                className="p-1.5 rounded hover:bg-slate-200 text-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setScale(initialScale)}
                className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition-colors ml-1 cursor-pointer"
                title="Fit to Screen"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded hover:bg-slate-200 text-slate-700 transition-colors ml-2 cursor-pointer font-medium"
                title="Print Document"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>
        )}

        {/* PDF Viewer Canvas Body */}
        <div className="flex-1 bg-slate-200/80 relative overflow-y-auto overflow-x-auto p-2 sm:p-6 flex flex-col">
          {isLoading && (
            <div className="m-auto flex flex-col items-center justify-center gap-3 py-16">
              <Loader2 className="w-10 h-10 animate-spin text-[#2F5187]" />
              <p className="text-sm font-bold text-slate-700">
                Rendering document preview...
              </p>
              <p className="text-xs text-slate-500">
                Loading official PDF pages directly into high-definition viewer.
              </p>
            </div>
          )}

          {loadError && (
            <div className="m-auto text-center p-8 space-y-4 max-w-md bg-white rounded-xl shadow-sm border border-slate-200">
              <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
              <h4 className="font-bold text-slate-800 text-base">
                Could not render document preview
              </h4>
              <p className="text-xs text-slate-600">
                {loadError || "The document could not be previewed directly in the browser canvas."}
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                {directUrl && (
                  <a
                    href={directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#2F5187] text-white text-xs font-bold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in New Tab</span>
                  </a>
                )}
                {onDownload && (
                  <button
                    type="button"
                    onClick={onDownload}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#E87737] text-white text-xs font-bold uppercase cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {pdfDoc && !isLoading && !loadError && (
            <div className="w-full flex flex-col items-center">
              {Array.from({ length: pdfDoc.numPages }, (_, i) => (
                <PdfPageItem
                  key={`page-${i + 1}`}
                  pdf={pdfDoc}
                  pageNumber={i + 1}
                  scale={scale}
                  isFitMode={scale <= initialScale + 0.02}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="bg-white border-t border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-600 shrink-0">
          <span className="text-[11px] font-medium text-slate-500 truncate">
            Official Compliance Dossier · Lotus Global School, Vatar, Vapi
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1 rounded border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
