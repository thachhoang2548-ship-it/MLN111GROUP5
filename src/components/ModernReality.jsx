import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Globe, Compass, Smartphone, TrendingUp, Users } from 'lucide-react';

const modernTopics = [
  {
    id: 'wealth',
    title: 'Phân Cực Giàu Nghèo Toàn Cầu',
    icon: <TrendingUp className="w-5 h-5 text-soviet-gold" />,
    stat: '1%',
    statSub: 'Dân số sở hữu 45% tài sản toàn cầu',
    desc: 'Tích lũy tư bản trong thế kỷ 21 diễn ra mạnh mẽ hơn bao giờ hết dưới hình thức tài sản số và cổ phần tập đoàn, bỏ xa sự tăng trưởng tiền lương của người lao động.'
  },
  {
    id: 'gig',
    title: 'Nền Kinh Tế Gig & Lao Động Số',
    icon: <Smartphone className="w-5 h-5 text-soviet-gold" />,
    stat: '50Tr+',
    statSub: 'Gig workers trên toàn thế giới',
    desc: 'Tài xế công nghệ, người giao hàng, freelancer làm việc dưới quyền kiểm soát của thuật toán tập đoàn nhưng không có hợp đồng lao động dài hạn, bảo hiểm y tế hay quyền lợi công đoàn.'
  },
  {
    id: 'global',
    title: 'Chủ Quyền Dân Tộc vs. Tư Bản Toàn Cầu',
    icon: <Globe className="w-5 h-5 text-soviet-gold" />,
    stat: '80%',
    statSub: 'Nguồn tài nguyên bị chi phối bởi vốn ngoại',
    desc: 'Trong thời đại toàn cầu hóa, mâu thuẫn giai cấp đan xen với mâu thuẫn dân tộc. Các nước đang phát triển đối mặt với nguy cơ thực dân mới về kinh tế, nơi dòng vốn siêu tập đoàn quốc tế có thể lấn át luật bảo hộ lao động nội địa.'
  },
  {
    id: 'burnout',
    title: 'Sự Tha Hóa Tinh Thần & Áp Lực Kiệt Quệ',
    icon: <Users className="w-5 h-5 text-soviet-gold" />,
    stat: '77%',
    statSub: 'Công nhân văn phòng từng kiệt sức (burnout)',
    desc: 'Mối quan hệ lao động hiện đại bị hòa tan vào các cuộc họp trực tuyến 24/7 và áp lực tăng ca tự nguyện, khiến người lao động cảm thấy tách rời (tha hóa) khỏi thành quả lao động của chính mình.'
  }
];

export default function ModernReality() {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 z-10 relative">
      {/* Title Header */}
      <div className="text-center mb-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-soviet-red/30 bg-soviet-red/10 text-soviet-gold text-xs uppercase tracking-widest font-semibold mb-4"
        >
          <Compass className="w-3.5 h-3.5" />
          Liên Hệ Thực Tế
        </motion.div>
        
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-soviet-beige mb-4">
          Giai Cấp & Dân Tộc Trong Xã Hội Hiện Đại
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          Mối quan hệ giữa đấu tranh giai cấp và độc lập tự chủ quốc gia đang vận hành dưới những hình thái mới, tinh vi hơn trong kỷ nguyên số và toàn cầu hóa.
        </p>
      </div>

      {/* Grid of Modern Issues */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {modernTopics.map((topic, idx) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-[#1b1b22] border border-soviet-border hover:border-soviet-gold/40 rounded-xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden group"
          >
            {/* Corner Light Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-soviet-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#14141a] flex items-center justify-center border border-soviet-border">
                  {topic.icon}
                </div>
                <h3 className="font-serif font-bold text-lg text-soviet-beige group-hover:text-soviet-gold transition-colors">
                  {topic.title}
                </h3>
              </div>

              {/* Glowing Statistic Accent */}
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-extrabold font-mono text-soviet-red tracking-tight leading-none">
                  {topic.stat}
                </span>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  {topic.statSub}
                </span>
              </div>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed border-t border-soviet-border/40 pt-4">
                {topic.desc}
              </p>
            </div>

            {/* Bottom Accent */}
            <div className="w-full h-1 bg-soviet-border/30 group-hover:bg-soviet-red transition-colors duration-300 rounded mt-6" />
          </motion.div>
        ))}
      </div>

      {/* Discussion prompt box */}
      <div className="mt-12 p-6 bg-[#14141a] border border-soviet-border rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-soviet-red/10 flex items-center justify-center flex-shrink-0 border border-soviet-red/30">
            <Sparkles className="w-6 h-6 text-soviet-gold" />
          </div>
          <div>
            <h4 className="font-bold text-white text-base">Câu hỏi thảo luận trên lớp:</h4>
            <p className="text-gray-400 text-xs md:text-sm mt-0.5">
              Làm thế nào để các quốc gia đang phát triển bảo vệ độc lập dân tộc, tự chủ kinh tế mà vẫn hội nhập sâu rộng vào chuỗi giá trị toàn cầu đầy tính bóc lột của tư bản?
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 bg-soviet-red/10 border border-soviet-red/30 text-soviet-red font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-lg">
          Chủ đề thảo luận
        </div>
      </div>
    </section>
  );
}
