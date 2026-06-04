import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Layers, ArrowRight, Landmark, Swords, BookOpen, Compass } from 'lucide-react';
import { sound } from './SoundManager';

const pyramidLayers = [
  {
    id: 'ruler',
    name: 'Giai cấp thống trị (Ruling Class)',
    vietName: 'Chúng tôi cai trị các bạn',
    percent: '1%',
    desc: 'Vua chúa, hoàng tộc, đầu sỏ tài phiệt hoặc đại tư sản nắm giữ thực quyền chính trị tối cao và bảo vệ lợi ích của giai cấp mình thông qua nhà nước.',
    color: 'from-amber-600 to-yellow-500'
  },
  {
    id: 'clergy',
    name: 'Kiến trúc thượng tầng tư tưởng (Clergy / Media)',
    vietName: 'Chúng tôi lừa phỉnh các bạn',
    percent: '4%',
    desc: 'Hệ tư tưởng, tôn giáo, truyền thông đại chúng chính thống định hình nhận thức xã hội, tạo ra sự phục tùng tự nguyện và biện minh cho tính hợp pháp của trật tự hiện hành.',
    color: 'from-red-800 to-red-600'
  },
  {
    id: 'military',
    name: 'Công cụ chuyên chính (Military / Police)',
    vietName: 'Chúng tôi bắn các bạn',
    percent: '5%',
    desc: 'Quân đội, cảnh sát, tòa án, nhà tù - công cụ bạo lực chuyên chính của nhà nước để cưỡng chế phục tùng khi hệ tư tưởng thất bại.',
    color: 'from-gray-800 to-gray-700'
  },
  {
    id: 'bourgeoisie',
    name: 'Giai cấp trung gian / Hỗ trợ (Middle Class / Managers)',
    vietName: 'Chúng tôi ăn thay các bạn',
    percent: '15%',
    desc: 'Quản lý cấp cao, đốc công, tiểu tư sản - những người hỗ trợ vận hành hệ thống bóc lột và được hưởng một phần thặng dư nhỏ.',
    color: 'from-zinc-700 to-zinc-600'
  },
  {
    id: 'worker',
    name: 'Giai cấp lao động bị trị (Workers & Peasants)',
    vietName: 'Chúng tôi nuôi sống tất cả các bạn',
    percent: '75%',
    desc: 'Nô lệ, nông dân, công nhân trực tiếp sản xuất ra của cải vật chất cho xã hội nhưng nhận lại phần ít nhất, chịu toàn bộ gánh nặng của tháp xã hội.',
    color: 'from-red-900 to-red-700'
  }
];

