import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, AlertCircle, ArrowRight, Layers, HelpCircle, Landmark } from 'lucide-react';
import { sound } from './SoundManager';

const erasData = [
  {
    id: 0,
    title: 'Xã hội Chiếm hữu Nô lệ',
    engTitle: 'Slave Society',
    period: 'Thời Cổ Đại',
    dominant: 'Chủ nô (Slave Owners)',
    oppressed: 'Nô lệ (Slaves)',
    communityType: 'Thị tộc & Bộ lạc (Clans & Tribes)',
    communityDesc: 'Xã hội tổ chức chủ yếu dựa trên liên hệ huyết thống. Nhiều thị tộc liên kết thành bộ lạc. Sự xuất hiện của tư hữu và giai cấp bắt đầu phá vỡ kết cấu thị tộc tự nhiên, hình thành nhà nước sơ khai cai trị các bộ lạc.',
    economy: 'Quyền sở hữu tuyệt đối của chủ nô đối với cả tư liệu sản xuất và chính bản thân người lao động (nô lệ). Nô lệ bị coi là "công cụ lao động biết nói".',
    conflict: 'Mâu thuẫn gay gắt giữa sự bóc lột tàn bạo, coi con người như súc vật của chủ nô và khát vọng giải phóng của nô lệ, dẫn đến các cuộc khởi nghĩa vũ trang làm sụp đổ các đế chế cổ đại.',
    symbol: '⛓️',
    stats: { inequality: 98, freedom: 2, conflict: 85 },
    color: '#8b4513',
    historicalExample: 'Khởi nghĩa của Spartacus chống lại Đế chế La Mã (năm 73–71 TCN).'
  },
  {
    id: 1,
    title: 'Chế độ Phong kiến',
    engTitle: 'Feudalism',
    period: 'Thời Trung Cổ',
    dominant: 'Địa chủ / Quý tộc (Landlords / Aristocracy)',
    oppressed: 'Nông nô / Nông dân (Serfs / Peasants)',
    communityType: 'Bộ tộc (Tribal Unions & Proto-nations)',
    communityDesc: 'Hình thành từ sự liên kết các bộ lạc trên cùng địa bàn cư trú. Bắt đầu hình thành ngôn ngữ chung, phong tục tập quán chung. Tuy nhiên, sự chia cắt cát cứ của các lãnh chúa phong kiến khiến liên kết kinh tế và ý thức dân tộc còn lỏng lẻo.',
    economy: 'Địa chủ sở hữu phần lớn ruộng đất. Nông dân được giao đất canh tác nhưng phải nộp tô thuế cực nặng và thực hiện lao dịch bắt buộc cho lãnh chúa.',
    conflict: 'Mâu thuẫn giữa địa chủ muốn bảo thủ phương thức bóc lột cũ với nông dân bị bóc lột cùng cực, kết hợp mâu thuẫn giữa quý tộc phong kiến kìm hãm giai cấp tư sản mới nổi.',
    symbol: '🏰',
    stats: { inequality: 85, freedom: 20, conflict: 70 },
    color: '#d2b48c',
    historicalExample: 'Phong trào khởi nghĩa nông dân nông thôn châu Âu và Khởi nghĩa Tây Sơn ở Việt Nam.'
  },
  {
    id: 2,
    title: 'Chủ nghĩa Tư bản',
    engTitle: 'Capitalism',
    period: 'Thời Hiện Đại',
    dominant: 'Tư sản (Bourgeoisie / Capitalists)',
    oppressed: 'Vô sản / Công nhân (Proletariat / Workers)',
    communityType: 'Dân tộc (Modern Nations)',
    communityDesc: 'Dân tộc hiện đại chính thức hình thành. Giai cấp tư sản cần xóa bỏ sự cát cứ phong kiến để thống nhất thị trường, lãnh thổ và luật pháp. Do đó, phong trào đấu tranh giai cấp của tư sản đồng thời thiết lập nên các quốc gia - dân tộc độc lập.',
    economy: 'Giai cấp tư sản nắm giữ tư liệu sản xuất (nhà máy, máy móc). Giai cấp vô sản không có tư liệu sản xuất, phải bán sức lao động làm thuê để nhận lương và bị chiếm đoạt giá trị thặng dư.',
    conflict: 'Mâu thuẫn cơ bản giữa tính chất xã hội hóa ngày càng cao của lực lượng sản xuất với chế độ chiếm hữu tư nhân tư bản chủ nghĩa về tư liệu sản xuất.',
    symbol: '🏭',
    stats: { inequality: 75, freedom: 60, conflict: 95 },
    color: '#c21807',
    historicalExample: 'Cách mạng Tháng Mười Nga (1917), các phong trào bãi công đòi quyền lợi lao động toàn cầu.'
  },
  {
    id: 3,
    title: 'Xã hội chủ nghĩa / Tương lai',
    engTitle: 'Socialism & Communism',
    period: 'Thời Đại Mới',
    dominant: 'Nhân dân lao động (Self-governed Collective)',
    oppressed: 'Không có (Classless society)',
    communityType: 'Dân tộc Xã hội chủ nghĩa (Socialist Nations)',
    communityDesc: 'Dân tộc phát triển trên cơ sở công hữu tư liệu sản xuất. Xóa bỏ áp bức giai cấp cũng đồng nghĩa xóa bỏ áp bức dân tộc. Các dân tộc xích lại gần nhau, hợp tác bình đẳng, tôn trọng chủ quyền quốc gia và xây dựng khối đoàn kết quốc tế vô sản.',
    economy: 'Xóa bỏ chế độ tư hữu, thiết lập chế độ công hữu về các tư liệu sản xuất chủ yếu. Sản xuất nhằm thỏa mãn nhu cầu xã hội chứ không vì lợi nhuận cá nhân.',
    conflict: 'Không còn mâu thuẫn giai cấp đối kháng. Mâu thuẫn chủ yếu là sự thích ứng giữa trình độ nhận thức xã hội với năng lực quản lý và phát triển khoa học công nghệ vì hạnh phúc con người.',
    symbol: '🌅',
    stats: { inequality: 8, freedom: 98, conflict: 4 },
    color: '#ffd700',
    historicalExample: 'Tầm nhìn xã hội nhân văn giải phóng toàn diện con người, nơi "sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người".'
  }
];

