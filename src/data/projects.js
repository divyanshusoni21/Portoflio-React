import ytvidclipper from "../assets/yt-vidclipper.png";
import vmco1 from "../assets/vmco.png";
import vmco2 from "../assets/vmco-2.png";
import ytvidclipper2 from "../assets/yt-vidclipper-2.png";
import ytvidclipper3 from "../assets/yt-vidclipper-3.png";
import dailystokchunt1 from "../assets/dailystockhunt.png";
import dailystokchunt2 from "../assets/dailystockhunt-2.png";
import dailystokchunt3 from "../assets/dailystockhunt-3.png";
import inboxfortify1 from "../assets/inboxfortify.png";
import inboxfortify2 from "../assets/inboxfortify-2.png";
import inboxfortify3 from "../assets/inboxfortify-3.png";
import wabsp1 from "../assets/wa-bsp.png";
import wabsp2 from "../assets/wa-bsp-2.png";
import wabsp3 from "../assets/wa-bsp-3.png";
import wabsp4 from "../assets/wa-bsp-4.png";
import dailyposter1 from "../assets/dailyposterai.png";
import dailyposter2 from "../assets/dailyposterai-2.png";
import dailyposter3 from "../assets/dailyposterai-3.png";

/**
 * media items:
 *   { type: 'image', src, alt? }
 *   { type: 'video', src, poster?, alt? }  — direct mp4/webm URL or imported file
 *   { type: 'youtube', src: 'https://www.youtube.com/watch?v=...' | 'https://youtu.be/...' | embed id }
 *
 * Optional copy fields:
 *   hook  — one-line product pitch
 *   stack — tech chips shown under the body
 */
export const projects = [
  {
    name: "YT VidClipper",
    code: "https://github.com/divyanshusoni21/Yt-Vidclipper",
    demo: "https://yt-vidclipper-fe.vercel.app/",
    hook: "Turn a YouTube URL and timestamps into short clips.",
    description:
      "A Django + React app for cutting and exporting clips without downloading the whole video.",
    stack: ["Django", "React","FFMPEG", "Yt-Dlp", "Celery" ,"Docker", "CI/CD"],
    media: [
      { type: "image", src: ytvidclipper, alt: "YT VidClipper app screenshot" },
      { type: "image", src: ytvidclipper2, alt: "YT VidClipper app screenshot" },
      { type: "image", src: ytvidclipper3, alt: "YT VidClipper app screenshot" },
    ],
  },
  {
    name: "DailyStockHunt",
    demo: "https://dailystockhunt.com/",
    hook: "Live NSE & BSE market data, news, reports, and alerts — in one portal.",
    description:
      "I owned the backend pipelines: cron-based news scraping and IPO extraction with BeautifulSoup and Selenium, plus Firebase push and Google Analytics for real-time alerts.",
    stack: ["Django", "BeautifulSoup", "Selenium", "FCM", "Google Analytics","AI","Celery","MongoDB","Docker"],
    media: [
      { type: "image", src: dailystokchunt1, alt: "DailyStockHunt app screenshot" },
      { type: "image", src: dailystokchunt2, alt: "DailyStockHunt app screenshot" },
      { type: "image", src: dailystokchunt3, alt: "DailyStockHunt app screenshot" },
    ],
  },
  {
    name: "VMCO Gulf",
    demo: "https://vmcogulf.com/",
    hook: "B2B catalog where buyers browse products and request quotations.",
    description:
      "Designed and built the Django backend, an admin dashboard for users, products, and leads, and a landing page for quotation requests.",
    stack: ["Django","Celery","Docker"],
    media: [
      { type: "image", src: vmco1, alt: "VMCO Gulf website screenshot" },
      { type: "image", src: vmco2, alt: "VMCO Gulf admin dashboard screenshot" },
    ],
  },
  {
    name: "DailyPoster AI",
    demo: "https://dailyposter.ai/",
    hook: "AI LinkedIn posts generated from a brand’s website and LinkedIn URL.",
    description:
    "Uses Gemini to extract brand guidelines, audience, and visual rules, then writes posts that match them.",
    stack: ["Django", "AI","Django RQ","Rapidapi"],
    media: [
      { type: "image", src: dailyposter1, alt: "DailyPoster AI screenshot" },
      { type: "image", src: dailyposter2, alt: "DailyPoster AI screenshot" },
      { type: "image", src: dailyposter3, alt: "DailyPoster AI screenshot" },
    ],
  },
  
  {
    name: "WhatsApp BSP",
    hook: "WhatsApp Business platform for sending, scheduling, and tracking messages.",
    description:
      "Django backend with user management, message scheduling, and analytics.",
    stack: ["Django","Whatspp Cloud Api", "Celery","FCM"],
    media: [
      { type: "image", src: wabsp1, alt: "WhatsApp BSP screenshot" },
      { type: "image", src: wabsp2, alt: "WhatsApp BSP screenshot" },
      { type: "image", src: wabsp3, alt: "WhatsApp BSP screenshot" },
      { type: "image", src: wabsp4, alt: "WhatsApp BSP screenshot" },
    ],
  },
  {
    name: "InboxFortify",
    demo: "https://www.inboxfortify.com/",
    hook: "Sender-reputation boosting for email marketers.",
    description:
      "Built the Django + GraphQL backend, Stripe payments with webhook handling, and secure authentication.",
    stack: ["Django", "GraphQL", "Stripe"],
    media: [
      { type: "image", src: inboxfortify1, alt: "InboxFortify screenshot" },
      { type: "image", src: inboxfortify2, alt: "InboxFortify screenshot" },
      { type: "image", src: inboxfortify3, alt: "InboxFortify screenshot" },
    ],
  },

];