export default function VisualInfographics({ audioEnabled }) {
  const [activeTab, setActiveTab] = useState('pyramid');
  const [hoveredLayer, setHoveredLayer] = useState(null);

  const handleTabChange = (tabId) => {
    if (audioEnabled) sound.playTick();
    setActiveTab(tabId);
  };

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
          <Network className="w-3.5 h-3.5" />
          Sơ Đồ Trực Quan
        </motion.div>
        
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-soviet-beige mb-4">
          Biểu Đồ & Infographics Chuyên Đề
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          Hệ thống hóa lý luận Giai cấp, Đấu tranh giai cấp, và Dân tộc từ nội dung giáo trình chính thống của Bộ GD&ĐT Việt Nam.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
        <button
          onClick={() => handleTabChange('pyramid')}
          className={`px-4 py-2.5 rounded-lg border text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === 'pyramid'
              ? 'bg-soviet-red border-soviet-gold text-white shadow-lg'
              : 'bg-[#1b1b22] border-soviet-border text-gray-400 hover:text-soviet-beige'
          }`}
        >
          <Layers className="w-4 h-4 inline-block mr-1.5" />
          Định Nghĩa & Tháp Giai Cấp
        </button>

        <button
          onClick={() => handleTabChange('exploitation')}
          className={`px-4 py-2.5 rounded-lg border text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === 'exploitation'
              ? 'bg-soviet-red border-soviet-gold text-white shadow-lg'
              : 'bg-[#1b1b22] border-soviet-border text-gray-400 hover:text-soviet-beige'
          }`}
        >
          Bóc Lột Thặng Dư (M)
        </button>

        <button
          onClick={() => handleTabChange('materialism')}
          className={`px-4 py-2.5 rounded-lg border text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === 'materialism'
              ? 'bg-soviet-red border-soviet-gold text-white shadow-lg'
              : 'bg-[#1b1b22] border-soviet-border text-gray-400 hover:text-soviet-beige'
          }`}
        >
          Cơ Sở Hạ Tầng - KTTT
        </button>

        <button
          onClick={() => handleTabChange('struggle')}
          className={`px-4 py-2.5 rounded-lg border text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === 'struggle'
              ? 'bg-soviet-red border-soviet-gold text-white shadow-lg'
              : 'bg-[#1b1b22] border-soviet-border text-gray-400 hover:text-soviet-beige'
          }`}
        >
          <Swords className="w-4 h-4 inline-block mr-1.5" />
          Các Hình Thức Đấu Tranh
        </button>

        <button
          onClick={() => handleTabChange('nation')}
          className={`px-4 py-2.5 rounded-lg border text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === 'nation'
              ? 'bg-soviet-red border-soviet-gold text-white shadow-lg'
              : 'bg-[#1b1b22] border-soviet-border text-gray-400 hover:text-soviet-beige'
          }`}
        >
          <Compass className="w-4 h-4 inline-block mr-1.5" />
          Dân Tộc & Giai Cấp
        </button>
      </div>

      {/* Tab Panel Display */}
      <div className="bg-[#1b1b22] border border-soviet-border rounded-2xl p-6 md:p-8 shadow-2xl min-h-[520px] flex flex-col justify-start">
        
        {activeTab === 'pyramid' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Interactive Pyramid Shape */}
              <div className="lg:col-span-6 flex flex-col items-center gap-1.5 w-full">
                <span className="text-xs text-gray-400 font-mono mb-2">Di chuột lên từng tầng tháp để xem chi tiết</span>
                <div className="w-full max-w-md flex flex-col items-center gap-1">
                  {pyramidLayers.map((layer, index) => {
                    const widthPercent = 100 - (index * 15); // narrower at the top
                    const isHovered = hoveredLayer?.id === layer.id;
                    return (
                      <motion.div
                        key={layer.id}
                        onMouseEnter={() => setHoveredLayer(layer)}
                        onMouseLeave={() => setHoveredLayer(null)}
                        className={`relative cursor-pointer py-4 rounded text-center font-bold text-xs md:text-sm border transition-all duration-300 bg-gradient-to-r ${layer.color} ${
                          isHovered 
                            ? 'border-soviet-gold scale-105 shadow-[0_0_15px_rgba(255,215,0,0.3)] text-white' 
                            : 'border-transparent text-gray-200'
                        }`}
                        style={{ width: `${widthPercent}%` }}
                      >
                        <div className="truncate px-2">{layer.name} ({layer.percent})</div>
                        <div className="text-[10px] font-normal opacity-85 truncate px-2">"{layer.vietName}"</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Explanation card side */}
              <div className="lg:col-span-6">
                <AnimatePresence mode="wait">
                  {hoveredLayer ? (
                    <motion.div
                      key={hoveredLayer.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-6 bg-[#14141a] border border-soviet-gold rounded-xl shadow-xl"
                    >
                      <span className="text-xs uppercase font-bold text-soviet-gold tracking-widest block mb-2">
                        Thông tin tầng lớp xã hội
                      </span>
                      <h3 className="text-lg font-bold text-white mb-2">{hoveredLayer.name}</h3>
                      <div className="text-xs font-mono text-soviet-red font-semibold uppercase tracking-wider mb-4 border-b border-soviet-border pb-2">
                        Vai trò lịch sử: "{hoveredLayer.vietName}"
                      </div>
                      <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                        {hoveredLayer.desc}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-6 bg-[#14141a] border border-soviet-border rounded-xl text-center flex flex-col items-center justify-center h-48 text-gray-400"
                    >
                      <Layers className="w-12 h-12 text-soviet-border mb-3 animate-pulse" />
                      <p className="text-xs md:text-sm">Rê chuột vào tháp giai cấp xã hội để phân tích cấu trúc thống trị chống đỡ xã hội có giai cấp.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bourgeois vs Marxist Class Definition */}
            <div className="border-t border-soviet-border/50 pt-6">
              <h4 className="text-sm font-bold text-soviet-gold uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> So sánh đối lập về lý luận Định nghĩa Giai cấp
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#14141a] border border-soviet-border p-4 rounded-xl space-y-2">
                  <span className="font-bold text-gray-400 uppercase tracking-widest block border-b border-soviet-border/50 pb-1.5">
                    Xã hội học tư sản (Bourgeois Sociology)
                  </span>
                  <p className="text-gray-400 leading-relaxed">
                    Sử dụng các tiêu chí **chủ quan** như: uy tín cá nhân, nghề nghiệp, mức sống hoặc lối sống chung để phân chia giai cấp.
                  </p>
                  <p className="text-red-400/80 font-medium italic">
                    ➔ Hệ quả: Cố tình lảng tránh vấn đề mấu chốt là quan hệ sở hữu tư liệu sản xuất, nhằm làm mờ đi tính chất đối kháng giai cấp và biện hộ cho sự thống trị bóc lột của giai cấp cầm quyền.
                  </p>
                </div>
                <div className="bg-[#14141a] border border-soviet-gold/30 p-4 rounded-xl space-y-2">
                  <span className="font-bold text-soviet-gold uppercase tracking-widest block border-b border-soviet-gold/20 pb-1.5">
                    Triết học Mác-Lênin (Marxism-Leninism)
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">
                    Lấy quan hệ **sở hữu tư liệu sản xuất khách quan** làm cốt lõi của cơ cấu xã hội - giai cấp.
                  </p>
                  <p className="text-green-400/80 font-medium">
                    ➔ Định nghĩa Lênin: Phân định giai cấp qua 4 đặc trưng khách quan: (1) Địa vị trong hệ thống sản xuất xã hội; (2) Quan hệ sở hữu tư liệu sản xuất; (3) Vai trò trong tổ chức lao động; (4) Cách thức và quy mô hưởng thụ của cải xã hội.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
 
        {activeTab === 'exploitation' && (
          <div className="max-w-4xl mx-auto w-full">
            <h3 className="text-xl font-bold text-soviet-beige text-center mb-6">
              Cơ Chế Chiếm Đoạt Giá Trị Thặng Dư (M) Trong Chủ Nghĩa Tư Bản
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
              {/* Box 1: Worker Labor */}
              <div className="bg-[#14141a] border border-soviet-border rounded-xl p-5 flex flex-col items-center relative">
                <div className="w-12 h-12 rounded-full bg-red-950/40 border border-soviet-red flex items-center justify-center text-xl mb-3">🛠️</div>
                <h4 className="font-bold text-white text-sm mb-2">Sức lao động công nhân</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Làm việc 8 tiếng trong ngày tạo ra giá trị mới tương đương <strong>1.000.000đ</strong>.
                </p>
              </div>

              {/* Arrow 1 */}
              <div className="flex flex-col items-center justify-center text-soviet-red text-sm font-bold py-2 md:py-0">
                <ArrowRight className="w-8 h-8 rotate-90 md:rotate-0 mb-1 animate-pulse" />
                <span>Giá trị phân tách</span>
              </div>

              {/* Box 2: Extraction Division */}
              <div className="bg-[#14141a] border border-soviet-gold/40 rounded-xl p-5 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-yellow-950/40 border border-soviet-gold flex items-center justify-center text-xl mb-3">⚖️</div>
                <h4 className="font-bold text-white text-sm mb-2">Sự phân chia giá trị</h4>
                <div className="w-full space-y-3.5 my-2">
                  {/* Wage (V) */}
                  <div className="text-left text-[11px]">
                    <div className="flex justify-between text-green-400 font-semibold mb-1">
                      <span>Tiền công (V) - 2 tiếng đầu</span>
                      <span>250.000đ</span>
                    </div>
                    <div className="w-full h-2 bg-[#0f0f12] rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-1/4" />
                    </div>
                  </div>
                  {/* Surplus (M) */}
                  <div className="text-left text-[11px]">
                    <div className="flex justify-between text-red-400 font-semibold mb-1">
                      <span>Thặng dư (M) - 6 tiếng sau bị bóc lột</span>
                      <span>750.000đ</span>
                    </div>
                    <div className="w-full h-2 bg-[#0f0f12] rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 w-3/4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation box */}
            <div className="mt-8 p-5 bg-[#14141a] border border-soviet-border rounded-xl text-xs text-gray-300 leading-relaxed">
              <span className="font-bold text-soviet-gold block mb-1">Lý luận Karl Marx:</span>
              Nhà tư bản mua sức lao động của công nhân bằng <strong>Tiền công (V)</strong> chỉ vừa đủ để tái sản xuất sức lao động (ăn, ở, sinh hoạt cơ bản). Khoảng thời gian lao động còn lại công nhân tạo ra <strong>Giá trị thặng dư (M)</strong>. Toàn bộ giá trị thặng dư này bị nhà tư bản chiếm đoạt không công làm giàu cho tư bản, tạo nên bản chất bóc lột của phương thức sản xuất tư bản chủ nghĩa.
            </div>
          </div>
        )}

        {activeTab === 'materialism' && (
          <div className="max-w-4xl mx-auto w-full">
            <h3 className="text-xl font-bold text-soviet-beige text-center mb-8">
              Mô Hình Cơ Cấu Xã Hội Theo Chủ Nghĩa Duy Vật Lịch Sử
            </h3>

            {/* Block Structure flowchart */}
            <div className="flex flex-col gap-6 text-sm">
              
              {/* Architecture Upper: Superstructure */}
              <div className="bg-red-950/20 border border-soviet-red/40 rounded-xl p-5 relative">
                <span className="absolute top-[-10px] left-4 bg-[#1b1b22] px-2 text-xs font-bold text-soviet-red font-sans">
                  KIẾN TRÚC THƯỢNG TẦNG (Superstructure)
                </span>
                <p className="font-semibold text-white mb-2">Nhà nước, Pháp luật, Chính trị, Tôn giáo, Triết học, Đạo đức</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Được quyết định bởi cơ sở hạ tầng kinh tế. Nó phục vụ duy trì, bảo hộ trật tự kinh tế hiện hành và ngăn chặn các nguy cơ lật đổ từ giai cấp bị trị.
                </p>
              </div>

              {/* Arrow representing Determinism */}
              <div className="flex justify-center items-center text-xs text-soviet-gold font-bold">
                <span className="mr-2">Quyết định, định hình</span>
                <ArrowRight className="w-5 h-5 rotate-90" />
                <span className="ml-2">Phản ánh trở lại</span>
              </div>

              {/* Architecture Down: Infrastructure */}
              <div className="bg-[#14141a] border border-soviet-border rounded-xl p-5 relative">
                <span className="absolute top-[-10px] left-4 bg-[#1b1b22] px-2 text-xs font-bold text-soviet-gold font-sans">
                  CƠ SỞ HẠ TẦNG (Economic Base)
                </span>
                <p className="font-semibold text-white mb-2">Quan hệ sản xuất (QHSX) tức Chế độ sở hữu Tư liệu sản xuất</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Tổng hợp các quan hệ sản xuất tạo thành cơ cấu kinh tế của xã hội. Trong đó, giai cấp nắm tư liệu sản xuất chủ yếu sẽ thống trị cả kinh tế lẫn chính trị.
                </p>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'struggle' && (
          <div className="max-w-4xl mx-auto w-full space-y-6">
            <h3 className="text-xl font-bold text-soviet-beige text-center">
              Các Hình Thức Đấu Tranh Giai Cấp Của Giai Cấp Vô Sản
            </h3>
            <p className="text-xs text-gray-400 text-center max-w-xl mx-auto">
              Đấu tranh giai cấp của giai cấp vô sản là cuộc đấu tranh giai cấp cuối cùng trong lịch sử loài người, chia làm hai giai đoạn với các nhiệm vụ khác biệt.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs md:text-sm">
              {/* Stage 1 */}
              <div className="bg-[#14141a] border border-soviet-border p-5 rounded-xl space-y-4">
                <span className="px-2.5 py-1 rounded bg-soviet-red/20 text-soviet-red border border-soviet-red/30 font-bold uppercase tracking-wider text-xs inline-block">
                  Giai đoạn 1: Chưa giành được chính quyền
                </span>
                <p className="text-gray-400 text-xs">
                  Mục tiêu chủ yếu là lật đổ ách thống trị của giai cấp tư sản, thiết lập nền chuyên chính vô sản. Có 3 hình thức cơ bản:
                </p>
                
                <div className="space-y-3">
                  <div className="p-3 bg-[#1b1b22] rounded-lg border border-soviet-border/50">
                    <span className="font-bold text-white block">1. Đấu tranh kinh tế</span>
                    <span className="text-xs text-gray-400">Hình thức cơ bản để bảo vệ các lợi ích kinh tế hàng ngày (tăng lương, giảm giờ làm, bãi công, cải thiện điều kiện sống).</span>
                  </div>
                  <div className="p-3 bg-[#1b1b22] rounded-lg border border-soviet-border/50">
                    <span className="font-bold text-soviet-gold block">2. Đấu tranh chính trị</span>
                    <span className="text-xs text-gray-400">Hình thức **cao nhất và quyết định nhất**, có tính chất triệt để nhằm đánh sập bộ máy nhà nước của giai cấp áp bức (biểu tình chính trị, tổng bãi công, bạo lực cách mạng giành chính quyền).</span>
                  </div>
                  <div className="p-3 bg-[#1b1b22] rounded-lg border border-soviet-border/50">
                    <span className="font-bold text-white block">3. Đấu tranh tư tưởng</span>
                    <span className="text-xs text-gray-400">Đập tan các luận điệu lý luận phản động của hệ tư tưởng tư sản, tuyên truyền hệ tư tưởng vô sản khoa học (tuyên truyền, báo chí, văn hóa nghệ thuật...).</span>
                  </div>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="bg-[#14141a] border border-soviet-border p-5 rounded-xl space-y-4">
                <span className="px-2.5 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-bold uppercase tracking-wider text-xs inline-block">
                  Giai đoạn 2: Đã giành được chính quyền
                </span>
                <p className="text-gray-400 text-xs">
                  Diễn ra trong thời kỳ quá độ lên CNXH. Mục tiêu chuyển từ phá hủy sang **xây dựng, cải tạo toàn diện cơ sở kinh tế và thượng tầng**:
                </p>
                
                <div className="space-y-3">
                  <div className="p-3 bg-[#1b1b22] rounded-lg border border-soviet-border/50">
                    <span className="font-bold text-white block">Nhiệm vụ Kinh tế</span>
                    <span className="text-xs text-gray-400">Xây dựng lực lượng sản xuất phát triển mạnh mẽ; thiết lập và vận hành nền **Kinh tế thị trường định hướng XHCN** (tại Việt Nam).</span>
                  </div>
                  <div className="p-3 bg-[#1b1b22] rounded-lg border border-soviet-border/50">
                    <span className="font-bold text-green-400 block">Nhiệm vụ Chính trị</span>
                    <span className="text-xs text-gray-400">Xây dựng, củng cố và phát huy hệ thống chính trị dân chủ XHCN; củng cố nhà nước pháp quyền XHCN dưới sự lãnh đạo của Đảng vô sản.</span>
                  </div>
                  <div className="p-3 bg-[#1b1b22] rounded-lg border border-soviet-border/50">
                    <span className="font-bold text-white block">Nhiệm vụ Văn hóa, Tư tưởng</span>
                    <span className="text-xs text-gray-400">Xác lập vai trò chủ đạo của hệ tư tưởng vô sản (Chủ nghĩa Mác-Lênin), bài trừ tàn dư tư tưởng cũ, đấu tranh chống chiến lược "Diễn biến hòa bình".</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nation' && (
          <div className="max-w-4xl mx-auto w-full space-y-8">
            <h3 className="text-xl font-bold text-soviet-beige text-center">
              Mối Quan Hệ Biện Chứng Giữa Giai Cấp, Dân Tộc Và Nhân Loại
            </h3>
            
            {/* Core dialectical columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column 1: Giai cap quyet dinh Dan toc */}
              <div className="bg-[#14141a] border border-soviet-border rounded-xl p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-2 h-full bg-soviet-gold" />
                <h4 className="font-bold text-soviet-gold text-base mb-3">1. Giai cấp quyết định Dân tộc</h4>
                <p className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wider">
                  Giai cấp xuất hiện trước, quyết định xu hướng phát triển của Dân tộc
                </p>
                <ul className="text-xs text-gray-300 space-y-2.5 list-disc list-inside">
                  <li>Giai cấp thống trị nắm giữ tư liệu sản xuất sẽ chi phối quyền lực nhà nước, quy định hệ tư tưởng chính thống của dân tộc.</li>
                  <li>Áp bức giai cấp là nguồn gốc trực tiếp nảy sinh áp bức dân tộc. Muốn xóa bỏ áp bức dân tộc phải xóa bỏ tận gốc chế độ áp bức bóc lột giai cấp.</li>
                </ul>
              </div>

              {/* Column 2: Dan toc tac dong lai Giai cap */}
              <div className="bg-[#14141a] border border-soviet-border rounded-xl p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-2 h-full bg-soviet-red" />
                <h4 className="font-bold text-soviet-red text-base mb-3">2. Đấu tranh Dân tộc tác động Giai cấp</h4>
                <p className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wider">
                  Giải phóng dân tộc là tiền đề để giải phóng giai cấp tại các nước thuộc địa
                </p>
                <ul className="text-xs text-gray-300 space-y-2.5 list-disc list-inside">
                  <li>Sự hình thành dân tộc tạo địa bàn thuận lợi cho đấu tranh giai cấp và liên minh giai tầng.</li>
                  <li>Khi đất nước chưa độc lập, mâu thuẫn dân tộc đặt lên hàng đầu. Đấu tranh giải phóng dân tộc là điều kiện, tiền đề quyết định để tiến hành giải phóng giai cấp.</li>
                </ul>
              </div>
            </div>

            {/* Eastern vs Western Nation Formation Comparison */}
            <div className="bg-[#14141a] border border-soviet-border p-5 rounded-xl">
              <h4 className="text-sm font-bold text-soviet-gold uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Landmark className="w-4 h-4" /> Đặc thù hình thành Dân tộc (Phương Tây vs Phương Đông)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
                <div className="space-y-2.5">
                  <span className="font-bold text-white border-b border-soviet-border/50 pb-1 block">
                    Phương Tây (Châu Âu)
                  </span>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Gắn liền với sự xuất hiện của **Chủ nghĩa tư bản**. Cách mạng do giai cấp tư sản lãnh đạo lật đổ phong kiến để phá vỡ sự cát cứ, thống nhất thị trường và lãnh thổ quốc gia. Dân tộc hình thành muộn hơn.
                  </p>
                </div>
                <div className="space-y-2.5">
                  <span className="font-bold text-soviet-gold border-b border-soviet-gold/20 pb-1 block">
                    Phương Đông (Tiêu biểu là Việt Nam)
                  </span>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Không gắn liền với sự phát triển của CNTB. Quốc gia dân tộc hình thành rất sớm (manh nha từ Lý - Trần) xuất phát từ yêu cầu kinh tế - xã hội đặc thù: công cuộc **Trị thủy (đắp đê, làm thủy lợi)** và cuộc đấu tranh **Dựng nước & Giữ nước chống ngoại xâm**.
                  </p>
                </div>
              </div>
            </div>

            {/* Humanity dialectics */}
            <div className="bg-[#14141a] border border-soviet-border p-5 rounded-xl text-xs space-y-3">
              <h4 className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                🌐 Mối liên hệ với lợi ích Nhân loại
              </h4>
              <p className="text-gray-400 leading-relaxed">
                Sự tồn tại của nhân loại là tiền đề, điều kiện tất yếu thường xuyên cho sự sinh tồn của dân tộc và giai cấp. Trong xã hội có giai cấp đối kháng, lợi ích nhân loại luôn bị chi phối bởi lợi ích giai cấp thống trị. Tuy nhiên, lợi ích của giai cấp vô sản chân chính luôn thống nhất căn bản với lợi ích chung tiến bộ của nhân loại.
              </p>
            </div>

            {/* Ho Chi Minh Thought Box */}
            <div className="mt-8 p-5 bg-soviet-red/10 border border-soviet-red/30 rounded-xl text-xs text-gray-200">
              <span className="font-bold text-soviet-gold block mb-1.5 flex items-center gap-1.5">
                💡 Tư tưởng Hồ Chí Minh về Giai cấp và Dân tộc:
              </span>
              Khẳng định: Ở các nước thuộc địa, cách mạng giải phóng dân tộc phải đi trước một bước. Độc lập dân tộc gắn liền với chủ nghĩa xã hội. Nguyễn Ái Quốc đã kết hợp xuất sắc tinh thần yêu nước chân chính với chủ nghĩa quốc tế vô sản, vạch ra con đường cách mạng vô sản đúng đắn cho dân tộc Việt Nam.
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
