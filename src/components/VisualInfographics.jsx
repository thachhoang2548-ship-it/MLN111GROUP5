import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, HelpCircle, Layers, ArrowRight, Landmark, Users } from 'lucide-react';

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

export default function VisualInfographics() {
  const [activeTab, setActiveTab] = useState('pyramid');
  const [hoveredLayer, setHoveredLayer] = useState(null);

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
          Mô hình hóa cấu trúc tháp giai cấp xã hội, cơ chế chiếm đoạt giá trị thặng dư và mối quan hệ biện chứng giữa Giai cấp và Dân tộc trong lịch sử.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setActiveTab('pyramid')}
          className={`px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === 'pyramid'
              ? 'bg-soviet-red border-soviet-gold text-white shadow-lg'
              : 'bg-[#1b1b22] border-soviet-border text-gray-400 hover:text-soviet-beige'
          }`}
        >
          Tháp Giai Cấp (Hierarchy)
        </button>

        <button
          onClick={() => setActiveTab('exploitation')}
          className={`px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === 'exploitation'
              ? 'bg-soviet-red border-soviet-gold text-white shadow-lg'
              : 'bg-[#1b1b22] border-soviet-border text-gray-400 hover:text-soviet-beige'
          }`}
        >
          Bóc Lột Thặng Dư
        </button>

        <button
          onClick={() => setActiveTab('materialism')}
          className={`px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === 'materialism'
              ? 'bg-soviet-red border-soviet-gold text-white shadow-lg'
              : 'bg-[#1b1b22] border-soviet-border text-gray-400 hover:text-soviet-beige'
          }`}
        >
          Duy Vật Lịch Sử
        </button>

        <button
          onClick={() => setActiveTab('nation')}
          className={`px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === 'nation'
              ? 'bg-soviet-red border-soviet-gold text-white shadow-lg'
              : 'bg-[#1b1b22] border-soviet-border text-gray-400 hover:text-soviet-beige'
          }`}
        >
          Giai cấp & Dân tộc
        </button>
      </div>

      {/* Tab Panel Display */}
      <div className="bg-[#1b1b22] border border-soviet-border rounded-2xl p-6 md:p-8 shadow-2xl min-h-[500px] flex flex-col justify-center">
        
        {activeTab === 'pyramid' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Pyramid Shape */}
            <div className="lg:col-span-6 flex flex-col items-center gap-1.5 w-full">
              <span className="text-xs text-gray-400 font-mono mb-2">Di chuột lên từng tầng tháp để xem chi tiết</span>
              <div className="w-full max-w-md flex flex-col items-center gap-1">
                {pyramidLayers.map((layer, index) => {
                  const widthPercent = 100 - (index * 16); // narrower at the top
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
                      <div className="text-[10px] font-normal opacity-80 truncate px-2">{layer.vietName}</div>
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
                    <h3 className="text-xl font-bold text-white mb-2">{hoveredLayer.name}</h3>
                    <div className="text-xs font-mono text-soviet-red font-semibold uppercase tracking-wider mb-4 border-b border-soviet-border pb-2">
                      Châm ngôn: "{hoveredLayer.vietName}"
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
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
                    <p className="text-sm">Rê chuột vào tháp giai cấp xã hội để bóc tách cấu trúc kiến trúc thượng tầng chống đỡ xã hội có giai cấp.</p>
                  </motion.div>
                )}
              </AnimatePresence>
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

        {activeTab === 'nation' && (
          <div className="max-w-4xl mx-auto w-full">
            <h3 className="text-xl font-bold text-soviet-beige text-center mb-6">
              Mối Quan Hệ Biện Chứng Giữa Giai Cấp Và Dân Tộc
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column 1: Giai cap quyet dinh Dan toc */}
              <div className="bg-[#14141a] border border-soviet-border rounded-xl p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-2 h-full bg-soviet-gold" />
                <h4 className="font-bold text-soviet-gold text-base mb-3">1. Giai cấp quyết định Dân tộc</h4>
                <p className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wider">
                  Bản chất giai cấp thống trị quy định xu hướng phát triển của Dân tộc
                </p>
                <ul className="text-xs text-gray-300 space-y-2.5 list-disc list-inside">
                  <li>Giai cấp thống trị nắm giữ tư liệu sản xuất chính sẽ chi phối quyền lực nhà nước, quy định hệ tư tưởng chính thống của dân tộc.</li>
                  <li>Áp bức giai cấp là cơ sở, nguồn gốc trực tiếp nảy sinh áp bức dân tộc. Muốn xóa bỏ triệt để áp bức dân tộc thì trước hết phải xóa bỏ ách bóc lột giai cấp.</li>
                  <li>Ví dụ: Giai cấp tư sản xây dựng nền kinh tế tư bản hình thành dân tộc tư sản. Giai cấp công nhân và nhân dân lao động hướng đến dân tộc XHCN bình đẳng, đoàn kết.</li>
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
                  <li>Dân tộc là cái nôi, địa bàn sinh tồn và tiến hành các phong trào đấu tranh giai cấp của nhân dân lao động.</li>
                  <li>Tại các quốc gia bị xâm lược (ví dụ Việt Nam trước 1945), mâu thuẫn dân tộc lớn hơn mâu thuẫn giai cấp. Nhiệm vụ giải phóng dân tộc phải đặt lên hàng đầu.</li>
                  <li>Việc lật đổ ách thống trị xâm lược sẽ đập tan bộ máy chuyên chính của đế quốc, mở đường tự do cho giai cấp lao động thiết lập quyền lực xã hội mới.</li>
                </ul>
              </div>
            </div>

            {/* Ho Chi Minh Thought Box */}
            <div className="mt-8 p-5 bg-soviet-red/10 border border-soviet-red/30 rounded-xl text-xs text-gray-200">
              <span className="font-bold text-soviet-gold block mb-1.5 flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-soviet-gold" /> Vận dụng sáng tạo tại Việt Nam (Tư tưởng Hồ Chí Minh):
              </span>
              Nguyễn Ái Quốc - Hồ Chí Minh khẳng định: Ở các nước thuộc địa phương Đông, cuộc đấu tranh giải phóng dân tộc phải đi trước một bước. <strong>"Giải phóng dân tộc gắn liền với giải phóng giai cấp và giải phóng con người"</strong>. Giai cấp công nhân Việt Nam thông qua Đảng Cộng sản lãnh đạo toàn dân giành độc lập, kết hợp chủ nghĩa yêu nước chân chính với chủ nghĩa quốc tế vô sản.
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
