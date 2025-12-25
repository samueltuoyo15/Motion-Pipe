"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'EN' | 'FR' | 'ES' | 'DE';

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
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('EN');

    const t = (key: string) => {
        return translations[language][key] || key;
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
