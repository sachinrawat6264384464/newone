"use client";

import { useState, useEffect } from "react";
import defaultContent from "../../../data/content.json";
import HeroSection from "@/components/web/HeroSection";
import SectionDivider from "@/components/web/SectionDivider";
import SessionDetailsSection from "@/components/web/SessionDetailsSection";
import HostSection from "@/components/web/HostSection";
import FinalCtaSection from "@/components/web/FinalCtaSection";
import StickyBottomBar from "@/components/web/StickyBottomBar";
import RegistrationModal from "@/components/web/RegistrationModal";

export default function Home() {
  const [content, setContent] = useState(defaultContent);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setContent(data);
      })
      .catch((err) => console.error("Error loading content:", err));
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <main className="min-h-screen bg-background pb-28 text-foreground selection:bg-primary/30 selection:text-foreground">
      <HeroSection content={content} onOpenModal={handleOpenModal} />
      <SectionDivider />
      <SessionDetailsSection content={content} onOpenModal={handleOpenModal} />
      <SectionDivider />
      <HostSection content={content} />
      <SectionDivider />
      <FinalCtaSection content={content} onOpenModal={handleOpenModal} />
      {!isModalOpen && <StickyBottomBar content={content} onOpenModal={handleOpenModal} />}
      <RegistrationModal content={content} isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}
