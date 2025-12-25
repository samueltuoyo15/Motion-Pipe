# Motion Pipe

Motion Pipe is a professional platform designed for high-velocity marketing teams and agencies to generate broadcast-ready motion graphics and product advertisements. It provides the core infrastructure for automated motion design, replacing traditional production cycles with a streamlined, API-first workflow.

<img src="/public/preview.png" alt="Motion Pipe" width="100%">
<img src="/public/preview-2.png" alt="Motion Pipe" width="100%">

## Core Platform Capabilities

Motion Pipe functions as an autonomous infrastructure that orchestrates sophisticated media technologies to transform product briefs into high-fidelity video assets.

*   **Automated Video Synthesis:** Integration with Google Veo 3 for cinema-grade visual generation.
*   **Broadcast Narration:** ElevenLabs integration for high-fidelity, natural voiceovers.
*   **Financial Security:** Integrated Paystack Escrow system ensuring project funds are only released upon client approval.
*   **Autonomous Asset Discovery:** Selenium-based crawlers for automated brand asset and product shot retrieval.
-   **Live Orchestration:** WebSocket-driven infrastructure for real-time generation feedback and system monitoring.

## Technical Architecture

The platform is built on a high-performance monorepo architecture designed for concurrency and scalability.

### Monorepo Structure
*   `apps/web`: Next.js frontend with Electric Blue design system and global state management.
*   `apps/server`: Golang backend for high-throughput media orchestration.
*   `packages/ui`: Shared design tokens and component library.

### Infrastructure Stack
*   **Backend:** Golang (Concurrent Processing Engine).
*   **Frontend:** Next.js 15, React 19, Tailwind CSS.
*   **Media Processing:** FFmpeg, Google Veo 3 API.
*   **Data & Real-time:** Redis, Gorilla WebSockets.
*   **Storage:** Cloudflare R2 (Zero-Egress storage).

## Local Development

Ensure you have pnpm installed on your system.

```bash
# Install dependencies
pnpm install

# Start development environment
pnpm dev
```

## Security & Reliability

Motion Pipe is designed for enterprise-grade reliability, featuring escrow-secured transactions and decentralized rendering nodes to ensure sub-minute generation times for standard assets.
