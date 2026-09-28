import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Compass,
  Maximize2,
  Minimize2,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Info,
  Navigation,
  ArrowRight,
  Share2,
  Check,
  Building2,
  Laptop,
  FlaskConical,
  BookOpen,
  Trophy,
  ChevronRight,
  Sparkles,
  Camera,
  X,
  HelpCircle,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface Hotspot {
  id: string;
  targetRoom: string;
  title: string;
  directionLabel?: string;
  yaw: number; // degrees horizontal relative to center (-180 to 180)
  pitch: number; // degrees vertical (-90 to 90)
}

interface PointOfInterest {
  id: string;
  title: string;
  description: string;
  badge: string;
  yaw: number;
  pitch: number;
}

interface TourLocation {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  image: string;
  initialYaw: number;
  initialPitch: number;
  icon: React.ElementType;
  hotspots: Hotspot[];
  pois: PointOfInterest[];
}

const TOUR_LOCATIONS: Record<string, TourLocation> = {
  reception: {
    id: "reception",
    name: "Main Reception & Welcome Atrium",
    subtitle: "Central Entrance, Institutional Honors & Administration",
    category: "Administrative & Welcome",
    image: "/assets/virtual-tour/reception.jpg",
    initialYaw: 0,
    initialPitch: 0,
    icon: Building2,
    hotspots: [
      {
        id: "to-computer",
        targetRoom: "computer-lab",
        title: "Step into Computer & AI Lab",
        directionLabel: "Right Wing",
        yaw: 28,
        pitch: -4,
      },
      {
        id: "to-science",
        targetRoom: "science-lab",
        title: "Enter Composite Science Lab",
        directionLabel: "STEM Corridor",
        yaw: 12,
        pitch: -6,
      },
      {
        id: "to-library",
        targetRoom: "library",
        title: "Go to Central Library",
        directionLabel: "Left Mezzanine",
        yaw: -24,
        pitch: -2,
      },
      {
        id: "to-sports",
        targetRoom: "sports-arena",
        title: "Head to Sports Complex & Turf",
        directionLabel: "Outdoor Campus",
        yaw: -40,
        pitch: 4,
      },
    ],
    pois: [
      {
        id: "reception-desk",
        title: "Parent Information & Admission Desk",
        description: "Official reception counter for admissions inquiries, campus tour appointments, and administrative guidance.",
        badge: "Visitor Desk",
        yaw: 0,
        pitch: -14,
      },
      {
        id: "trophy-case",
        title: "House Points & Student Honors Wall",
        description: "Showcasing student academic accolades, inter-school debate trophies, and annual athletic championship shields.",
        badge: "Accreditations",
        yaw: 36,
        pitch: -2,
      },
    ],
  },
  "computer-lab": {
    id: "computer-lab",
    name: "Next-Gen Computer & Robotics Lab",
    subtitle: "High-Speed Workstations, Coding & Digital Literacy",
    category: "STEM & Computing",
    image: "/assets/virtual-tour/computer-lab.jpg",
    initialYaw: 0,
    initialPitch: -2,
    icon: Laptop,
    hotspots: [
      {
        id: "to-reception",
        targetRoom: "reception",
        title: "Return to Welcome Atrium",
        directionLabel: "Main Hallway",
        yaw: -32,
        pitch: -4,
      },
      {
        id: "to-science",
        targetRoom: "science-lab",
        title: "Enter Science & Discovery Lab",
        directionLabel: "STEM Corridor",
        yaw: 32,
        pitch: -3,
      },
    ],
    pois: [
      {
        id: "ai-workstations",
        title: "Dual-Screen Coding Terminals",
        description: "Individual student terminals configured with Scratch, Python, HTML5, and child-safe high-speed firewall internet.",
        badge: "ICT Infrastructure",
        yaw: 0,
        pitch: -15,
      },
      {
        id: "smart-board",
        title: "Interactive Smart Digital Board",
        description: "Ultra-HD digital touch projection enabling interactive coding demonstrations and robotics logic simulations.",
        badge: "Digital Classroom",
        yaw: -36,
        pitch: 5,
      },
      {
        id: "robotics-bench",
        title: "Robotics & Micro-Controller Workbench",
        description: "Hands-on robotics hardware station with sensor integration kits and competitive robotics assembly tools.",
        badge: "Innovation Hub",
        yaw: 32,
        pitch: -12,
      },
    ],
  },
  "science-lab": {
    id: "science-lab",
    name: "Composite Science & STEM Lab",
    subtitle: "Hands-on Physics, Chemistry & Biology Workstations",
    category: "Laboratories",
    image: "/assets/virtual-tour/science-lab.jpg",
    initialYaw: 0,
    initialPitch: -2,
    icon: FlaskConical,
    hotspots: [
      {
        id: "to-reception",
        targetRoom: "reception",
        title: "Return to Welcome Atrium",
        directionLabel: "Main Lobby",
        yaw: -32,
        pitch: -4,
      },
      {
        id: "to-library",
        targetRoom: "library",
        title: "Walk to Central Library",
        directionLabel: "Reading Wing",
        yaw: 30,
        pitch: -3,
      },
    ],
    pois: [
      {
        id: "periodic-table",
        title: "CBSE Aligned Science Framework",
        description: "Official NCERT-compliant laboratory stations equipped with safety eyewash, gas cut-offs, and first-aid response.",
        badge: "Safety Compliant",
        yaw: -32,
        pitch: 10,
      },
      {
        id: "microscopes",
        title: "Precision Compound Microscopes",
        description: "High-grade optical microscopes providing students with hands-on cellular and botanical specimen analysis.",
        badge: "Empirical Learning",
        yaw: 0,
        pitch: -15,
      },
      {
        id: "lab-reagents",
        title: "Safety Storage & Chemical Reagents",
        description: "Secured lockable cabinetry for chemical reagents with complete safety handling protocols.",
        badge: "Glassware & Reagents",
        yaw: 34,
        pitch: 4,
      },
    ],
  },
  library: {
    id: "library",
    name: "Central Knowledge Hub & Library",
    subtitle: "Extensive Reference, Fiction & Quiet Study Zones",
    category: "Academic Resources",
    image: "/assets/virtual-tour/library.jpg",
    initialYaw: 0,
    initialPitch: -2,
    icon: BookOpen,
    hotspots: [
      {
        id: "to-reception",
        targetRoom: "reception",
        title: "Return to Welcome Atrium",
        directionLabel: "Main Lobby",
        yaw: -18,
        pitch: 2,
      },
      {
        id: "to-sports",
        targetRoom: "sports-arena",
        title: "Visit Sports Complex & Turf",
        directionLabel: "Outdoor Campus",
        yaw: 32,
        pitch: -3,
      },
    ],
    pois: [
      {
        id: "study-tables",
        title: "Collaborative Study Desks",
        description: "Spacious wooden reading tables equipped with reading lamps and charging docks for digital research.",
        badge: "Study Arena",
        yaw: 0,
        pitch: -14,
      },
      {
        id: "bookshelves",
        title: "Two-Story Reference Library",
        description: "Thousands of curriculum-mapped volumes, encyclopedias, international fiction, and periodicals.",
        badge: "Curated Books",
        yaw: -35,
        pitch: -2,
      },
      {
        id: "kiosks",
        title: "Digital Catalog Search Kiosks",
        description: "Touchscreen terminals allowing students to search book availability, issue dates, and digital research journals.",
        badge: "E-Library",
        yaw: 33,
        pitch: -10,
      },
    ],
  },
  "sports-arena": {
    id: "sports-arena",
    name: "Sports Complex & Athletic Turf",
    subtitle: "Full-Size Football Pitch, Running Track & Basketball Arena",
    category: "Physical Education",
    image: "/assets/virtual-tour/sports-arena.jpg",
    initialYaw: 0,
    initialPitch: -1,
    icon: Trophy,
    hotspots: [
      {
        id: "to-reception",
        targetRoom: "reception",
        title: "Return to School Building",
        directionLabel: "Academic Wing",
        yaw: -30,
        pitch: -3,
      },
      {
        id: "to-library",
        targetRoom: "library",
        title: "Visit Central Library Wing",
        directionLabel: "Knowledge Center",
        yaw: 28,
        pitch: -3,
      },
    ],
    pois: [
      {
        id: "football-turf",
        title: "FIFA-Standard Football Turf",
        description: "All-weather synthetic grass turf engineered with shock-absorbing underlay for safe student athletic activities.",
        badge: "Sports Excellence",
        yaw: 0,
        pitch: -10,
      },
      {
        id: "spectator-stands",
        title: "Covered Spectator Pavilion",
        description: "Modern architectural grandstand seating for parents and spectators during annual sports meets.",
        badge: "Grandstand",
        yaw: -32,
        pitch: 2,
      },
      {
        id: "multisport-court",
        title: "All-Weather Basketball Courts",
        description: "High-traction cushioned acrylic hardcourts for basketball, tennis, and volleyball training.",
        badge: "Hardcourts",
        yaw: 32,
        pitch: 0,
      },
    ],
  },
};

