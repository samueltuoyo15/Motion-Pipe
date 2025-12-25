"use client";

import React, { createContext, useContext } from 'react';
import { useChunk } from 'stunk/react';
import { languageChunk, Language } from '../lib/store';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    EN: {
        hero_title: "Your New AI Freelancer.",
        hero_subtitle: "Your New",
        hero_description: "Motion Pipe is an autonomous infrastructure that continuously generates broadcast-ready product commercials. We replace entire agencies with a single API call. Escrow secured.",
        nav_capabilities: "Capabilities",
        nav_workflow: "Workflow",
        nav_pricing: "Pricing",
        nav_login: "Login",
        nav_get_started: "Get Started",
        how_it_works: "How it Works",
        start_project: "Start Project",
        view_demo: "View Demo",
        core_capabilities: "Core Capabilities",
        capabilities_desc: "Automated motion design infrastructure.",
        enterprise_stack: "Enterprise Stack",
        footer_tagline: "The automated motion design infrastructure for high-velocity marketing teams. Escrow-secured, AI-generated, broadcast-ready.",
        // Dashboard
        dash_home: "Dashboard",
        dash_assets: "Assets",
        dash_templates: "Templates",
        dash_history: "History",
        dash_billing: "Billing",
        dash_support: "Support",
        dash_settings: "Settings",
        dash_tickets: "Tickets",
        // CTA
        cta_title: "Start Broadcasting.",
        cta_desc: "Join the agencies producing high-conversion ads without the studio costs.",
        cta_button: "Create Ad - ₦10,000",
        // Features
        feat_1_title: "AI Video Generation",
        feat_1_desc: "Google Veo 3 API creates stunning visual flows and animations.",
        feat_2_title: "Professional Voiceover",
        feat_2_desc: "ElevenLabs generates natural, broadcast-quality narration.",
        feat_3_title: "AI Sound Agent",
        feat_3_desc: "Curated licensed music and SFX, matched to mood.",
        feat_4_title: "Escrow Protection",
        feat_4_desc: "Funds only held. Released upon your approval.",
        feat_5_title: "Real-Time Updates",
        feat_5_desc: "WebSocket-powered live progress tracking.",
        feat_6_title: "Smart Asset Discovery",
        feat_6_desc: "Selenium agents find brand assets automatically.",
        // Tech
        tech_1: "Golang Backend",
        tech_2: "Google Veo 3",
        tech_3: "FFmpeg",
        tech_4: "Cloudinary",
        tech_5: "Paystack",
        tech_6: "Redis",
    },
    FR: {
        hero_title: "Votre Nouveau Freelance IA.",
        hero_subtitle: "Votre Nouveau",
        hero_description: "Motion Pipe est une infrastructure autonome qui génère en continu des publicités de produits prêtes pour la diffusion. Nous remplaçons des agences entières par un seul appel API. Sécurisé par séquestre.",
        nav_capabilities: "Capacités",
        nav_workflow: "Flux de travail",
        nav_pricing: "Tarification",
        nav_login: "Connexion",
        nav_get_started: "Commencer",
        how_it_works: "Comment ça marche",
        start_project: "Lancer le projet",
        view_demo: "Voir la démo",
        core_capabilities: "Capacités de base",
        capabilities_desc: "Infrastructure de conception de mouvement automatisée.",
        enterprise_stack: "Pile d'entreprise",
        footer_tagline: "L'infrastructure de conception de mouvement automatisée pour les équipes marketing à haute vélocité. Sécurisé par séquestre, généré par IA, prêt pour la diffusion.",
        dash_home: "Tableau de Bord",
        dash_assets: "Ressources",
        dash_templates: "Modèles",
        dash_history: "Historique",
        dash_billing: "Facturation",
        dash_support: "Support",
        dash_settings: "Paramètres",
        dash_tickets: "Tickets",
        // CTA
        cta_title: "Commencez la diffusion.",
        cta_desc: "Rejoignez les agences produisant des publicités à haute conversion sans les coûts de studio.",
        cta_button: "Créer une publicité - ₦10 000",
        // Features
        feat_1_title: "Génération de Vidéo IA",
        feat_1_desc: "L'API Google Veo 3 crée des flux visuels et des animations époustouflants.",
        feat_2_title: "Voix-off Professionnelle",
        feat_2_desc: "ElevenLabs génère une narration naturelle et de qualité diffusion.",
        feat_3_title: "Agent Sonore IA",
        feat_3_desc: "Musique sous licence et SFX sélectionnés, adaptés à l'ambiance.",
        feat_4_title: "Protection par Séquestre",
        feat_4_desc: "Les fonds sont conservés et libérés uniquement après votre approbation.",
        feat_5_title: "Mises à jour en Temps Réel",
        feat_5_desc: "Suivi en direct de la progression via WebSocket.",
        feat_6_title: "Découverte Intelligente des Ressources",
        feat_6_desc: "Des agents Selenium trouvent automatiquement les ressources de la marque.",
        // Tech
        tech_1: "Backend Golang",
        tech_2: "Google Veo 3",
        tech_3: "FFmpeg",
        tech_4: "Cloudinary",
        tech_5: "Paystack",
        tech_6: "Redis",
    },
    ES: {
        hero_title: "Tu Nuevo Freelancer de IA.",
        hero_subtitle: "Tu Nuevo",
        hero_description: "Motion Pipe es una infraestructura autónoma que genera continuamente comerciales de productos listos para su emisión. Reemplazamos agencias enteras con una sola llamada de API. Depósito en garantía asegurado.",
        nav_capabilities: "Capacidades",
        nav_workflow: "Flujo de trabajo",
        nav_pricing: "Precios",
        nav_login: "Acceso",
        nav_get_started: "Empezar",
        how_it_works: "Cómo funciona",
        start_project: "Iniciar Proyecto",
        view_demo: "Ver Demo",
        core_capabilities: "Capacidades Principales",
        capabilities_desc: "Infraestructura de diseño de movimiento automatizada.",
        enterprise_stack: "Pila Empresarial",
        footer_tagline: "La infraestructura de diseño de movimiento automatizada para equipos de marketing de alta velocidad. Depósito en garantía asegurado, generado por IA, listo para la emisión.",
        dash_home: "Panel",
        dash_assets: "Activos",
        dash_templates: "Plantillas",
        dash_history: "Historial",
        dash_billing: "Facturación",
        dash_support: "Soporte",
        dash_settings: "Configuración",
        dash_tickets: "Tickets",
        // CTA
        cta_title: "Empieza a Emitir.",
        cta_desc: "Únete a las agencias que producen anuncios de alta conversión sin los costos de estudio.",
        cta_button: "Crear Anuncio - ₦10,000",
        // Features
        feat_1_title: "Generación de Video IA",
        feat_1_desc: "La API de Google Veo 3 crea flujos visuales y animaciones impresionantes.",
        feat_2_title: "Locución Profesional",
        feat_2_desc: "ElevenLabs genera una narración natural y de calidad profesional.",
        feat_3_title: "Agente de Sonido IA",
        feat_3_desc: "Música licenciada y efectos de sonido seleccionados, adaptados al ambiente.",
        feat_4_title: "Protección de Depósito en Garantía",
        feat_4_desc: "Los fondos solo se retienen y se liberan tras tu aprobación.",
        feat_5_title: "Actualizaciones en Tiempo Real",
        feat_5_desc: "Seguimiento en vivo del progreso impulsado por WebSocket.",
        feat_6_title: "Descubrimiento Inteligente de Activos",
        feat_6_desc: "Agentes de Selenium encuentran activos de marca automáticamente.",
        // Tech
        tech_1: "Backend Golang",
        tech_2: "Google Veo 3",
        tech_3: "FFmpeg",
        tech_4: "Cloudinary",
        tech_5: "Paystack",
        tech_6: "Redis",
    },
    DE: {
        hero_title: "Ihr neuer KI-Freelancer.",
        hero_subtitle: "Ihr neuer",
        hero_description: "Motion Pipe ist eine autonome Infrastruktur, die kontinuierlich sendefertige Produktwerbespots generiert. Wir ersetzen ganze Agenturen mit einem einzigen API-Aufruf. Treuhandgesichert.",
        nav_capabilities: "Funktionen",
        nav_workflow: "Arbeitsablauf",
        nav_pricing: "Preise",
        nav_login: "Login",
        nav_get_started: "Loslegen",
        how_it_works: "So funktioniert es",
        start_project: "Projekt starten",
        view_demo: "Demo ansehen",
        core_capabilities: "Kernfunktionen",
        capabilities_desc: "Automatisierte Motion-Design-Infrastruktur.",
        enterprise_stack: "Enterprise-Stack",
        footer_tagline: "Die automatisierte Motion-Design-Infrastruktur für hochfrequente Marketingteams. Treuhandgesichert, KI-generiert, sendefertig.",
        dash_home: "Dashboard",
        dash_assets: "Assets",
        dash_templates: "Vorlagen",
        dash_history: "Verlauf",
        dash_billing: "Abrechnung",
        dash_support: "Support",
        dash_settings: "Einstellungen",
        dash_tickets: "Tickets",
        // CTA
        cta_title: "Starten Sie die Übertragung.",
        cta_desc: "Schließen Sie sich den Agenturen an, die hochkonvertierende Anzeigen ohne Studiokosten produzieren.",
        cta_button: "Anzeige erstellen - ₦10.000",
        // Features
        feat_1_title: "KI-Videogenerierung",
        feat_1_desc: "Die Google Veo 3 API erstellt atemberaubende visuelle Abläufe und Animationen.",
        feat_2_title: "Professionelles Voiceover",
        feat_2_desc: "ElevenLabs generiert natürliche Erzählungen in Sendequalität.",
        feat_3_title: "KI-Sound-Agent",
        feat_3_desc: "Kuratierte lizenzierte Musik und SFX, passend zur Stimmung.",
        feat_4_title: "Treuhandschutz",
        feat_4_desc: "Mittel werden nur einbehalten und bei Ihrer Genehmigung freigegeben.",
        feat_5_title: "Echtzeit-Updates",
        feat_5_desc: "WebSocket-gestütztes Live-Fortschritts-Tracking.",
        feat_6_title: "Intelligente Asset-Suche",
        feat_6_desc: "Selenium-Agenten finden Marken-Assets automatisch.",
        // Tech
        tech_1: "Golang-Backend",
        tech_2: "Google Veo 3",
        tech_3: "FFmpeg",
        tech_4: "Cloudinary",
        tech_5: "Paystack",
        tech_6: "Redis",
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useChunk(languageChunk);

    const t = (key: string) => {
        return translations[language as Language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
