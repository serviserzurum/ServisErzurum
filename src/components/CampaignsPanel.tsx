/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Calendar, Wrench, ChevronRight, Tag, Gift, Percent, Snowflake } from 'lucide-react';
import { motion } from 'motion/react';
import { useAdminStore } from '../utils/adminStore';

interface CampaignsPanelProps {
  onSelectCampaign: (title: string, notes: string) => void;
}

export default function CampaignsPanel({ onSelectCampaign }: CampaignsPanelProps) {
  const { campaigns } = useAdminStore();

  // Filter only active campaigns
  const activeCampaigns = campaigns.filter(c => c.isActive);

  if (activeCampaigns.length === 0) return null;

  return (
    <section id="kampanyalar" className="w-full py-20 bg-[#0C0C0E] border-b border-[#2D2D30] relative overflow-hidden">
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-brand-red text-[10px] font-mono font-bold tracking-[0.2em] uppercase block">
            MAHMUT USTA FIRSATLARI
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter text-white uppercase">
            AKTİF KAMPANYALARIMIZ
          </h2>
          <p className="text-zinc-400 font-serif italic text-sm sm:text-base leading-relaxed">
            Erzurum bütçe dostu sanayi fiyatlarını Mahmut Usta güvencesiyle ve özel dönemsel indirimlerle taçlandırıyoruz.
          </p>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeCampaigns.map((camp, index) => {
            // Pick corresponding decorative icons based on description or title
            let IconComponent = Tag;
            if (camp.title.toLowerCase().includes('kış') || camp.title.toLowerCase().includes('antifriz')) {
              IconComponent = Snowflake;
            } else if (camp.title.toLowerCase().includes('yağ') || camp.title.toLowerCase().includes('oil')) {
              IconComponent = Gift;
            } else if (camp.title.toLowerCase().includes('fren') || camp.title.toLowerCase().includes('%')) {
              IconComponent = Percent;
            }

            const formattedDate = camp.expiryDate.split('-').reverse().join('.');

            return (
              <motion.div
                key={camp.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-[#111113] border border-[#2D2D30] hover:border-brand-red/50 p-6 sm:p-8 rounded-none flex flex-col justify-between space-y-6 relative group transition-all duration-300 hover:shadow-[0_0_30px_rgba(225,29,72,0.12)]"
              >
                {/* Campaign Tag Badge */}
                <div className="absolute top-4 right-4 bg-brand-red/15 border border-brand-red/30 py-0.5 px-2 text-[9px] font-mono font-bold text-brand-red uppercase tracking-wider">
                  {camp.badge}
                </div>

                <div className="space-y-4">
                  {/* Icon and Title wrapper */}
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#0A0A0B] border border-[#2D2D30] text-brand-red rounded-none shrink-0 group-hover:bg-brand-red/10 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-black tracking-tight text-white uppercase">
                      {camp.title}
                    </h3>
                  </div>

                  {/* Campaign Description text */}
                  <p className="text-zinc-400 font-serif italic text-xs sm:text-sm leading-relaxed">
                    {camp.description}
                  </p>
                </div>

                {/* Footer section of campaign */}
                <div className="pt-4 border-t border-[#2D2D30]/85 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase">
                    <Calendar className="w-4 h-4 text-brand-red" />
                    <span>Son Geçerlilik:</span>
                    <span className="text-zinc-350">{formattedDate}</span>
                  </div>

                  <button
                    onClick={() => onSelectCampaign(camp.title, `${camp.title} kampanyasından faydalanmak istiyorum.`)}
                    className="py-2.5 px-4 bg-[#0A0A0B] border border-[#2D2D30] hover:border-brand-red group-hover:bg-brand-red/10 text-zinc-300 hover:text-white rounded-none text-[9px] uppercase font-bold tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Kampanyadan Yararlan
                    <ChevronRight className="w-3.5 h-3.5 text-brand-red" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