export default function InteractiveTimeline({ audioEnabled, onChangeEra }) {
  const [activeEraId, setActiveEraId] = useState(0);

  const handleEraSelect = (id) => {
    if (audioEnabled) {
      sound.playTick();
      if (id === 3) sound.playTrumpet();
      else sound.playClang();
    }
    setActiveEraId(id);
    if (onChangeEra) onChangeEra(id);
  };

  const activeEra = erasData[activeEraId];

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 z-10 relative">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-soviet-red/30 bg-soviet-red/10 text-soviet-gold text-xs uppercase tracking-widest font-semibold mb-4"
        >
          <Layers className="w-3.5 h-3.5" />
          Tiến Trình Lịch Sử
        </motion.div>
        
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-soviet-beige mb-4">
          Tiến Trình Phát Triển Giai Cấp & Cộng Đồng Dân Tộc
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          Theo Marx, sự thay đổi của lực lượng sản xuất dẫn tới sự thay đổi quan hệ sản xuất, từ đó thúc đẩy xã hội chuyển dịch và định hình nên các hình thức cộng đồng người từ Bộ lạc lên Dân tộc độc lập.
        </p>
      </div>

      {/* Horizontal timeline navigation */}
      <div className="relative mb-12 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#14141a] p-4 rounded-xl border border-soviet-border shadow-2xl">
        <div className="absolute left-4 right-4 top-1/2 h-[2px] bg-soviet-border hidden md:block z-0" />
        
        {erasData.map((era) => {
          const isActive = era.id === activeEraId;
          return (
            <button
              key={era.id}
              onClick={() => handleEraSelect(era.id)}
              className={`relative z-10 w-full md:w-auto px-6 py-4 rounded-lg flex items-center gap-3 transition-all duration-300 cursor-pointer ${
                isActive 
                  ? 'bg-soviet-red text-white border border-soviet-gold shadow-lg shadow-red-950/40 translate-y-[-2px]' 
                  : 'bg-[#1b1b22] text-gray-400 hover:text-soviet-beige border border-transparent hover:border-soviet-border'
              }`}
            >
              <span className="text-2xl">{era.symbol}</span>
              <div className="text-left">
                <div className="text-xs uppercase tracking-wider opacity-75">{era.period}</div>
                <div className="font-semibold text-sm whitespace-nowrap">{era.title}</div>
              </div>
              {isActive && (
                <motion.div 
                  layoutId="activeGlow" 
                  className="absolute inset-0 rounded-lg border-2 border-soviet-gold pointer-events-none"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Era Display Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEraId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Main Info Card */}
          <div className="lg:col-span-7 bg-[#1b1b22] border border-soviet-border rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Corner Decorative Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-soviet-red/10 to-transparent pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-soviet-gold font-bold font-sans">
                  Chi Tiết Hình Thái Kinh Tế & Xã Hội
                </span>
                <span className="text-2xl">{activeEra.symbol}</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-soviet-beige mb-1">
                {activeEra.title}
              </h3>
              <p className="text-xs text-soviet-red uppercase font-semibold tracking-wider mb-6">
                {activeEra.engTitle}
              </p>

              {/* Community and Nation Evolution Section */}
              <div className="mb-6 p-4 bg-[#14141a] rounded-lg border border-dashed border-soviet-gold/30">
                <div className="text-xs text-soviet-gold font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5" /> Hình thức cộng đồng người:
                </div>
                <div className="text-white font-bold text-sm mb-1.5">{activeEra.communityType}</div>
                <p className="text-gray-300 text-xs leading-relaxed">{activeEra.communityDesc}</p>
              </div>

              {/* Dominant and Oppressed Class Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-[#14141a] rounded-lg border-l-4 border-soviet-gold">
                  <div className="text-xs text-soviet-gold font-semibold uppercase tracking-wider mb-1">
                    Giai cấp Thống trị (Nắm TLSX)
                  </div>
                  <div className="text-white font-bold text-sm">{activeEra.dominant}</div>
                </div>

                <div className="p-4 bg-[#14141a] rounded-lg border-l-4 border-soviet-red">
                  <div className="text-xs text-soviet-red font-semibold uppercase tracking-wider mb-1">
                    Giai cấp Bị trị (Bị áp bức)
                  </div>
                  <div className="text-white font-bold text-sm">{activeEra.oppressed}</div>
                </div>
              </div>

              {/* Economic Relation */}
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">
                  Quan hệ sản xuất / Phương thức kinh tế:
                </h4>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed p-4 bg-[#14141a] rounded-lg border border-soviet-border">
                  {activeEra.economy}
                </p>
              </div>

              {/* Driving Historical Conflict */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">
                  Mâu thuẫn động lực (Đấu tranh giai cấp):
                </h4>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed p-4 bg-soviet-red/5 border border-soviet-red/20 rounded-lg">
                  {activeEra.conflict}
                </p>
              </div>
            </div>

            {/* Historical Example Callout */}
            <div className="mt-8 pt-4 border-t border-soviet-border flex items-start gap-2 text-xs text-gray-400">
              <AlertCircle className="w-4 h-4 text-soviet-gold flex-shrink-0 mt-0.5" />
              <span>
                <strong>Sự kiện lịch sử điển hình:</strong> {activeEra.historicalExample}
              </span>
            </div>
          </div>

          {/* Metrics & Statistical Comparison charts */}
          <div className="lg:col-span-5 bg-[#1b1b22] border border-soviet-border rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative">
            <div>
              <h3 className="text-lg font-serif font-bold text-soviet-beige mb-6 border-b border-soviet-border pb-3">
                Chỉ Số Xã Hội Thực Tế
              </h3>

              {/* Metres for Inequality, Freedom, Conflict */}
              <div className="space-y-6">
                {/* 1. Inequality */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-600" /> Bất bình đẳng kinh tế
                    </span>
                    <span className="font-bold text-red-500">{activeEra.stats.inequality}%</span>
                  </div>
                  <div className="w-full h-3 bg-[#14141a] rounded-full overflow-hidden border border-soviet-border">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activeEra.stats.inequality}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-red-800 to-red-500 rounded-full"
                    />
                  </div>
                </div>

                {/* 2. Freedom */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-yellow-500" /> Quyền lợi và Tự do xã hội
                    </span>
                    <span className="font-bold text-yellow-500">{activeEra.stats.freedom}%</span>
                  </div>
                  <div className="w-full h-3 bg-[#14141a] rounded-full overflow-hidden border border-soviet-border">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activeEra.stats.freedom}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-yellow-700 to-yellow-500 rounded-full"
                    />
                  </div>
                </div>

                {/* 3. Class Struggle */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-orange-600" /> Cường độ mâu thuẫn giai cấp
                    </span>
                    <span className="font-bold text-orange-500">{activeEra.stats.conflict}%</span>
                  </div>
                  <div className="w-full h-3 bg-[#14141a] rounded-full overflow-hidden border border-soviet-border">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activeEra.stats.conflict}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-orange-800 to-orange-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis message */}
            <div className="mt-8 p-4 bg-[#14141a] rounded-xl border border-soviet-border text-xs text-gray-400 leading-relaxed">
              <div className="font-semibold text-soviet-gold mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-soviet-gold" /> Nhận định Duy vật lịch sử:
              </div>
              {activeEraId === 0 && 'Cơ sở hạ tầng sơ khai, sức sản xuất thấp buộc phải áp đặt cưỡng bức tuyệt đối để duy trì thặng dư tối thiểu cho xã hội.'}
              {activeEraId === 1 && 'Sự tự do hóa tương đối của nông dân so với nô lệ giúp kích thích sản xuất nông nghiệp, nhưng tô thuế nặng tiếp tục là ngòi nổ cách mạng.'}
              {activeEraId === 2 && 'Phương thức sản xuất phát triển tột bậc tạo ra của cải khổng lồ, nhưng tích lũy tư bản dẫn đến hố sâu phân cực giàu nghèo chưa từng có.'}
              {activeEraId === 3 && 'Lực lượng sản xuất được giải phóng hoàn toàn khỏi chế độ áp bức tư hữu, chuyển sang phục vụ đời sống toàn diện của cộng đồng xã hội.'}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