interface VirtualTourDemoPageProps {
  onNavigate: (page: string) => void;
}

export const VirtualTourDemoPage: React.FC<VirtualTourDemoPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [currentRoomId, setCurrentRoomId] = useState<string>("reception");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);

  // Screen positions for projected 3D hotspots & POIs
  const [projectedHotspots, setProjectedHotspots] = useState<
    Array<Hotspot & { screenX: number; screenY: number; visible: boolean }>
  >([]);
  const [projectedPois, setProjectedPois] = useState<
    Array<PointOfInterest & { screenX: number; screenY: number; visible: boolean }>
  >([]);

  // Three.js mutable state refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereMeshRef = useRef<THREE.Mesh | null>(null);

  // Rotation angles & FOV (in degrees)
  const lonRef = useRef<number>(0);
  const latRef = useRef<number>(0);
  // Default FOV: 52 deg (natural human eye perspective - no fish-eye edge distortion)
  const targetFovRef = useRef<number>(52);

  const isUserInteractingRef = useRef<boolean>(false);
  const onPointerDownPointerXRef = useRef<number>(0);
  const onPointerDownPointerYRef = useRef<number>(0);
  const onPointerDownLonRef = useRef<number>(0);
  const onPointerDownLatRef = useRef<number>(0);

  const currentRoom = TOUR_LOCATIONS[currentRoomId] || TOUR_LOCATIONS.reception;

  // Initialize Three.js scene once
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera with calibrated Street View optics (52 deg FOV eliminates wide-angle distortion)
    const camera = new THREE.PerspectiveCamera(52, width / height, 1, 1500);
    const targetVector = new THREE.Vector3(0, 0, 0);
    cameraRef.current = camera;
    targetFovRef.current = 52;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    // 4. Complete 360° Inverted Photosphere (100% full-screen coverage, ZERO black void)
    const geometry = new THREE.SphereGeometry(500, 64, 48);
    geometry.scale(-1, 1, 1);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(currentRoom.image);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereMeshRef.current = sphere;

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto rotation when idle
      if (autoRotate && !isUserInteractingRef.current) {
        lonRef.current += 0.07;
      }

      // Constrain vertical pitch to [-42 deg, +42 deg] (Google Street View standard)
      // Clamping prevents camera from reaching zenith/nadir poles, eliminating polar pinch!
      latRef.current = Math.max(-42, Math.min(42, latRef.current));

      // Calculate direction vector with +180 deg offset so initial lon = 0 faces the center of the photo
      const phi = THREE.MathUtils.degToRad(90 - latRef.current);
      const theta = THREE.MathUtils.degToRad(lonRef.current + 180);

      targetVector.x = 500 * Math.sin(phi) * Math.cos(theta);
      targetVector.y = 500 * Math.cos(phi);
      targetVector.z = 500 * Math.sin(phi) * Math.sin(theta);
      camera.lookAt(targetVector);

      // Smooth zoom interpolation (strictly clamped between 35° and 60° to prevent fisheye)
      camera.fov += (targetFovRef.current - camera.fov) * 0.12;
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);

      // Project 3D Hotspot & POI positions to 2D screen coordinates
      const rect = container.getBoundingClientRect();
      const cWidth = rect.width;
      const cHeight = rect.height;
      const camDir = targetVector.clone().normalize();

      // Update Hotspots
      const updatedHotspots = (TOUR_LOCATIONS[currentRoomId]?.hotspots || []).map((h) => {
        const hPhi = THREE.MathUtils.degToRad(90 - h.pitch);
        const hTheta = THREE.MathUtils.degToRad(h.yaw + 180);
        const hVec = new THREE.Vector3(
          500 * Math.sin(hPhi) * Math.cos(hTheta),
          500 * Math.cos(hPhi),
          500 * Math.sin(hPhi) * Math.sin(hTheta)
        );

        const toHotspot = hVec.clone().normalize();
        const dot = toHotspot.dot(camDir);

        hVec.project(camera);
        const screenX = (hVec.x * 0.5 + 0.5) * cWidth;
        const screenY = (-(hVec.y * 0.5) + 0.5) * cHeight;

        return {
          ...h,
          screenX,
          screenY,
          visible: dot > 0.45 && screenX >= 20 && screenX <= cWidth - 20 && screenY >= 40 && screenY <= cHeight - 60,
        };
      });
      setProjectedHotspots(updatedHotspots);

      // Update POIs
      const updatedPois = (TOUR_LOCATIONS[currentRoomId]?.pois || []).map((poi) => {
        const pPhi = THREE.MathUtils.degToRad(90 - poi.pitch);
        const pTheta = THREE.MathUtils.degToRad(poi.yaw + 180);
        const pVec = new THREE.Vector3(
          500 * Math.sin(pPhi) * Math.cos(pTheta),
          500 * Math.cos(pPhi),
          500 * Math.sin(pPhi) * Math.sin(pTheta)
        );

        const toPoi = pVec.clone().normalize();
        const dot = toPoi.dot(camDir);

        pVec.project(camera);
        const screenX = (pVec.x * 0.5 + 0.5) * cWidth;
        const screenY = (-(pVec.y * 0.5) + 0.5) * cHeight;

        return {
          ...poi,
          screenX,
          screenY,
          visible: dot > 0.45 && screenX >= 20 && screenX <= cWidth - 20 && screenY >= 40 && screenY <= cHeight - 60,
        };
      });
      setProjectedPois(updatedPois);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, []);

  // When room changes, load new photosphere texture with smooth cinematic transition
  const switchRoom = (targetRoomId: string) => {
    if (targetRoomId === currentRoomId || isTransitioning) return;
    const nextRoom = TOUR_LOCATIONS[targetRoomId];
    if (!nextRoom || !sphereMeshRef.current) return;

    setIsTransitioning(true);
    setSelectedPoi(null);

    // Zoom-in walk warp effect
    targetFovRef.current = 36;

    setTimeout(() => {
      const loader = new THREE.TextureLoader();
      loader.load(nextRoom.image, (newTexture) => {
        newTexture.colorSpace = THREE.SRGBColorSpace;
        newTexture.minFilter = THREE.LinearFilter;
        newTexture.generateMipmaps = true;

        if (sphereMeshRef.current) {
          const mat = sphereMeshRef.current.material as THREE.MeshBasicMaterial;
          if (mat.map) mat.map.dispose();
          mat.map = newTexture;
          mat.needsUpdate = true;
        }

        lonRef.current = nextRoom.initialYaw;
        latRef.current = nextRoom.initialPitch;
        setCurrentRoomId(targetRoomId);

        // Zoom back out to natural focal length
        targetFovRef.current = 52;

        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      });
    }, 300);
  };

  // Mouse & Touch interaction handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isUserInteractingRef.current = true;
    onPointerDownPointerXRef.current = e.clientX;
    onPointerDownPointerYRef.current = e.clientY;
    onPointerDownLonRef.current = lonRef.current;
    onPointerDownLatRef.current = latRef.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isUserInteractingRef.current) return;
    const factor = 0.14 * (targetFovRef.current / 52);
    lonRef.current = (onPointerDownPointerXRef.current - e.clientX) * factor + onPointerDownLonRef.current;
    latRef.current = (e.clientY - onPointerDownPointerYRef.current) * factor + onPointerDownLatRef.current;
  };

  const handlePointerUp = () => {
    isUserInteractingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    targetFovRef.current = Math.max(35, Math.min(60, targetFovRef.current + e.deltaY * 0.04));
  };

  // Keyboard navigation (Arrow keys + WASD)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 3.5;
      if (["ArrowLeft", "a", "A"].includes(e.key)) {
        lonRef.current -= step;
      } else if (["ArrowRight", "d", "D"].includes(e.key)) {
        lonRef.current += step;
      } else if (["ArrowUp", "w", "W"].includes(e.key)) {
        latRef.current += step;
      } else if (["ArrowDown", "s", "S"].includes(e.key)) {
        latRef.current -= step;
      } else if (["+", "="].includes(e.key)) {
        targetFovRef.current = Math.max(35, targetFovRef.current - 4);
      } else if (["-", "_"].includes(e.key)) {
        targetFovRef.current = Math.min(60, targetFovRef.current + 4);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 text-white overflow-hidden select-none font-sans flex flex-col">
      {/* TOP HEADER: Client Presentation Badge & Tools */}
      <header className="absolute top-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#2F5187] to-[#1E375F] border border-white/20 flex items-center justify-center shadow-lg shadow-[#2F5187]/30">
            <Compass className="w-5 h-5 text-[#E87737] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-[#E87737] text-white tracking-wider uppercase">
                Prototype Demonstration
              </span>
              <span className="text-[10px] text-slate-300 hidden md:inline-block">
                · 360° Interactive Campus Tour
              </span>
            </div>
            <h1 className="text-sm sm:text-lg font-bold font-display text-white tracking-tight flex items-center gap-1.5 mt-0.5">
              <span>{currentRoom.name}</span>
            </h1>
          </div>
        </div>

        {/* Top Control Actions */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setShowGuideModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold backdrop-blur-md transition-all shadow-sm"
            title="How this tour works and how to shoot with phone"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Phone Shoot Guide</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2F5187] hover:bg-[#1E375F] text-white text-xs font-semibold border border-white/20 shadow-sm transition-all"
            title="Copy Secret Demo Link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedLink ? "Link Copied!" : "Share Demo"}</span>
          </button>

          <button
            onClick={() => onNavigate("home")}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold border border-white/15 backdrop-blur-md transition-all text-slate-200"
            title="Exit to School Website"
          >
            Exit Demo
          </button>
        </div>
      </header>

      {/* 3D INTERACTIVE VIEWPORT CONTAINER (100% Filled, Zero Black Area) */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing touch-none overflow-hidden"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Warp Transition Overlay */}
        <div
          className={`absolute inset-0 bg-slate-950 pointer-events-none transition-opacity duration-300 ${
            isTransitioning ? "opacity-90 backdrop-blur-sm" : "opacity-0"
          }`}
        />

        {/* FLOATING 3D HOTSPOT ARROWS (Projected from 3D space) */}
        {!isTransitioning &&
          projectedHotspots.map((hotspot) => {
            if (!hotspot.visible) return null;
            return (
              <div
                key={hotspot.id}
                style={{
                  transform: `translate3d(${hotspot.screenX}px, ${hotspot.screenY}px, 0) translate(-50%, -50%)`,
                }}
                className="absolute z-20 pointer-events-auto transition-transform duration-75 ease-out"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    switchRoom(hotspot.targetRoom);
                  }}
                  className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
                >
                  {/* Tooltip on hover */}
                  <div className="mb-2 px-3 py-1.5 rounded-lg bg-slate-900/95 text-white border border-white/25 shadow-xl backdrop-blur-md text-xs font-bold whitespace-nowrap opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all flex items-center gap-1.5">
                    <Navigation className="w-3 h-3 text-[#E87737] -rotate-45" />
                    <span>{hotspot.title}</span>
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>

                  {/* Pulsating 3D Arrow Target */}
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-14 h-14 rounded-full bg-[#E87737]/30 animate-ping pointer-events-none" />
                    <span className="absolute w-11 h-11 rounded-full bg-[#E87737]/45 animate-pulse pointer-events-none" />
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#E87737] to-amber-500 text-white shadow-xl shadow-[#E87737]/50 flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-5 h-5 -rotate-45 text-white font-black stroke-[3]" />
                    </div>
                  </div>
                </button>
              </div>
            );
          })}

        {/* FLOATING POINT-OF-INTEREST BADGES (Projected from 3D space) */}
        {!isTransitioning &&
          projectedPois.map((poi) => {
            if (!poi.visible) return null;
            return (
              <div
                key={poi.id}
                style={{
                  transform: `translate3d(${poi.screenX}px, ${poi.screenY}px, 0) translate(-50%, -50%)`,
                }}
                className="absolute z-20 pointer-events-auto transition-transform duration-75 ease-out"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPoi(poi);
                  }}
                  className="group relative flex items-center justify-center cursor-pointer focus:outline-none"
                  title={poi.title}
                >
                  <span className="absolute w-10 h-10 rounded-full bg-[#2F5187]/40 animate-ping pointer-events-none" />
                  <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#2F5187] to-blue-600 text-white shadow-lg border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Info className="w-4 h-4 text-white" />
                  </div>
                </button>
              </div>
            );
          })}

        {/* Selected POI Modal Card */}
        {selectedPoi && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-20 right-4 sm:right-6 z-30 max-w-sm w-[90%] sm:w-80 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-white/20 p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-2.5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E87737] px-2 py-0.5 rounded bg-[#E87737]/15 border border-[#E87737]/30">
                  {selectedPoi.badge}
                </span>
                <h4 className="text-sm font-bold text-white mt-1.5">{selectedPoi.title}</h4>
              </div>
              <button
                onClick={() => setSelectedPoi(null)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{selectedPoi.description}</p>
          </div>
        )}
      </div>

      {/* FLOATING ON-SCREEN CAMERA & NAVIGATION TOOLS */}
      <div className="absolute right-4 bottom-28 z-20 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={() => {
            targetFovRef.current = Math.max(35, targetFovRef.current - 6);
          }}
          className="w-10 h-10 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/15 text-white flex items-center justify-center shadow-lg backdrop-blur-md transition-all active:scale-95"
          title="Zoom In (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            targetFovRef.current = Math.min(60, targetFovRef.current + 6);
          }}
          className="w-10 h-10 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/15 text-white flex items-center justify-center shadow-lg backdrop-blur-md transition-all active:scale-95"
          title="Zoom Out (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center shadow-lg backdrop-blur-md transition-all active:scale-95 ${
            autoRotate ? "bg-[#E87737] text-white" : "bg-slate-900/80 hover:bg-slate-800 text-slate-300"
          }`}
          title={autoRotate ? "Pause Auto-Rotation" : "Enable Auto-Rotation"}
        >
          <RotateCw className={`w-4 h-4 ${autoRotate ? "animate-spin" : ""}`} />
        </button>
        <button
          onClick={toggleFullscreen}
          className="w-10 h-10 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/15 text-white flex items-center justify-center shadow-lg backdrop-blur-md transition-all active:scale-95"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* FLOATING VIRTUAL D-PAD (Arrow buttons for touch and visual clarity) */}
      <div className="absolute left-4 bottom-28 z-20 pointer-events-auto hidden sm:flex flex-col items-center bg-slate-900/80 border border-white/15 p-1.5 rounded-2xl backdrop-blur-md shadow-lg">
        <button
          onClick={() => {
            latRef.current = Math.min(42, latRef.current + 5);
          }}
          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          title="Tilt Up"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              lonRef.current -= 6;
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title="Pan Left"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="w-2 h-2 rounded-full bg-[#E87737]" />
          <button
            onClick={() => {
              lonRef.current += 6;
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title="Pan Right"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => {
            latRef.current = Math.max(-42, latRef.current - 5);
          }}
          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          title="Tilt Down"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>

      {/* BOTTOM ROOM SWITCHER DRAWER */}
      <footer className="absolute bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-2">
          {/* Helper Instruction Tag */}
          <div className="text-[11px] font-medium text-slate-300 bg-slate-900/80 px-3.5 py-1 rounded-full border border-white/15 backdrop-blur-sm pointer-events-auto flex items-center gap-2 shadow-md">
            <span>🖱️ Drag to look around 360°</span>
            <span>·</span>
            <span>🎯 Click glowing arrows to enter rooms</span>
            <span>·</span>
            <span>⌨️ Left / Right Arrow keys</span>
          </div>

          {/* Quick Location Pills */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1 px-2 no-scrollbar pointer-events-auto">
            {Object.values(TOUR_LOCATIONS).map((loc) => {
              const active = loc.id === currentRoomId;
              const Icon = loc.icon;
              return (
                <button
                  key={loc.id}
                  onClick={() => switchRoom(loc.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                    active
                      ? "bg-[#E87737] text-white border-white/40 shadow-lg shadow-[#E87737]/30 scale-105"
                      : "bg-slate-900/85 hover:bg-slate-800/90 text-slate-300 border-white/15 backdrop-blur-md hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{loc.name.split(" & ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </footer>

      {/* EXPLANATORY CLIENT GUIDE MODAL */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 text-slate-200 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E87737]" />
                <h3 className="font-display font-bold text-lg text-white">
                  How This 3D Tour Works For Lotus Global School
                </h3>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <p>
                This prototype demonstrates how prospective parents and students can digitally walk
                through Lotus Global School's facilities before visiting in person.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#E87737]" />
                  Street-View Calibrated Optics:
                </h4>
                <p className="text-xs text-slate-300">
                  We use calibrated 52° human-eye optics with pitch limits (just like Google Street View) so that vertical walls, computers, and furniture look completely straight and true-to-life without barrel/fisheye stretching.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#E87737]" />
                  How to shoot real photos with your smartphone:
                </h4>
                <ol className="text-xs space-y-1.5 list-decimal list-inside text-slate-300">
                  <li>Stand in the center of the classroom, lab, or playground.</li>
                  <li>Hold the smartphone in Panorama mode or 360 mode at eye level.</li>
                  <li>Smoothly sweep across the room from left to right.</li>
                  <li>Upload the photo — our system automatically aligns the straight walls and interactive navigation arrows!</li>
                </ol>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-4 py-2 rounded-xl bg-[#E87737] hover:bg-[#d6692b] text-white text-xs font-bold transition-all"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
