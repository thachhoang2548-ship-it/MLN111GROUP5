import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Star, Sparkles } from 'lucide-react';

export default function FinalImpact() {
  return (
    <section className="w-full max-w-5xl mx-auto py-24 px-4 text-center z-10 relative flex flex-col items-center justify-center min-h-screen">
      
      {/* Decorative Hammer Star SVG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-8 relative w-16 h-16 flex items-center justify-center border border-soviet-red/30 rounded-full bg-[#1b1b22]"
      >
        <Star className="w-8 h-8 text-soviet-red fill-current animate-pulse" />
      </motion.div>

      {/* Main Closing Quote */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-soviet-beige via-soviet-gold to-soviet-beige leading-tight tracking-wide mb-6 max-w-4xl"
      >
        “Thay thế cho xã hội tư bản cũ... sẽ xuất hiện một liên hợp, trong đó sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người.”
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-xs md:text-sm uppercase tracking-widest text-soviet-red font-semibold mb-12"
      >
        — KARL MARX & FRIEDRICH ENGELS (TUYÊN NGÔN CỦA ĐẢNG CỘNG SẢN)
      </motion.p>

      {/* Big call to action discussion card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full max-w-2xl bg-[#1b1b22] border-2 border-dashed border-soviet-border p-8 rounded-2xl shadow-2xl mb-16 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-soviet-red/5 to-transparent pointer-events-none" />
        
        <HelpCircle className="w-12 h-12 text-soviet-gold mx-auto mb-4 animate-pulse" />
        
        <h3 className="text-xl md:text-2xl font-serif font-bold text-soviet-beige mb-3">
          Câu Hỏi Khép Lại Chuyên Đề:
        </h3>
        <p className="text-white text-base md:text-lg font-semibold leading-relaxed mb-4">
          “Liệu đấu tranh giai cấp có thực sự biến mất trong xã hội hiện đại, hay nó chỉ đang ẩn mình dưới những hình thức tinh vi hơn?”
        </p>
        <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-lg mx-auto">
          Mỗi sinh viên hãy tự suy ngẫm về vị trí của mình trong hệ thống sản xuất xã hội hiện đại để hiểu rõ giá trị lao động bản thân.
        </p>
      </motion.div>

      {/* Presentation Footer Credits */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        className="text-gray-500 text-xs border-t border-soviet-border pt-6 w-full max-w-md"
      >
        <p className="font-semibold uppercase tracking-wider text-soviet-beige mb-1">
          Nhóm sinh viên thực hiện - Đại Học FPT
        </p>
        <p>Môn học: Triết học Mác-Lênin | Giảng viên hướng dẫn</p>
      </motion.div>

    </section>
  );
}
