import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function AITransparency() {
  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4 z-10 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-[#1b1b22] border border-soviet-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl"
      >
        <div className="w-14 h-14 rounded-full bg-soviet-gold/10 border border-soviet-gold/30 flex items-center justify-center text-2xl flex-shrink-0">
          🤖
        </div>

        <div className="flex-grow text-left">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-serif font-bold text-lg text-soviet-beige">
              Minh Bạch Sử Dụng Công Nghệ AI (AI Usage Transparency)
            </h3>
            <span className="bg-soviet-gold/15 text-soviet-gold text-[9px] font-bold px-2 py-0.5 rounded border border-soviet-gold/30 uppercase tracking-widest font-mono">
              Academic Integrity
            </span>
          </div>

          <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-3">
            Sản phẩm học tập này có sử dụng mô hình trí tuệ nhân tạo (AI) để hỗ trợ thiết kế giao diện tương tác, xây dựng các kịch bản lập trình trò chơi và định hình cấu trúc infographics.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Sinh viên đã kiểm tra và chỉnh sửa thủ công</span>
            <span className="flex items-center gap-1"><HeartHandshake className="w-3.5 h-3.5 text-soviet-gold" /> Đảm bảo đúng chuẩn chương trình Triết học Mác-Lênin</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
